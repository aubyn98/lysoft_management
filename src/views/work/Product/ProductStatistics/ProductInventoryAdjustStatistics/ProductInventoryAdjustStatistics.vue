<template>
  <div class="page">
    <div class="page-RowContent">
      <div class="page-RowContent-item" data-left>
        <search-table
          small
          span-method
          ref="searchTable"
          name="ProductInventoryAdjustStatisticsTable"
          :sourceData="tableData"
          :columns.sync="columnsXx"
          :sourceCount="count"
          :attach-columns.sync="attachColumns"
          :merge-columns="mergeColumns"
          @row-dblclick="rowDblclick"
          @send-change="sendChange"
        />
      </div>
      <div
        class="page-RowContent-item"
        data-search
        data-hover
      >
        <auto-form
          class="searchForm-column"
          ref="autoForm"
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
import { statistics, excel_statistics_attachC } from '@/common/mixins'
import { columnsXx } from './columns'
import formItems from './formItems'
export default {
  mixins: [statistics, excel_statistics_attachC],
  data () {
    return {
      columnsXx,
      formItems,
      sizeColumns: [],
      sums: {},
      // jumpTab: 'MaterialPurchase',
      api: 'getProductInventoryAdjustStatistics',
      attach: {},
      groupKey: ['rq', 'dh', 'pdlx', 'ckmc', 'sb', 'kh', 'dw'],
      mergeColumns: ['rq', 'dh', 'pdlx', 'ckmc', 'sb', 'kh', 'dw']
    }
  },
  async created () {
    try {
      const { res } = await this.$api.getSize()
      this.sizeColumns = res.reduce((t, c) => {
        const pdqsl = c.ms + '_' + 'pdqsl'
        const sl = c.ms + '_' + 'sl'
        const pdhsl = c.ms + '_' + 'pdhsl'
        t.push({
          label: c.ms,
          prop: c.ms,
          // sumProp: c.ms,
          width: 100,
          show: true,
          children: [{
            label: '盘点前',
            prop: pdqsl,
            sumProp: pdqsl,
            width: 100,
            show: true,
            children: []
          }, {
            label: '盘点数',
            prop: sl,
            sumProp: sl,
            width: 100,
            show: true,
            children: []
          }, {
            label: '盘点后',
            prop: pdhsl,
            sumProp: pdhsl,
            width: 100,
            show: true,
            children: []
          }]
        })
        return t
      }, [])
      this.sizeColumns.push({
        label: '合计',
        prop: 'hj',
        sumProp: 'hj',
        width: 100,
        show: true
      })
    } catch (e) {
      this.sizeColumns = []
    }
  },
  computed: {
    attachColumns () {
      return this.sizeColumns.filter(c => this.sums[`${c.prop}_pdqsl`] || this.sums[`${c.prop}_sl`] || this.sums[`${c.prop}_pdhsl`])
    }
  },
  methods: {
    request (flag = true) {
      flag && this.clearTableHeader(flag)
      this.getSearchMsg().then(() => {
        const msg = { ...this.searchMsg, columns: { ...this.searchMsg.columns } }
        this.searchMsgHandle(msg)
        this.initAllTableData && this.initAllTableData()
        this.$api[this.api](msg)
          .then((data) => {
            this.mergeColumns && this.countMerge(data.res)
            this.count = data.count
            this.requestHandle && this.requestHandle(data)
            this.tableData = data.res
            const { res, status, count, ...r } = data
            this.sums = r
            this.$nextTick(() => {
              this.$refs.searchTable.setSums(data)
            })
          }).catch(e => {
            this.tableData = []
            this.sums = {}
          })
      })
    }
  }
}
</script>
<style lang="scss"></style>
