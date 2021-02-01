<template>
  <div class="page">
    <div class="page-RowContent">
      <div class="page-RowContent-item" data-left>
        <search-table
          small
          hide-search
          ref="searchTable"
          name="CuttingNumQueryTable"
          :sourceData="tableData"
          :columns.sync="columnsXx"
          :sourceCount="count"
          :attach-columns.sync="attachColumns"
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
          @autocomplete-select="autocompelteSelect"
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
import { statistics, excel_statistics, statistics_span } from '@/common/mixins'
import { columnsXx } from './columns'
import formItems from './formItems'
export default {
  mixins: [statistics, excel_statistics, statistics_span],
  data () {
    return {
      columnsXx,
      formItems,
      jumpTab: 'MaterialPurchase',
      api: 'getCuttingNumQuery',
      attach: {},
      attachColumns: []/* ,
      groupKey: ['ysmc', 'kh', 'ch', 'rq', 'jd'],
      mergeColumns: [
        'ysmc', 'kh', 'ch', 'rq', 'jd'
      ] */
    }
  },
  methods: {
    request (flag = true) {
      flag && this.clearTableHeader(flag)
      this.attachColumns = []
      this.getSearchMsg().then(() => {
        const msg = { ...this.searchMsg, columns: { ...this.searchMsg.columns } }
        this.searchMsgHandle(msg)
        this.initAllTableData && this.initAllTableData()
        this.$api[this.api](msg)
          .then((data) => {
            // this.mergeColumns && this.countMerge(data.res)
            const ms = data.ms
            // 收集码数的合计数量--------------------------------------
            const sums = { hj: 0 }
            ms.forEach((m, i) => {
              sums['sl_' + i] = data.hj[m]
              sums.hj = this.$math.add(sums.hj, data.hj[m])
            })
            // 分组——合并——床号_款号_颜色的相同项-----------------------------------------
            const obj = {}
            data.res.forEach(r => {
              // 动态属性-------------------------------------------------
              r['sl_' + ms.indexOf(r.ms)] = r.sl
              const key = r.ch + '_' + r.kh + '_' + r.ysmc
              if (obj[key]) {
                obj[key].push(r)
              } else {
                obj[key] = [r]
              }
            })
            const result = [] // 收集合并结果
            Object.keys(obj).forEach(k => {
              const collection = {}
              let hj = 0
              obj[k].forEach(it => {
                Object.keys(it).some(k => {
                  if (k.startsWith('sl_')) {
                    hj = this.$math.add(hj, it[k])
                  }
                })
                Object.assign(collection, it)
              })
              result.push({ ...collection, hj })
            })
            // 生成动态列----------------------------------------------------------------
            this.attachColumns = ms.map((m, i) => {
              const prop = 'sl_' + i
              return {
                label: m,
                prop: prop,
                sumProp: prop,
                width: 70,
                show: true,
                dynamic: true
              }
            }).concat({
              label: '合计',
              prop: 'hj',
              sumProp: 'hj',
              width: 70,
              show: true,
              dynamic: true
            })
            // --------------------------------------------------------------------------------
            this.count = data.count
            this.tableData = result
            this.$nextTick(() => {
              this.$refs.searchTable.setSums(sums)
            })
          })
      })
    },
    autocompelteSelect ({ v, prop }) {
      // this.columnsXx = this.columnsXx.concat()
    }
  }
}
</script>
<style lang="scss"></style>
