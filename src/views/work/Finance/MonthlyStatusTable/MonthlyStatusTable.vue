<template>
  <div class="page">
    <div class="page-RowContent">
      <div class="page-RowContent-item" data-left>
        <search-table
          v-if="tabIndex === '客户'"
          small
          key="kh"
          span-method
          ref="searchTable"
          name="MonthlyStatusTableKh"
          :sourceData="tableData"
          :columns.sync="columnsKh"
          :pageSize="30"
          :sourceCount="count"
          :merge-columns="mergeColumns"
          @row-dblclick="rowDblclick"
          @send-change="sendChange"
        />
        <search-table
          v-if="tabIndex === '加工商'"
          small
          key="jgs"
          span-method
          ref="searchTable"
          name="MonthlyStatusTableJgs"
          :sourceData="tableData"
          :columns.sync="columnsJgs"
          :pageSize="30"
          :sourceCount="count"
          :merge-columns="mergeColumns"
          @row-dblclick="rowDblclick"
          @send-change="sendChange"
        />
        <search-table
          v-if="tabIndex === '供货商'"
          small
          key="ghs"
          span-method
          ref="searchTable"
          name="MonthlyStatusTableGhs"
          :sourceData="tableData"
          :columns.sync="columnsGhs"
          :pageSize="30"
          :sourceCount="count"
          :merge-columns="mergeColumns"
          @row-dblclick="rowDblclick"
          @send-change="sendChange"
        />
      </div>
      <div
        class="page-RowContent-item"
        style="width: 150px; align-items: center"
        data-hover
      >
        <tabs-mini
          :tabIndex.sync="tabIndex"
          :tabs="['客户', '加工商', '供货商']"
          @change="tabChange"
        />
        <auto-form
          class="searchForm"
          ref="autoForm"
          key="khForm"
          style="width: 100%; justify-content: center; padding-left: 6px"
          :formItems="formItemsKh"
          v-if="tabIndex === '客户'"
          label-position="top"
        />
        <auto-form
          class="searchForm"
          ref="autoForm"
          key="ghsForm"
          style="width: 100%; justify-content: center; padding-left: 6px"
          :formItems="formItemsGhs"
          v-if="tabIndex === '供货商'"
          label-position="top"
        />
        <auto-form
          class="searchForm"
          ref="autoForm"
          key="jgsForm"
          style="width: 100%; justify-content: center; padding-left: 6px"
          :formItems="formItemsJgs"
          v-if="tabIndex === '加工商'"
          label-position="top"
        />
        <el-checkbox v-model="attach.ycjq">隐藏本月结欠等于0</el-checkbox>
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
        <el-button type="primary" size="mini" class="search-form-btn"
          >导出</el-button
        >
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import { statistics } from '@/common/mixins'
import { columnsKh, columnsGhs, columnsJgs } from './columns'
import { formItemsKh, formItemsJgs, formItemsGhs } from './formItems'
export default {
  mixins: [statistics],
  data () {
    return {
      columnsKh,
      columnsGhs,
      columnsJgs,
      formItemsKh,
      formItemsJgs,
      formItemsGhs,
      tabIndex: '客户',
      api: 'getMonthlyStatusTable',
      attach: {
        ycjq: false,
        lx: '客户'
      },
      groupKey: ['dh', 'khmc'],
      mergeColumns: ['khmc', 'rq', 'dh', 'lsdh', 'wlbh', 'wlmc', 'lx', 'dw']
    }
  },
  methods: {
    tabChange (tab) {
      this.attach.lx = tab
    },
    searchMsgHandle () {
      this.searchMsg.lx === '客户' && (this.searchMsg.mc = this.searchMsg.khmc)
      this.searchMsg.lx === '加工商' && (this.searchMsg.mc = this.searchMsg.jgs)
      this.searchMsg.lx === '供货商' && (this.searchMsg.mc = this.searchMsg.ghs)
    },
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
