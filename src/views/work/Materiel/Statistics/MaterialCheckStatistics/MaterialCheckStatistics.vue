<template>
  <div class="page">
    <div class="page-RowContent">
      <div class="page-RowContent-item" data-left>
        <search-table
          name="MaterialCheckStatisticsTable"
          small
          :tableData="tableDataXx"
          :columns.sync="columnsXx"
          :total="countXx.total"
          :pageSize="30"
          :sums="countXx.sums"
          @row-dblclick="rowDblclick"
          @send-change="sendChangeXx"
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
        <el-button type="primary" size="mini" class="search-form-btn">查询</el-button>
        <el-button type="primary" size="mini" class="search-form-btn">打印</el-button>
        <el-button type="primary" size="mini" class="search-form-btn">导出</el-button>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import { columnsXx } from './columns'
import formItems from './formItems'
export default {
  data () {
    return {
      columnsXx,
      countXx: {
        total: 0,
        sums: {}
      },
      tableDataXx: [],
      formItems
    }
  },
  methods: {
    sendChangeXx () {},
    rowDblclick () {}
  }
}
</script>
<style lang="scss">
.searchForm {
  .el-form-item {
    height: 56px;
    margin-bottom: 0px;
  }
  .el-form-item__label {
    padding: 0;
  }
}
</style>
