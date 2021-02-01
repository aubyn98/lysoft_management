<template>
<div class="page">
    <div class="page-RowContent">
        <div class="page-RowContent-item" data-left>
            <search-table
                small
                hide-search
                span-method
                row-key="id"
                ref="searchTable"
                name="ProfitStatementTable"
                :sourceData="tableData"
                :columns.sync="columnsXx"
                :sourceCount="count"
                @row-dblclick="rowDblclick"
                @send-change="sendChange"
                @check-change="checkChange"
                @sort-change="sortChange" />
            <!-- :merge-columns="mergeColumns" -->
        </div>
        <div class="page-RowContent-item" data-search data-hover>
            <auto-form class="searchForm-column" ref="autoForm" :formItems="formItems" label-position="top" />
            <el-button type="primary" size="mini" class="search-form-btn" @click="request
          ">查询</el-button>
            <el-button type="primary" size="mini" class="search-form-btn">打印</el-button>
            <el-button type="primary" size="mini" class="search-form-btn" @click="exportExcel">导出</el-button>
            <exportExcel ref="exportExcel" :msg="excelData" :format="excelFormat" style="display: none" />
        </div>
    </div>
</div>
</template>

<script type="text/javascript">
import { columnsXx } from './columns'
import formItems from './formItems'
import { statistics, excel_statistics } from '@/common/mixins'
export default {
  data () {
    return {
      formItems,
      columnsXx,
      // jumpTab: 'MaterialPurchase',
      api: 'getProfitStatement',
      attach: {
      },
      /* groupKey: ['dh', 'wlmc'],
      mergeColumns: ['rq', 'wlmc', 'dh', 'lsdh', 'wlbh', 'lx', 'dw'], */
      checkChangeApi: 'statementMaterialPurchase'
    }
  },
  mixins: [statistics, excel_statistics],
  methods: {
    addRecursion  (res) {
      const arr = []
      const je = Object.keys(res).reduce((t, k) => {
        if (this.$format.toRawType(res[k]) === 'Object') {
          const { je, arr: tempArr } = this.addRecursion(res[k])
          arr.push(...tempArr)
          t = this.$math.add(t, je)
        } else {
          const temp = parseFloat(res[k] || 0)
          t = this.$math.add(t, temp)
          arr.push({ xmmc: k, je: temp })
        }
        return t
      }, 0)
      return { arr, je }
    },
    request (flag = true) {
      flag && this.clearTableHeader(flag)
      this.getSearchMsg().then(() => {
        const msg = { ...this.searchMsg/* , columns: { ...this.searchMsg.columns } */ }
        this.searchMsgHandle(msg)
        this.initAllTableData && this.initAllTableData()
        this.$api[this.api](msg)
          .then((data) => {
            this.mergeColumns && this.countMerge(data.res)
            this.count = data.count
            this.requestHandle && this.requestHandle(data)
            const { arr, je } = this.addRecursion(data.res)
            this.tableData = arr
            this.$refs.searchTable.setSums({ je })
          })
      })
    },
    searchMsgHandle (msg) {},
    sortChange () {

    }
  }
}
</script>

<style lang="scss">
</style>
