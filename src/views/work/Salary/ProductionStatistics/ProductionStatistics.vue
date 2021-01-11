<template>
  <div class="page">
    <div class="page-RowContent">
      <div class="page-RowContent-item" data-left>
        <search-table
          small
          span-method
          ref="searchTable"
          name="ProductionStatisticsStatisticsTable"
          :sourceData="tableData"
          :columns.sync="columnsXx"
          :sourceCount="count"
          @row-dblclick="rowDblclick"
          @send-change="sendChange"
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
import { statistics, excel_statistics } from '@/common/mixins'
import { columnsXx } from './columns'
import formItems from './formItems'
export default {
  mixins: [statistics, excel_statistics],
  data () {
    return {
      columnsXx,
      formItems,
      jumpTab: 'ProductionStatistics',
      api: 'getProductionStatistics',
      attach: {}/* ,
      groupKey: ['dh', 'ghsmc', 'rq', 'wlbh', 'wlmc'],
      mergeColumns: [
        'dh',
        'ghsmc',
        'rq',
        'wlbh',
        'wlmc',
        'tmbh',
        'dw',
        'lb',
        'lx',
        'wlbm'
      ] */
    }
  },
  methods: {}
}
</script>
<style lang="scss"></style>
