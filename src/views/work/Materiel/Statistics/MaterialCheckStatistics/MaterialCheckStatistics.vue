<template>
  <div class="page">
    <div class="page-RowContent">
      <div class="page-RowContent-item" data-left>
        <search-table
          small
          span-method
          ref="searchTable"
          name="MaterialCheckStatisticsTable"
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
          @click="request"
          >查询</el-button
        >
        <el-button type="primary" size="mini" class="search-form-btn">打印</el-button>
        <el-button type="primary" size="mini" class="search-form-btn">导出</el-button>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import { statistics } from '@/common/mixins'
import { columnsXx } from './columns'
import formItems from './formItems'
export default {
  mixins: [statistics],
  data () {
    return {
      columnsXx,
      formItems,
      api: 'getMaterialCheckStatistics',
      attach: {},
      groupKey: ['dh', 'ckmc'],
      mergeColumns: ['lhs', 'rq', 'dh', 'lsdh', 'wlbh', 'wlmc', 'lx', 'dw', 'ckmc', 'tmbh']
    }
  },
  methods: {
    rowDblclick () {}
  }
}
</script>
<style lang="scss">

</style>
