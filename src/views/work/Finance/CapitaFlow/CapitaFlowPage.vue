<template>
  <div class="page">
    <header-btn
      border
      :hide-edit="!$permission([{ mc: '资金往来_' + params.lx, xg: true }])"
      @change="editChange"
      :activeIndex="activeIndex"
      :defaultTab="tabIndex"
      :tabs="tabs"
      @tab-change="(tab) => $emit('update:tabIndex', tab)"
    >
      <el-button
        type="info"
        size="mini"
        v-if="$permission([{ mc: '资金往来审核与作废', xg: true }])"
        :disabled="!disabled || !currentRow || currentRow.sh"
        @click="handleExamine"
        >审核</el-button
      >
      <el-button
        type="info"
        size="mini"
        v-if="$permission([{ mc: '资金往来审核与作废', xg: true }])"
        :disabled="!disabled || !currentRow || currentRow.ch || !currentRow.sh"
        @click="handleNullify"
        >作废</el-button
      >
      <el-button type="success" size="mini" @click="refresh">刷新</el-button>
      <el-button type="primary" size="mini" @click="exportExcel"
        >导出</el-button
      >
      <exportExcel
        ref="exportExcel"
        :msg="excelData"
        :format="excelFormat"
        style="display: none"
      />
    </header-btn>
    <div class="billTitle">
      <div class="billTitle-left">
        <auto-form
          ref="autoForm"
          :disabled="disabled"
          style="width: 100%"
          :formItems="formItems"
          @autocomplete-select="autocompleteSelect"
          @icon-click="fromIconClick"
        />
      </div>
      <div class="billTitle-right" style="left: 750px">
        <div class="billTitle-right-table" style="width: 537px">
          <edit-table
            hideNum
            hide-sums
            hideContext
            headerBg
            ref="editTable2"
            :name="`CapitaFlow${name}Title`"
            :columns.sync="columnsTitle"
            :disabled="disabled"
          />
        </div>
      </div>
    </div>
    <div style="flex: 1; height: 0">
      <search-table
        api="getCapitaFlow"
        :name="`CapitaFlow${name}Table`"
        ref="List"
        :columns.sync="columns"
        :params="params"
        @row-click="rowClickXx"
      />
    </div>
    <div v-for="item in subRecords" :key="item.component">
      <component
        append-to-body
        :sub="[]"
        :key="item.component"
        :is="item.component"
        :visible.sync="item.visible"
        @row-dblclick="
          (...argv) => {
            subDblclick(item.prop, ...argv);
          }
        "
        @selectEnd="
          (...argv) => {
            subSelectEnd(item.prop, ...argv);
          }
        "
      />
    </div>
  </div>
</template>

<script type="text/javascript">
import { formIconClick } from '@/common/mixins'
import { getColumns, getColumnsTitle } from './columns'
import { getformItems } from './formItems'
export default {
  mixins: [formIconClick],
  props: {
    name: {
      type: String,
      required: true
    },
    tabIndex: {
      type: String,
      required: true,
      default: '客户来款'
    },
    params: {
      type: Object,
      required: true
    },
    tabs: {
      type: Array,
      required: true
    },
    api: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      formItems: getformItems(this.name),
      columns: getColumns(this.name),
      columnsTitle: getColumnsTitle(this.name),
      disabled: true,
      currentRow: null,
      // excel 表格导出相关
      excelFormat: {},
      excelData: [],
      //
      subRecords: [
        {
          prop: 'mc',
          visible: false,
          component: 'Vendor'
        },
        {
          prop: 'yhzh',
          visible: false,
          component: 'Bank'
        },
        {
          prop: 'jelx',
          visible: false,
          component: 'AmountType'
        }
      ]
    }
  },
  watch: {
    tabIndex: {
      handler (val) {
        const subRecord = this.subRecords[0]
        if (val === '客户来款') {
          subRecord.prop = 'mc'
          subRecord.component = 'Customer'
        } else if (val === '加工商还款') {
          subRecord.prop = 'mc'
          subRecord.component = 'Customer'
        } else if (val === '供货商还款') {
          subRecord.prop = 'mc'
          subRecord.component = 'Vendor'
        }
      },
      immediate: true
    }
  },
  created () {
    this.excelFormat = this.c2eFormat(this.columns)
  },
  mounted () {
    this.$refs.editTable2.initTableData()
  },
  methods: {
    autocompleteMc (v) {
      let obj = null; let api = null
      if (this.tabIndex === '客户来款') {
        obj = { khbh: v.khbh }
        api = 'getCapitaFlow_khmc'
      } else if (this.tabIndex === '加工商还款') {
        api = 'getCapitaFlow_jgsmc'
        obj = { jgsbh: v.jgsbh }
      } else if (this.tabIndex === '供货商还款') {
        api = 'getCapitaFlow_ghsmc'
        obj = { ghsbh: v.ghsbh }
      }
      this.$api[api](obj)
        .then((data) => {
          data.res.length > 0 &&
                this.$refs.autoForm.setFieldsValue({
                  skje: data.res[0].skje
                })
        })
    },
    autocompleteSelect ({ v, prop }) {
      switch (prop) {
        case 'mc':
          this.autocompleteMc(v)
          break
      }
    },
    exportExcel () {
      this.$api.getCapitaFlow(this.params).then(({ res }) => {
        this.excelData = res
        this.$nextTick(() => {
          this.$refs.exportExcel.exportData()
        })
      })
    },
    subDblclick (prop, { id, index, ...row }) {
      this.subRecords.some(it => {
        if (it.prop === prop) {
          it.visible = false
          return true
        }
      })
      if (prop === 'mc') {
        let obj = null
        if (this.tabIndex === '客户来款') {
          obj = { mc: row.khmc, khbh: row.khbh }
        } else if (this.tabIndex === '加工商还款') {
          obj = { mc: row.jgsmc, jgsbh: row.jgsbh }
        } else if (this.tabIndex === '供货商还款') {
          obj = { mc: row.ghsmc, ghsbh: row.ghsbh }
        }
        this.autocompleteMc(row)
        this.$refs.autoForm.setFieldsValue(obj)
      } else if (prop === 'yhzh') {
        this.$refs.autoForm.setFieldsValue({ yhzh: row.yhzh })
      } else if (prop === 'jelx') {
        this.$refs.autoForm.setFieldsValue({ jelx: row.jelx })
      } else {
        this.$refs.autoForm.setFieldsValue(row)
      }
    },
    add () {
      this.initData()
    },
    submitEnd ({ tableData, ...msg }, type) {
      this.currentRow = {
        tableData,
        ...msg
      }
      this.initData(msg, [msg], tableData, false)
    },
    handleNullify () {
      if (!this.currentRow) {
        return this.$message.info('请选择要作废的单据！')
      }
      this.$api
        .nullifyCapitaFlow({
          dh: this.currentRow.dh,
          ch: !this.currentRow.ch,
          ...this.params
        })
        .then((res) => {
          this.currentRow.ch = !this.currentRow.ch
          this.request()
        })
    },
    handleExamine () {
      if (!this.currentRow) {
        return this.$message.info('请选择要审核的单据！')
      }
      this.$api
        .examineCapitaFlow({
          dh: this.currentRow.dh,
          sh: !this.currentRow.sh,
          ...this.params
        })
        .then((res) => {
          this.currentRow.sh = !this.currentRow.sh
          this.request()
        })
    },
    submit (api, cb) {
      this.getData().then(({ tableData, ...res }) => {
        const msg = { ...res }
        if (this.handleSubmit && !this.handleSubmit(msg)) {
          return
        }
        this.$api[this.api[api]]({
          ...msg,
          ...(api === 'update' ? this.params : {})
        }).then((res) => {
          this.disabled = true
          this.submitEnd({ ...msg, ...res })
          cb()
          this.refresh()
        })
      })
    },
    addsave (cb) {
      this.submit('add', cb)
    },
    addcancel () {
      if (this.currentRow) {
        const { ...msg } = this.currentRow
        this.initData(msg, [msg], false)
      } else {
        this.initData()
      }
    },
    update () {},
    updatesave (cb) {
      this.submit('update', cb)
    },
    updatecancel () {
      const { ...msg } = this.currentRow
      this.initData(msg, [msg], false)
    },
    del () {
      if (!this.currentRow) return this.$message.info('请先选择要删除的数据！')
      this.$api[this.api.del]({ dh: this.currentRow.dh, ...this.params }).then(
        (res) => {
          const List = this.$refs.List
          this.currentRow = null
          List.request()
          this.initData()
        }
      )
    },
    editChange ({ action, edit, cb }) {
      if (action === 'del') {
        this.disabled = true
      } else if (!cb) {
        this.disabled = edit === 'save'
      }
      this[action](cb)
    },
    initData (val = null, vTitle, flag = true) {
      this.$refs.autoForm && this.$refs.autoForm.initForm(val)
      this.$refs.editTable2 &&
        this.$refs.editTable2.initTableData(vTitle, flag)
    },
    rowClickXx (row) {
      if (!this.disabled) {
        return
      }
      this.currentRow = row
      this.initData(this.currentRow, [this.currentRow], false)
    },
    rowDblclick () {},
    refresh () {
      this.$refs.List.request(true)
    },
    getData () {
      return new Promise((resolve) => {
        this.$refs.autoForm.submitForm().then((res) => {
          const titleTableData = this.$refs.editTable2.submitTable()[0]
          const sendData = { ...res, ...titleTableData }
          resolve(sendData)
        })
      })
    }
  },
  computed: {
    activeIndex () {
      return this.currentRow ? 1 : -1
    }
  }
}
</script>
<style lang="scss">
</style>
