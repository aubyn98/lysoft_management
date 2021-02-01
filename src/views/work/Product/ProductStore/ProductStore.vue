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
                        :name="'ProductStoreTable_'+item.key"
                        :sourceData="tableDict[item.key].tableData"
                        :columns.sync="tableDict[item.key].columns"
                        :attach-columns.sync="tableDict[item.key].attachColumns"
                        :sourceCount="tableDict[item.key].count"
                        @row-dblclick="rowDblclick(item.key,$event)"
                        @send-change="sendChange(item.key,$event)"
                        @selection-change="selectChange" >
                        </search-table>
                </el-tab-pane>
            </el-tabs>
        </div>
        <div class="page-RowContent-item" data-search data-hover style="width:180px">
            <auto-form class="searchForm-column" ref="autoForm" :formItems="formItems" label-position="top" />
            <el-button type="primary" size="mini" class="search-form-btn" @click="request">查询</el-button>
            <el-button type="primary" size="mini" class="search-form-btn" @click="scpdd">生成盘点单</el-button>
            <el-button type="primary" size="mini" class="search-form-btn" @click="qcslwldk">清空数量为0的款</el-button>
            <el-button type="primary" size="mini" class="search-form-btn" @click="qkck">清空仓库</el-button>
            <el-button type="primary" size="mini" class="search-form-btn" @click="AlarmVisible = true">产品库存报警设置</el-button>
            <el-button type="primary" size="mini" class="search-form-btn">打印</el-button>
            <el-button type="primary" size="mini" class="search-form-btn" @click="exportExcel">导出</el-button>
            <exportExcel ref="exportExcel" :msg="excelData" :format="excelFormat" style="display: none" />
        </div>
        <FashionAlarm append-to-body :visible.sync="AlarmVisible" />
    </div>
</div>
</template>

<script type="text/javascript">
import { statistics_elTabs, excel_statistics/* , statistics_span */ } from '@/common/mixins'
import { columnsHxhz, columnsZxhz, columnsCmhxck, columnsZsck, columnsShck } from './columns'
import formItems from './formItems'
export default {
  mixins: [statistics_elTabs, excel_statistics],
  data () {
    return {
      formItems,
      AlarmVisible: false,
      attach: {

      },
      groupKey: ['kh', 'sb'],
      mergeColumns: ['kh', 'sb'],
      tabsIndex: 'hxhz',
      editableTabs: [{
        label: '横向汇总',
        key: 'hxhz',
        selection: false
      }, {
        label: '纵向汇总',
        key: 'zxhz',
        selection: true
      }, {
        label: '尺码横向查看',
        key: 'cmhxck',
        selection: false
      }, {
        label: '总数仓库',
        key: 'zsck',
        selection: false
      }, {
        label: '审核仓库',
        key: 'shck',
        selection: false
      }],
      tableDict: {
        hxhz: { tableData: [], columns: columnsHxhz, count: 0, attachColumns: [], api: 'getProductStore' },
        zxhz: { tableData: [], columns: columnsZxhz, count: 0, attachColumns: [], api: 'getProductStore' },
        cmhxck: { tableData: [], columns: columnsCmhxck, count: 0, attachColumns: [], api: 'getProductStore_cmhxck' },
        zsck: { tableData: [], columns: columnsZsck, count: 0, attachColumns: [], api: 'getProductStore_zsck' },
        shck: { tableData: [], columns: columnsShck, count: 0, attachColumns: [], api: 'getProductStore_shck' }
      },
      selectedRows: []
    }
  },
  created () {
    this.$api.getSize({}, true).then(({ res }) => {
      const attachColumns = res.reduce((t, c) => {
        t.push({
          label: c.ms,
          prop: c.ms,
          sumProp: c.ms,
          width: 100,
          show: true
        })
        return t
      }, [])
      attachColumns.push({
        label: '合计',
        prop: 'hj',
        sumProp: 'hj',
        width: 100,
        show: true
      })
      this.tableDict.cmhxck.attachColumns = attachColumns
      this.tableDict.shck.attachColumns = this.$format.copy(attachColumns)
    }).catch(() => {
      this.tableDict.cmhxck.attachColumns = []
      this.tableDict.shck.attachColumns = []
    })
  },
  methods: {
    selectChange (rows) {
      this.selectedRows = rows
    },
    qcslwldk () {
      this.$api.updateProductStore_qcslwldk().then(res => {

      })
    },
    scpdd () {
      if (this.selectedRows.length === 0) return this.$message('请先选择纵向汇总面板的数据！')
      this.$api.getProductStore_scpdd(this.selectedRows).then(res => {

      })
    },
    qkck () {
      this.$api.updateProductStore_qkck({ zdr: this.$store.state.account.username }).then(res => {

      })
    },
    rowDblclick () {}
  }
}
</script>

<style lang="scss">
</style>
