<template>
  <div class="page">
    <div class="page-RowContent">
      <div class="page-RowContent-item" data-left>
        <div style="height: 40%">
          <search-table
            small
            hide-search
            ref="searchTableXx"
            name="CashBankReconciliationTableTop"
            :sourceData="tableDataXx"
            :columns.sync="columnsTop"
            @row-click="rowClick"
            @send-change="sendChange"
          />
        </div>
        <div style="height: 60%">
          <search-table
            small
            hide-search
            ref="searchTable"
            name="CashBankReconciliationTableBottom"
            :sourceData="tableData"
            :columns.sync="columnsBottom"
            :sourceCount="count"
            @row-dblclick="rowDblclick"
          />
        </div>
      </div>
      <div
        class="page-RowContent-item"
        style="width: 140px; align-items: center"
        data-hover
      >
        <auto-form
          class="searchForm"
          ref="autoForm"
          style="width: 100%; justify-content: center; padding-left: 6px"
          :formItems="formItems"
          label-position="top"
        />
        <el-button
          type="primary"
          size="mini"
          class="search-form-btn"
          @click="submit"
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
    </div>
  </div>
</template>

<script type="text/javascript">
import { statistics, statisticsDetails, excel_statistics } from '@/common/mixins'
import { columnsBottom, columnsTop } from './columns'
import formItems from './formItems'
export default {
  mixins: [statistics, statisticsDetails, excel_statistics],
  data () {
    return {
      columnsBottom,
      columnsTop,
      formItems,
      api: 'getCashBankReconciliationDetail',
      api_top: 'getCashBankReconciliation',
      hideMount: true,
      attach: {},
      tableDataXx: []
    }
  },
  created () {
    this.getTopTable()
    this.excelFormat = this.c2eFormat(this.columnsBottom)
  },
  methods: {
    exportExcel () {
      this.$refs.autoForm.submitForm().then(form => {
        this.$api[this.api]({ ...form, ...(this.attach || {}), yhzh: this.currentRow ? this.currentRow.yhzh : '' }).then(({ res }) => {
          this.excelData = res
          this.$nextTick(() => {
            this.$refs.exportExcel.exportData()
          })
        })
      })
    },
    searchMsgHandle (msg) {
      msg.yhzh = this.currentRow.yhzh
    },
    rowClick (row) {
      this.currentRow = row
      this.request()
    },
    getTopTable () {
      this.$api[this.api_top]()
        .then((data) => {
          this.tableDataXx = data.yhzh
        })
        .catch((e) => {})
    },
    submit () {
      if (!this.currentRow) return this.$message.info('请选择要查询的账号')
      this.request()
    },
    rowDblclick () {}
  }
}
</script>
<style lang="scss">
</style>
