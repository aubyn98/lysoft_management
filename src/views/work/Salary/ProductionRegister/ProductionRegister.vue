<template>
  <div class="page">
    <header-btn border hide-edit>
      <el-button
        :type="disabled ? 'primary' : 'success'"
        size="mini"
        @click="disabled ? add() : save()"
        >{{ disabled ? "添加" : "保存" }}</el-button
      >
      <el-button type="warning" size="mini" v-show="!disabled" @click="cancel"
        >撤销</el-button
      >
      <el-button
        :type="tabIndex === '添加列表' ? 'primary' : 'default'"
        size="mini"
        :disabled="!disabled"
        @click="tabIndex = '添加列表'"
        >添加列表</el-button
      >
      <el-button
        :type="tabIndex === '查询列表' ? 'primary' : 'default'"
        size="mini"
        :disabled="!disabled"
        @click="tabIndex = '查询列表'"
        >查询列表</el-button
      >
      <div
        v-show="tabIndex === '添加列表' && !disabled"
        style="margin-left: 10px"
      >
        <el-button type="warning" size="mini" @click="processF = !processF">{{
          processF ? "显示款式工序" : "显示所有工序"
        }}</el-button>
        <el-button type="success" size="mini" @click="addAllStaff"
          >添加所有员工</el-button
        >
        <el-button type="success" size="mini" @click="addChange('kh')"
          >更改以下款号</el-button
        >
        <el-button type="success" size="mini" @click="addChange('gxmc')"
          >更改以下工序名称</el-button
        >
        <el-button type="success" size="mini" @click="addChange('dj')"
          >更改以下工价</el-button
        >
        <el-button type="success" size="mini" @click="addChange('jhrq')"
          >更改以下日期</el-button
        >
      </div>
      <div v-show="tabIndex === '查询列表'" style="margin-left: 10px">
        <el-button type="success" size="mini" @click="get_update"
          >修改</el-button
        >
        <el-button type="success" size="mini" @click="get_Change('del')"
          >删除</el-button
        >
        <el-button type="success" size="mini" @click="get_Change('jhrq')"
          >修改所选交货日期</el-button
        >
        <el-button type="success" size="mini" @click="get_Change('dj')"
          >修改所选工价</el-button
        >
        <el-button type="success" size="mini" @click="get_Change('rk')"
          >设置所选为入库</el-button
        >
        <el-button type="success" size="mini" @click="get_Change('brk')"
          >设置所选为不入库</el-button
        >
      </div>
    </header-btn>
    <edit-table
      v-show="tabIndex === '添加列表'"
      ref="editTable"
      name="ProductionRegister"
      :columns.sync="columnsDetail"
      :disabled="disabled"
      hideAddMenu
      hideDelMenu
      :contextMenus="[
        { label: '添加', prop: 'add' },
        { label: '删除', prop: 'del' },
      ]"
      @context-click="contextClick"
      @data-change="dataChange"
      @row-click="addRowClick"
      :autocomplete-fn="autocompleteFn"
    />
    <innerStatistic
      v-show="tabIndex === '查询列表'"
      :columns.sync="columnsList"
      :formItems="formItems"
      name="ProductionRegisterTable"
      selection
      ref="statistic"
      @row-click="statisticRowClick"
      @selection-change="selectionChange"
      api="getProductionRegister"
    />
    <el-dialog
      :visible.sync="d.visible"
      v-for="d in dialogs"
      :key="d.prop"
      :title="d.title"
    >
      <auto-form
        v-if="d.visible"
        :key="d.prop"
        :ref="'autoForm_' + d.prop"
        style="width: 100%"
        :formItems="d.formItems"
      />
      <template #footer>
        <div>
          <el-button type="default" size="mini" @click="d.visible = false"
            >取消</el-button
          >
          <el-button type="primary" size="mini" @click="dialogConfirm(d.prop)"
            >确定</el-button
          >
        </div>
      </template>
    </el-dialog>
    <el-dialog :visible.sync="visible" title="修改交货记录">
      <auto-form
        v-if="visible"
        ref="autoForm"
        style="width: 100%"
        :formItems="updateFormItems"
        :includeKeys="['gxjm', 'ygjm']"
      />
      <template #footer>
        <div>
          <el-button type="default" size="mini" @click="visible = false"
            >取消</el-button
          >
          <el-button type="primary" size="mini" @click="updateConfirm"
            >确定</el-button
          >
        </div>
      </template>
    </el-dialog>
    <!-- <div class="page-RowContent" v-show="tabIndex === '查询列表'">
      <div class="page-RowContent-item" data-left>
        <search-table
          small
          ref="searchTable"
          name="ProductionRegisterTable"
          :sourceData="tableData"
          :columns.sync="columnsList"
          :sourceCount="count"
        />
      </div>
      <div class="page-RowContent-item" data-search data-hover>
        <auto-form
          class="searchForm-column"
          ref="autoForm"
          :formItems="formItems"
          label-position="top"
        />
        <el-button
          type="primary"
          size="mini"
          class="search-form-btn"
          @click="request"
          >查询</el-button
        >
        <el-button type="primary" size="mini" class="search-form-btn"
          >打印</el-button
        >
        <el-button
          type="primary"
          size="mini"
          class="search-form-btn"
          @click="exportExcel"
          >导出</el-button
        >
        <exportExcel
          ref="exportExcel"
          :msg="excelData"
          :format="excelFormat"
          style="display: none"
        />
      </div>
    </div> -->
  </div>
</template>

<script type="text/javascript">
import { formItems, updateFormItems } from './formItems'
import { columnsDetail, columnsList } from './columns'
import { num } from '@/common/utils/pattern'
export default {
  data () {
    return {
      formItems,
      columnsDetail,
      columnsList,
      tabIndex: '添加列表',
      disabled: true,
      tableData: [],
      count: 0,
      labelDict: {},
      processF: false,
      addCurrentRow: null,
      getCurrentRow: null,
      selectedRows: [],
      visible: false,
      dialogs: [
        {
          title: '修改工价',
          prop: 'dj',
          visible: false,
          formItems: [
            {
              label: '工价',
              prop: 'dj',
              placeholder: '请填写工价',
              rules: [
                { trigger: 'focus', required: true, message: '请填写工价' },
                { trigger: 'focus', pattern: num, message: '请填写数字' }
              ]
            },
            {
              label: '密码',
              prop: 'mm',
              type: 'password',
              placeholder: '请填写密码',
              rules: [
                { trigger: 'focus', required: true, message: '请填写密码' }
              ]
            }
          ]
        },
        {
          title: '修改交货日期',
          prop: 'jhrq',
          visible: false,
          formItems: [
            {
              label: '日期',
              prop: 'jhrq',
              elType: 'date',
              rules: [
                { trigger: 'focus', required: true, message: '请填写日期' }
              ]
            },
            {
              label: '密码',
              prop: 'mm',
              type: 'password',
              placeholder: '请填写密码',
              rules: [
                { trigger: 'focus', required: true, message: '请填写密码' }
              ]
            }
          ]
        }
      ],
      updateFormItems
    }
  },
  created () {
    this.labelDict = this.columnsDetail.reduce((t, c) => {
      t[c.prop] = c.label
      return t
    }, {})
  },
  methods: {
    dialogConfirm (prop) {
      this.$refs['autoForm_' + prop][0].submitForm().then(res => {
        const rows = this.selectedRows.map(r => ({ ...r }))
        rows.forEach(r => {
          r[prop] = res[prop]
        })
        this.$api
          .updateProductionRegister({ list: rows, mm: res.mm })
          .then(res => {
            this.$refs.statistic.request()
            this.selectedRows = []
            this.dialogs.some(d => {
              if (d.prop === prop) {
                return (d.visible = false)
              }
            })
          })
      })
    },
    updateConfirm () {
      this.$refs.autoForm.submitForm().then(({ mm, ...res }) => {
        this.$api
          .updateProductionRegister({
            list: [{ ...this.getCurrentRow, ...res }],
            mm
          })
          .then(res => {
            this.$refs.statistic.request()
            this.selectedRows = []
            this.visible = false
            this.getCurrentRow = null
          })
      })
    },
    get_update () {
      if (!this.selectedRows.length) return this.$alert('请选择一行数据！')
      this.visible = true
      this.getCurrentRow = this.selectedRows[0]
      this.$nextTick(() => {
        this.$refs.autoForm.initForm({ ...this.getCurrentRow, czyjsyy: false, ckyjsyy: false })
      })
    },
    async get_Change (prop) {
      if (!this.selectedRows.length) return this.$alert('请至少选择一行数据！')
      if (prop === 'jhrq' || prop === 'dj') {
        return this.dialogs.some(d => {
          if (d.prop === prop) {
            d.visible = true
            return true
          }
        })
      }
      const mm = await this.$prompt('请输入密码', '验证', {
        inputType: 'password',
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /.+/,
        inputErrorMessage: '请输入密码'
      }).catch(() => {})
      if (!mm) return
      if (prop === 'del') {
        return this.$api
          .delProductionRegister({
            list: this.selectedRows.map(r => r.id),
            mm: mm.value
          })
          .then(res => {
            this.$refs.statistic.request()
            this.selectedRows = []
          })
      } else if (prop === 'rk' || prop === 'brk') {
        const rows = this.selectedRows.map(r => ({ ...r }))
        rows.forEach(r => {
          r.sfrk = prop === 'rk'
        })
        this.$api
          .updateProductionRegister({ list: rows, mm: mm.value })
          .then(res => {
            this.$refs.statistic.request()
            this.selectedRows = []
          })
      }
    },
    statisticRowClick (row) {
      // this.getCurrentRow = null
    },
    selectionChange (rows) {
      this.selectedRows = rows
    },
    addAllStaff () {
      const editTable = this.$refs.editTable
      const { yggh, ygmc, ygjm, index, ...res } = this.addCurrentRow
        ? this.addCurrentRow
        : editTable.getRowBlankData()
      this.$api.getStaff({ sfzz: '是' }).then(data => {
        editTable.initTableData(
          data.res.map(({ yggh, jm, ygmc }) => {
            return { yggh, ygmc, ygjm: jm, ...res }
          }),
          false
        )
      })
    },
    addChange (prop) {
      this.$refs.editTable.tableData.forEach((r, i) => {
        if (i > this.addCurrentRow.index) {
          switch (prop) {
            case 'kh':
              r.kslx = this.addCurrentRow.kslx
              r.dw = this.addCurrentRow.dw
              break
            case 'gxmc':
              r.dj = this.addCurrentRow.dj
              break
          }
          r[prop] = this.addCurrentRow[prop]
        }
      })
    },
    addRowClick (row) {
      this.addCurrentRow = row
    },
    save () {
      const data = this.$refs.editTable.submitTable()
      if (!data.length) return this.$alert('请至少填写一行数据！')
      if (
        data.some((r, i) => {
          return Object.keys(r).some(k => {
            if (
              // eslint-disable-next-line eqeqeq
              ((k !== 'rk' && r[k] === '') || (k === 'sl' && r[k] == 0)) &&
              k !== 'bz'
            ) {
              this.$alert(`第${i + 1}行的${this.labelDict[k]}不能为空！`)
              return true
            }
          })
        })
      ) {
        return
      }
      this.$api.addProductionRegister(data).then(res => {
        this.initData()
      })
    },
    initData () {
      this.disabled = true
      this.addCurrentRow = null
      this.$refs.editTable.initTableData([], false)
    },
    add () {
      this.disabled = false
      this.tabIndex = '添加列表'
    },
    cancel () {
      this.initData()
    },
    contextClick (prop) {
      if (prop === 'del') return this.$refs.editTable.delRow()
      this.$refs.editTable.copyRow()
    },
    dataChange () {},
    autocompleteFn (q, cb, c, row, fn) {
      c.prop === 'gxmc' &&
        (c.api = this.processF ? 'getProcess' : 'getFashionProcess')
      fn(q, cb, c, row)
    }
  }
}
</script>
