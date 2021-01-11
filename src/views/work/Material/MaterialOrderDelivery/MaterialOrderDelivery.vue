<template>
  <div class="page">
    <div class="page-RowContent">
      <div class="page-RowContent-item" data-left>
        <search-table
          small
          span-method
          ref="searchTable"
          name="MaterialOrderDeliveryTable"
          :sourceData="tableData"
          :columns.sync="columnsXx"
          :sourceCount="count"
          :merge-columns="mergeColumns"
          @row-dblclick="rowDblclick"
          @send-change="sendChange"
        />
      </div>
      <div
        class="page-RowContent-item"
        style="width: 160px; align-items: center"
        data-hover
      >
        <auto-form
          class="searchForm-column"
          ref="autoForm"

          :formItems="formItems"
          label-position="top"
        />
        <el-checkbox v-model="attach.ycjd">隐藏结单与发完数据</el-checkbox>
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
import { statistics, excel_statistics } from '@/common/mixins'
import { columnsXx } from './columns'
import formItems from './formItems'
export default {
  data () {
    return {
      formItems,
      columnsXx,
      api: 'getMaterialOrderDelivery',
      attach: {
        ycjd: false,
        cq: 0
      },
      groupKey: ['dh', 'khmc', 'rq'],
      mergeColumns: ['khmc', 'rq', 'dh', 'lsdh', 'wlbh', 'wlmc', 'lx', 'dw']
    }
  },
  mixins: [statistics, excel_statistics],
  methods: {
    rowDblclick () {}
  }
}
</script>
<style lang="scss">
</style>
