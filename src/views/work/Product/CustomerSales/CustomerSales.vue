<template>
  <div class="page">
    <div class="page-RowContent">
      <content-table
        ref="contentTable"
        :columns.sync="contentColumn"
        name="CustomerSalesContentTable"
      >
        <template #a>
          <search-table
            small
            span-method
            ref="searchTable"
            name="CustomerSalesTable"
            :sourceData="tableData"
            :columns.sync="columnsXx"
            :sourceCount="count"
            :attach-columns.sync="attachColumns"
            @row-dblclick="rowDblclick"
            @send-change="sendChange"
          />
        </template>
        <template #b>
          <div class="page-RowContent" style="padding:0;height:100%;">
            <div style="min-width:260px;flex:1;">
              <search-table
                small
                span-method
                selection
                ref="searchTable2"
                name="CustomerSalesTable2"
                api="getFashion"
                :columns="[]"
          :attach-columns="columnsRight"
                @selection-change="selectionChange"
              />
            </div>
            <div class="page-RowContent-item" data-search data-hover>
              <auto-form
                class="searchForm-column"
                ref="autoForm"
                :formItems="formItems"
                label-position="top"
              />
              <el-button type="primary" size="mini" class="search-form-btn" @click="request">查询</el-button>
              <el-button type="primary" size="mini" class="search-form-btn">打印</el-button>
              <el-button type="primary" size="mini" class="search-form-btn" @click="exportExcel">导出</el-button>
              <exportExcel
                ref="exportExcel"
                :msg="excelData"
                :format="excelFormat"
                style="display: none"
              />
            </div>
          </div>
        </template>
      </content-table>
      <!-- <div class="page-RowContent-item" data-left>
            <search-table
                small
                span-method
                ref="searchTable"
                name="CustomerSalesTable"
                :sourceData="tableData"
                :columns.sync="columnsXx"
                :sourceCount="count"
                :attach-columns.sync="attachColumns"
                @row-dblclick="rowDblclick"
                @send-change="sendChange" />
        </div>
        <div class="page-RowContent-item" data-search data-hover>
            <auto-form class="searchForm-column" ref="autoForm" :formItems="formItems" label-position="top" />
            <el-button type="primary" size="mini" class="search-form-btn" @click="request">查询</el-button>
            <el-button type="primary" size="mini" class="search-form-btn">打印</el-button>
            <el-button type="primary" size="mini" class="search-form-btn" @click="exportExcel">导出</el-button>
            <exportExcel ref="exportExcel" :msg="excelData" :format="excelFormat" style="display: none" />
      </div>-->
    </div>
  </div>
</template>

<script type="text/javascript">
import { statistics, excel_statistics_attachC } from '@/common/mixins'
import { columnsXx, columnsRight } from './columns'
import formItems from './formItems'
export default {
  mixins: [statistics, excel_statistics_attachC],
  data () {
    return {
      columnsXx,
      columnsRight,
      formItems,
      attachColumns: [],
      // jumpTab: 'MaterialPurchase',
      hideMount: true,
      api: 'getCustomerSales',
      attach: {},
      contentColumn: [
        { prop: 'a', width: 1000 },
        { prop: 'b', width: 400 }
      ],
      selectedFashion: [] /* ,
      groupKey: ['dh', 'ghsmc', 'rq', 'wlbh', 'wlmc'],
      mergeColumns: [
        'dh',
        'ghsmc',
        'rq',
        'wlbh',
        'wlmc',
        'tmbh',
        'dw',
        'lb',
        'lx',
        'wlbm'
      ] */
    }
  },
  methods: {
    request (flag = true) {
      flag && this.clearTableHeader(flag)
      this.getSearchMsg().then(() => {
        const msg = {
          ...this.searchMsg,
          columns: { ...this.searchMsg.columns }
        }
        msg.kh = this.selectedFashion.map((r) => r.kh)
        if (!msg.kh.length) return this.$message('请先选择款号！')
        this.initAllTableData && this.initAllTableData()
        this.$api[this.api](msg).then((data) => {
          this.mergeColumns && this.countMerge(data.res)
          this.count = data.count
          this.requestHandle && this.requestHandle(data)
          const { result, columns, sums } = this.getSizeMultistageColumns(
            data.res,
            ['khmc'],
            [
              { prop: 'sl', label: '销售数' },
              { prop: 'dgsl', label: '订单数' }
            ],
            { prop: 'hj', label: '合计' }
          )
          this.tableData = result
          this.attachColumns = columns
          this.$nextTick(() => {
            this.$refs.searchTable.setSums(sums)
          })
        })
      })
    },
    selectionChange (rows) {
      this.selectedFashion = rows
    }
  }
}
</script>

<style lang="scss"></style>
