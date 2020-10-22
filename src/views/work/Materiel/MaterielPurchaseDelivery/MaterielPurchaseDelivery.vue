<template>
  <div class="page">
    <div class="page-RowContent">
      <div class="page-RowContent-item" data-left>
        <search-table
          small
          span-method
          ref="searchTable"
          name="MaterielPurchaseDeliveryTable"
          :sourceData="tableData"
          :columns.sync="columnsXx"
          :pageSize="30"
          :sourceCount="count"
          :merge-columns="mergeColumns"
          @row-dblclick="rowDblclick"
          @send-change="sendChange"
        />
      </div>
      <div class="page-RowContent-item" style="width: 140px;align-items:center;" data-hover>
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
        <el-button type="primary" size="mini" class="search-form-btn"
          >导出</el-button
        >
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import { columnsXx } from './columns'
import formItems from './formItems'
import { statistics } from '@/common/mixins'
export default {
  data () {
    return {
      formItems,
      columnsXx,
      api: 'getMaterielPurchaseDelivery',
      attach: {
        cq: 0
      },
      tableData: [],
      groupKey: ['dh', 'khmc'],
      mergeColumns: ['khmc', 'rq', 'dh', 'lsdh', 'wlbh', 'wlmc', 'lx', 'dw']
    }
  },
  mixins: [statistics],
  methods: {
    rowDblclick () {}
  }
}
</script>
<style lang="scss">

</style>
