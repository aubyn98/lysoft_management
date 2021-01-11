<template>
  <div class="page">
    <div class="page-RowContent">
      <div class="page-RowContent-item" data-left>
        <!-- <div class="testbox" ref="box">
          <div class="test" @mousemove="mouseover"></div>
          <div class="test" @mousemove="mouseover"></div>
        </div>
        <div class="colT" ref="col"></div> -->
        <search-table
          small
          span-method
          ref="searchTable"
          name="NoDeliveryNumStatisticsTable"
          row-key="rownumber"
          :sourceData="tableData"
          :columns.sync="columnsXx"
          :sourceCount="count"
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
import { statistics, excel_statistics } from '@/common/mixins'
import { columnsXx } from './columns'
import formItems from './formItems'
export default {
  mixins: [statistics, excel_statistics],
  data () {
    return {
      columnsXx,
      formItems,
      jumpTab: 'NoDeliveryNum',
      api: 'getNoDeliveryNumStatistics',
      attach: {}/* ,
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
    /* mouseover (e) {
      const col = e.target
      if (col.clientWidth - e.offsetX < 5) {
        col.style.cursor = 'col-resize'
        col.onmousedown = (e2) => {
          const start = e2.x
          if (e2.target.clientWidth - e2.offsetX < 5) {
            this.$refs.col.style.display = 'block'
            document.onmousemove =
          ('mousemove',
          e3 => {
            this.$refs.col.style.left = e3.x + 'px'
          })
            document.onmouseup = e4 => {
              e2.target.style.width = e2.target.clientWidth + e4.x - start + 'px'
              this.$refs.col.style.display = 'none'
              document.onmousemove = null
              document.onmouseup = null
            }
          } else {
          }
        }
      } else {
        col.style.cursor = 'default'
      }
    } *//* ,
    request () {
      this.tableData = [
        { ch: 1, children: [{ ch: 3, children: [{ ch: 6 }] }, { ch: 4 }] },
        { ch: 2, children: [{ ch: 5 }] }
      ]
    } */
  }
}
</script>
<style lang="scss">
.testbox{
  display: flex;
  width: 200px;
  overflow-y:auto;
}
.test {
  // cursor: col-resize;
  height: 50px;
  width: 50px;
  flex-shrink: 0;
  background-color: forestgreen;
}
.test:nth-child(2) {
  background-color: rosybrown;
}
.colT {
  height: 100px;
  width: 1px;
  position: fixed;
  background-color: red;
  left: 1px;
  display: none;
}
</style>
