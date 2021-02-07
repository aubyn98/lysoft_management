<template>
<div class="page">
    <div class="page-RowContent">
        <div class="page-RowContent-item" data-left>
            <el-tabs v-model="tabsIndex" type="card" class="innerTab">
                <el-tab-pane v-for="item in editableTabs" :key="item.key" :label="item.label" :name="item.key">
                    <search-table
                        small
                        span-method
                        :merge-columns="mergeColumns"
                        :selection="item.selection"
                        :ref="'searchTable_'+item.key"
                        :name="'ProductRecordStatisticsTable_'+item.key"
                        :sourceData="tableDict[item.key].tableData"
                        :columns.sync="tableDict[item.key].columns"
                        :attach-columns.sync="tableDict[item.key].attachColumns"
                        :sourceCount="tableDict[item.key].count"
                        @row-dblclick="rowDblclick(item.key,$event)"
                        @send-change="sendChange(item.key,$event)" />
                </el-tab-pane>
            </el-tabs>
        </div>
        <div class="page-RowContent-item" data-search data-hover>
            <auto-form class="searchForm-column" ref="autoForm" :formItems="formItems" label-position="top" />
            <el-button type="primary" size="mini" class="search-form-btn" @click="request">查询</el-button>
            <el-button type="primary" size="mini" class="search-form-btn">打印</el-button>
            <el-button type="primary" size="mini" class="search-form-btn" @click="exportExcel">导出</el-button>
            <exportExcel ref="exportExcel" :msg="excelData" :format="excelFormat" style="display: none" />
        </div>
    </div>
</div>
</template>

<script type="text/javascript">
import { statistics_elTabs, excel_statistics } from '@/common/mixins'
import { columnsXstj, columnsRktj, columnsPdtj } from './columns'
import formItems from './formItems'
export default {
  mixins: [statistics_elTabs, excel_statistics],
  data () {
    return {
      formItems,
      attach: {

      },
      groupKey: ['kh', 'rq'],
      mergeColumns: ['kh', 'rq'],
      tabsIndex: 'xstj',
      editableTabs: [{
        label: '销售统计',
        key: 'xstj',
        selection: false
      }, {
        label: '入库统计',
        key: 'rktj',
        selection: false
      }, {
        label: '盘点统计',
        key: 'pdtj',
        selection: false
      }],
      tableDict: {
        xstj: { tableData: [], columns: columnsXstj, count: 0, attachColumns: [], api: 'getProductRecord_xstj' },
        rktj: { tableData: [], columns: columnsRktj, count: 0, attachColumns: [], api: 'getProductRecord_rktj' },
        pdtj: { tableData: [], columns: columnsPdtj, count: 0, attachColumns: [], api: 'getProductRecord_pdtj' }
      },
      lxDict: {
        销售开单: 'ProductSalesBilling',
        销售发货: 'ProductShipments',
        销售退货: 'ProductSalesReturn',
        销售订单: 'ProductOrder',
        产品入库: 'ProductEnterStore',
        盘盈: 'ProductCheck',
        盘亏: 'ProductCheck'
      }
    }
  },
  created () {

  },
  methods: {
    rowDblclick ($e, row) {
      const jumpTab = this.lxDict[row.lx]
      jumpTab && this.$emit('select', jumpTab, {
        cb (ref) {
          ref.getDataByDh(true, row.dh)
        }
      })
    }
  }
}
</script>

<style lang="scss">
</style>
