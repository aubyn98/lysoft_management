<template>
  <div class="page">
    <div class="page-RowContent">
      <div class="page-RowContent-item" data-left>
        <search-table
          small
          span-method
          ref="searchTable"
          name="ProductPurchaseDeliveryTable"
          :sourceData="tableData"
          :columns.sync="columnsXx"
          :sourceCount="count"
          :merge-columns="mergeColumns"
          @row-dblclick="rowDblclick"
          @send-change="sendChange"
          @check-change="checkChange"
          @sort-change="sortChange"
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
          @click="
            () => {
              (attach.cq = 0), request();
            }
          "
          >查询</el-button
        >
        <el-button
          type="primary"
          size="mini"
          class="search-form-btn"
          @click="
            () => {
              (attach.cq = 1), request();
            }
          "
          >查询超期</el-button
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
import { columnsXx } from './columns'
import formItems from './formItems'
import { statistics, excel_statistics } from '@/common/mixins'
export default {
  data () {
    return {
      formItems,
      columnsXx,
      jumpTab: 'MaterialPurchase',
      api: 'getProductPurchaseDelivery',
      attach: {
        cq: 0
      },
      groupKey: ['dh', 'kh', 'sb'],
      mergeColumns: ['rq', 'dh', 'lsdh', 'kh', 'sb'],
      checkChangeApi: 'statementMaterialPurchase'
    }
  },
  mixins: [statistics, excel_statistics],
  methods: {
    sortChange () {

    },
    spanFn ({ row, column, rowIndex, columnIndex }) {
      return {
        rowspan: (row.count && row.count[column.property]) || 1,
        colspan: (row.count && row.count[column.property]) ? 1 : this.mergeColumns.includes(column.property) ? 0 : 1
      }
    }/* ,
    countMerge (data, keys = this.mergeColumns, num = keys.length - 1) {
      const obj = {}
      const arr = []
      const key = keys[num]
      const obj2 = {}
      data.forEach(t => {
        if (obj[t[key]]) {
          obj[t[key]].count++
          obj[t[key]].vals.push(t)
        } else {
          obj[t[key]] = { count: 1, prop: key, key: t[key], vals: [t], last: num === 0 }
        }
      })
      data.forEach(t => {
        if (!obj2[t[key]]) {
          obj2[t[key]] = 1
          !t.count && (t.count = {})
          t.count[obj[t[key]].prop] = obj[t[key]].count
        }
      })
      Object.keys(obj).forEach(k => {
        const { vals, ...res } = obj[k]
        arr.push({ ...res, vals: num > 0 ? this.countMerge(vals, keys, num - 1) : vals })
      })
      return arr
    } */
  }
}
</script>
<style lang="scss">
</style>
