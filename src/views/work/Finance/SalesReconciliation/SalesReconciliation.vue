<template>
  <div class="page">
    <div class="page-RowContent">
      <div class="page-RowContent-item" data-left>
        <div style="height: 50%">
          <search-table
            small
            ref="searchTable"
            name="SalesReconciliationTableTop"
            :sourceData="tableData"
            :columns.sync="columnsTop"
            :sourceCount="count"
            @row-click="rowClick"
            @row-dblclick="rowDblclick"
            @send-change="sendChange"
          />
        </div>
        <div style="height: 50%">
          <search-table
            small
            ref="searchTableBottom"
            name="SalesReconciliationTableBottom"
            :sourceData="tableDataMx"
            :columns.sync="columnsBottom"
            @row-dblclick="rowDblclickMx"
            @send-change="sendChangeMx"
          />
        </div>
      </div>
      <div
        class="page-RowContent-item"
        style="width: 140px; align-items: center"
        data-hover
      >
        <auto-form
          class="searchForm"
          ref="autoForm"
          style="width: 100%; justify-content: center; padding-left: 6px"
          :formItems="formItems"
          label-position="top"
        />
        <el-checkbox v-model="attach.yczf">隐藏作废的单据</el-checkbox>
        <el-button
          type="primary"
          size="mini"
          class="search-form-btn"
          @click="request"
          >查询</el-button
        >
        <el-button type="primary" size="mini" class="search-form-btn" @click="handleExamine" :disabled="currentRow && currentRow.sh"
          >审核</el-button
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
import { statistics, statisticsDetails, excel_statistics } from '@/common/mixins'
import { columnsBottom, columnsTop } from './columns'
import formItems from './formItems'
import { labelDict } from '@/views/tabData'
export default {
  mixins: [statistics, statisticsDetails, excel_statistics],
  data () {
    return {
      columnsBottom,
      columnsTop,
      formItems,
      api: 'getSalesReconciliation',
      attach: {
        yczf: false
      },
      groupKey: ['dh', 'khmc'],
      mergeColumns: ['khmc', 'rq', 'dh', 'lsdh', 'wlbh', 'wlmc', 'lx', 'dw']
    }
  },
  created () {
    this.excelFormat = this.c2eFormat(this.columnsTop)
  },
  computed: {
    jumpTab () {
      let djlx = this.currentRow.djlx
      djlx.includes('资金') && (djlx = '资金往来')
      djlx.includes('物料销售退货') && (djlx = '物料销售退货')
      djlx.includes('物料销售开单') && (djlx = '物料销售开单')
      return labelDict[djlx]
    }
  },
  methods: {
    handleExamine () {
      if (!this.currentRow) {
        return this.$message.info('请先选择要审核的单据！')
      }
      const djlx = this.currentRow.djlx
      let api = null
      djlx.includes('物料销售开单') && (api = 'examineMaterialSalesBilling')
      djlx.includes('物料销售退货') && (api = 'examineMaterialSalesReturn')
      djlx.includes('资金') && (api = 'examineCapitaFlow')
      api && this.$api[api]({ ...this.currentRow, lx: '客户' }).then(() => {
        this.request()
      })
    },
    searchMsgHandle (msg) {
      msg.columns.sh = msg.columns.sh ? 1 : 0
      msg.djzt = msg.djzt === '未审核' ? 0 : msg.djzt === '已审核' ? 1 : ''
    },
    requestHandle (data) {

    },
    rowClick (row) {
      this.currentRow = row
      this.tableDataMx = this.tableDataMxF = row.mx
      const obj = { sl: 0, je: 0, bs: 0 }
      row.mx.forEach(it => {
        obj.sl = this.$math.add(obj.sl, it.sl || 0)
        obj.je = this.$math.add(obj.je, it.je || 0)
        obj.bs = this.$math.add(obj.bs, it.bs || 0)
      })
      this.$refs.searchTableBottom.setSums(obj)
    }
  }
}
</script>
<style lang="scss">
</style>
