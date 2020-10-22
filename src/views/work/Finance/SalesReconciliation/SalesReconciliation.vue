<template>
  <div class="page">
    <div class="page-RowContent">
      <div class="page-RowContent-item" data-left>
        <search-table
          small
          ref="searchTable"
          name="SalesReconciliationTableTop"
          :sourceData="tableData"
          :columns.sync="columnsTop"
          :pageSize="30"
          :sourceCount="count"
          @row-click="rowClick"
          @send-change="sendChange"
        />
        <search-table
          small
          ref="searchTable"
          name="SalesReconciliationTableBottom"
          :sourceData="tableDataMx"
          :columns.sync="columnsBottom"
          :pageSize="30"
          :sourceCount="countMx"
          @row-dblclick="rowDblclickMx"
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
          @click="request"
          >查询</el-button
        >
        <el-button type="primary" size="mini" class="search-form-btn">审核</el-button>
        <el-button type="primary" size="mini" class="search-form-btn">打印</el-button>
        <el-button type="primary" size="mini" class="search-form-btn">导出</el-button>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import { statistics, statisticsDetails } from '@/common/mixins'
import { columnsBottom, columnsTop } from './columns'
import formItems from './formItems'
export default {
  mixins: [statistics, statisticsDetails],
  data () {
    return {
      columnsBottom,
      columnsTop,
      formItems,
      api: 'getCashBankReconciliation',
      attach: {},
      groupKey: ['dh', 'khmc'],
      mergeColumns: ['khmc', 'rq', 'dh', 'lsdh', 'wlbh', 'wlmc', 'lx', 'dw']
    }
  },
  methods: {
    rowDblclick () {}
  }
}
</script>
<style lang="scss">

</style>
