<template>
  <div class="page">
    <div class="page-RowContent">
      <div class="page-RowContent-item" data-left>
        <search-table
          small
          span-method
          ref="searchTable"
          name="ProductTicketActivityTableTable"
          :sourceData="tableData"
          :columns.sync="columnsXx"
          :sourceCount="count"
          :merge-columns="mergeColumns"
          @row-dblclick="rowDblclick"
          @row-click="rowclick"
          @send-change="sendChange"
          @check-change="checkChange"
          @sort-change="sortChange"
          @selection-change="handleSelect"
        />
      </div>
      <div
        class="page-RowContent-item"
        data-search
        data-hover
      >
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
        <el-button
          type="primary"
          size="mini"
          class="search-form-btn"
          @click="nullify"
          >作废所选条码</el-button
        >
        <el-button
          type="primary"
          size="mini"
          class="search-form-btn"
          @click="cancelNullify"
          >取消作废条码</el-button
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
import { columnsXx } from './columns'
import formItems from './formItems'
import { statistics, excel_statistics } from '@/common/mixins'
export default {
  data () {
    return {
      formItems,
      columnsXx,
      // jumpTab: 'MaterialPurchase',
      api: 'getProductTicketActivityTable',
      attach: {
        cq: 0
      },
      groupKey: ['rklx', 'kh', 'sb', 'ysmc', 'ms'],
      mergeColumns: ['rklx', 'kh', 'sb', 'ysmc', 'ms'],
      checkChangeApi: 'statementMaterialPurchase',
      selected: [],
      currentRow: null
    }
  },
  mixins: [statistics, excel_statistics],
  methods: {
    rowclick (row) {
      this.currentRow = row
    },
    handleSelect (rows) {
      this.selected = rows
    },
    sortChange () {

    },
    nullify () {
      if (!this.currentRow) return this.$alert('请先选择数据！')
      this.$authentication().then(() => {
        this.$api.nullifyProductTicketActivityTable(this.currentRow).then(() => {
          this.request()
        })
      })
    },
    cancelNullify () {
      if (!this.currentRow) return this.$alert('请先选择数据！')
      this.$api.cancelNullifyProductTicketActivityTable(this.currentRow).then(() => {
        this.request()
      })
    }
  }
}
</script>
<style lang="scss">
</style>
