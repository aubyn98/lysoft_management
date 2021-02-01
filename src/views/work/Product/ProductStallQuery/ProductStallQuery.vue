<template>
<div class="page">
    <div class="page-RowContent">
        <div class="page-RowContent-item" data-left>
            <el-tabs v-model="tabsIndex" type="card" class="innerTab">
                <el-tab-pane v-for="item in editableTabs" :key="item.key" :label="item.label" :name="item.key">
                    <search-table
                        small
                        span-method
                        :selection="item.selection"
                        :ref="'searchTable_'+item.key"
                        :name="'ProductStallQueryTable_'+item.key"
                        :sourceData="tableDict[item.key].tableData"
                        :columns.sync="tableDict[item.key].columns"
                        :attach-columns.sync="tableDict[item.key].attachColumns"
                        :sourceCount="tableDict[item.key].count"
                        @row-dblclick="rowDblclick(item.key,$event)"
                        @send-change="sendChange(item.key,$event)"
                        @check-change="checkChange" />
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
import { columnsCkdwmx, columnsCkdwhz } from './columns'
import formItems from './formItems'
export default {
  mixins: [statistics_elTabs, excel_statistics],
  data () {
    return {
      formItems,
      attach: {

      },
      // groupKey: ['dh', 'ghsmc', 'ckmc', 'rq'],
      // mergeColumns: ['ghsmc', 'rq', 'dh', 'lsdh', 'wlbh', 'wlmc', 'lx', 'dw', 'ckmc', 'tmbh', 'wlbm', 'lb'],
      tabsIndex: 'ckdwmx',
      editableTabs: [{
        label: '仓库档位明细',
        key: 'ckdwmx',
        selection: false
      }, {
        label: '仓库档位汇总',
        key: 'ckdwhz',
        selection: false
      }],
      tableDict: {
        ckdwmx: { tableData: [], columns: columnsCkdwmx, count: 0, attachColumns: [], api: 'getProductStallQuery_ckdwmx' },
        ckdwhz: { tableData: [], columns: columnsCkdwhz, count: 0, attachColumns: [], api: 'getProductStallQuery_ckdwhz' }
      }
    }
  },
  created () {

  },
  methods: {
    rowDblclick () {},
    checkChange (row, prop) {
      console.log(row, prop)
    }
  }
}
</script>

<style lang="scss">
</style>
