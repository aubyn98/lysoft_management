<template>
  <div class="page">
    <div class="page-RowContent">
      <div
        class="page-RowContent-item"
        data-left
        v-if="tabIndex === '加工对账'"
      >
        <div style="height: 50%">
          <search-table
            small
            key="jgdzTable"
            ref="searchTable"
            name="MaterialReconciliationTableTopJg"
            :sourceData="tableData"
            :columns.sync="columnsJgTop"
            :sourceCount="count"
            @row-click="rowClick"
            @row-dblclick="rowDblclick"
            @send-change="sendChange"
          />
        </div>
        <div style="height: 50%">
          <search-table
            small
            key="jgdzForm"
            ref="searchTableBottom"
            name="MaterialReconciliationTableBottomJg"
            :sourceData="tableDataMx"
            :columns.sync="columnsJgBottom"
            @row-dblclick="rowDblclickMx"
            @send-change="sendChangeMx"
          />
        </div>
      </div>
      <div
        class="page-RowContent-item"
        data-left
        v-if="tabIndex === '采购对账'"
      >
        <div style="height: 50%">
          <search-table
            small
            key="cgdzTable"
            ref="searchTable"
            name="MaterialReconciliationTableTopCg"
            :sourceData="tableData"
            :columns.sync="columnsCgTop"
            :sourceCount="count"
            @row-click="rowClick"
            @row-dblclick="rowDblclick"
            @send-change="sendChange"
          />
        </div>
        <div style="height: 50%">
          <search-table
            small
            key="cgdzForm"
            ref="searchTableBottom"
            name="MaterialReconciliationTableBottomCg"
            :sourceData="tableDataMx"
            :columns.sync="columnsCgBottom"
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
        <tabs-mini :tabIndex.sync="tabIndex" :tabs="['加工对账', '采购对账']" />
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
import { statistics, statisticsDetails, excel_statistics_nF } from '@/common/mixins'
import {
  columnsJgBottom,
  columnsJgTop,
  columnsCgBottom,
  columnsCgTop
} from './columns'
import { formItemsJg, formItemsCg } from './formItems'
import { labelDict } from '@/views/tabData'
export default {
  mixins: [statistics, statisticsDetails, excel_statistics_nF],
  data () {
    return {
      columnsJgBottom,
      columnsJgTop,
      formItemsJg,
      columnsCgBottom,
      columnsCgTop,
      formItemsCg,
      tabIndex: '加工对账',
      api: 'getMaterialReconciliationMachining',
      attach: {
        yczf: false
      }
    }
  },
  computed: {
    excelFormat () {
      if (this.tabIndex === '加工对账') return this.c2eFormat(this.columnsJgTop)
      return this.c2eFormat(this.columnsCgTop)
    },
    jumpTab () {
      let djlx = this.currentRow.djlx
      djlx.includes('资金') && (djlx = '资金往来')
      djlx.includes('物料入库') && (djlx = '物料入库')
      djlx.includes('物料退货') && (djlx = '物料退货')
      return labelDict[djlx]
    }
  },
  watch: {
    tabIndex (val) {
      if (val === '采购对账') {
        this.api = 'getMaterialReconciliationPurchase'
        this.initAllTableData()
      } else if (val === '加工对账') {
        this.api = 'getMaterialReconciliationMachining'
        this.initAllTableData()
      }
      this.$nextTick(() => {
        this.initSearchMsg().then(() => {
          this.request()
        })
      })
    }
  },
  methods: {
    handleExamine () {
      if (!this.currentRow) {
        return this.$message.info('请先选择要审核的单据！')
      }
      const djlx = this.currentRow.djlx
      let api = null
      djlx.includes('物料入库') && (api = 'examineMaterialEnterStore')
      djlx.includes('物料退货') && (api = 'examineMaterialReturn')
      djlx.includes('资金') && (api = 'examineCapitaFlow')
      api && this.$api[api]({ ...this.currentRow, lx: this.tabIndex === '加工对账' ? '加工商' : '供货商' }).then(() => {
        this.request()
      })
    },
    rowClick (row) {
      this.currentRow = row
      this.tableDataMx = this.tableDataMxF = row.mx
      const obj = { sl: 0, je: 0, ps: 0 }
      row.mx.forEach(it => {
        obj.sl = this.$math.add(obj.sl, it.sl || 0)
        obj.je = this.$math.add(obj.je, it.je || 0)
        obj.ps = this.$math.add(obj.ps, it.ps || 0)
      })
      this.$refs.searchTableBottom.setSums(obj)
    }
  }
}
</script>
<style lang="scss">
</style>
