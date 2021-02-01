<template>
  <div class="page">
    <div class="page-RowContent">
      <div class="page-RowContent-item" data-left>
        <search-table
          small
          span-method
          ref="searchTable"
          name="ProductEnterStatisticsTable"
          :sourceData="tableData"
          :columns.sync="columnsXx"
          :sourceCount="count"
          :attach-columns.sync="attachColumns"
          :merge-columns="mergeColumns"
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
import { statistics, statistics_product_sizeC, excel_statistics_attachC } from '@/common/mixins'
import { columnsXx } from './columns'
import formItems from './formItems'
export default {
  mixins: [statistics, statistics_product_sizeC, excel_statistics_attachC],
  data () {
    return {
      columnsXx,
      formItems,
      // jumpTab: 'MaterialPurchase',
      api: 'getProductEnterStatistics',
      attach: {},
      groupKey: ['rq', 'ghsmc', 'sb', 'kh', 'dw'],
      mergeColumns: [
        'rq', 'ghsmc', 'sb', 'kh', 'dw'
      ]
    }
  },
  methods: {}
}
</script>
<style lang="scss"></style>
