<template>
  <div class="page">
    <div class="page-RowContent">
      <div class="page-RowContent-item" data-left>
        <search-table
          small
          span-method
          ref="searchTable"
          name="MaterialPurchaseDeliveryTable"
          :sourceData="tableData"
          :columns.sync="columnsXx"
          :sourceCount="count"
          :merge-columns="mergeColumns"
          @row-dblclick="rowDblclick"
          @send-change="sendChange"
          @check-change="checkChange"
          @sort-change="sortChange"
        />
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
          @click="
            () => {
              (attach.cq = 0), request();
            }
          "
          >查询</el-button
        >
        <el-button
          type="primary"
          size="mini"
          class="search-form-btn"
          @click="
            () => {
              (attach.cq = 1), request();
            }
          "
          >查询超期</el-button
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
      jumpTab: 'MaterialPurchase',
      api: 'getMaterialPurchaseDelivery',
      attach: {
        cq: 0
      },
      groupKey: ['dh', 'wlmc'],
      mergeColumns: ['wlmc', 'rq', 'dh', 'lsdh', 'wlbh', 'lx', 'dw'],
      checkChangeApi: 'statementMaterialPurchase'
    }
  },
  mixins: [statistics, excel_statistics],
  methods: {
    sortChange () {

    }
  }
}
</script>
<style lang="scss">
</style>
