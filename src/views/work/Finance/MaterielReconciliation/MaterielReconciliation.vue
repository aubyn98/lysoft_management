<template>
  <div class="page">
    <div class="page-RowContent">
      <div
        class="page-RowContent-item"
        data-left
        v-if="tabIndex === '加工对账'"
      >
        <search-table
          small
          key="jgdzTable"
          ref="searchTable"
          name="MaterielReconciliationTableTop"
          :sourceData="tableData"
          :columns.sync="columnsJgTop"
          :pageSize="30"
          :sourceCount="count"
          @row-click="rowClick"
          @send-change="sendChange"
        />
        <search-table
          small
          key="jgdzForm"
          ref="searchTable2"
          name="MaterielReconciliationTableBottom"
          :sourceData="tableDataMx"
          :columns.sync="columnsJgBottom"
          :pageSize="30"
          :sourceCount="countMx"
          @row-dblclick="rowDblclickMx"
        />
      </div>
      <div
        class="page-RowContent-item"
        data-left
        v-if="tabIndex === '采购对账'"
      >
        <search-table
          small
          key="cgdzTable"
          ref="searchTable"
          name="MaterielReconciliationTableTop"
          :sourceData="tableData"
          :columns.sync="columnsCgTop"
          :pageSize="30"
          :sourceCount="count"
          @row-click="rowClick"
          @send-change="sendChange"
        />
        <search-table
          small
          key="cgdzForm"
          ref="searchTable2"
          name="MaterielReconciliationTableBottom"
          :sourceData="tableDataMx"
          :columns.sync="columnsCgBottom"
          :pageSize="30"
          :sourceCount="countMx"
          @row-dblclick="rowDblclickMx"
        />
      </div>
      <div
        class="page-RowContent-item"
        style="width: 140px; align-items: center"
        data-hover
      >
        <tabs-mini
          :tabIndex.sync="tabIndex"
          :tabs="['加工对账', '采购对账']"
        />
        <auto-form
          v-if="tabIndex === '加工对账'"
          key="jgdz"
          class="searchForm"
          ref="autoForm"
          style="width: 100%; justify-content: center; padding-left: 6px"
          :formItems="formItemsJg"
          label-position="top"
        />
        <auto-form
          v-if="tabIndex === '采购对账'"
          key="cgdz"
          class="searchForm"
          ref="autoForm"
          style="width: 100%; justify-content: center; padding-left: 6px"
          :formItems="formItemsCg"
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
          >审核</el-button
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
import { statistics, statisticsDetails } from '@/common/mixins'
import {
  columnsJgBottom,
  columnsJgTop,
  columnsCgBottom,
  columnsCgTop
} from './columns'
import { formItemsJg, formItemsCg } from './formItems'
export default {
  mixins: [statistics, statisticsDetails],
  data () {
    return {
      columnsJgBottom,
      columnsJgTop,
      formItemsJg,
      columnsCgBottom,
      columnsCgTop,
      formItemsCg,
      tabIndex: '加工对账',
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
