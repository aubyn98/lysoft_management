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
                        :name="'OrderShipmentsTable_'+item.key"
                        :sourceData="tableDict[item.key].tableData"
                        :columns.sync="tableDict[item.key].columns"
                        :attach-columns.sync="tableDict[item.key].attachColumns"
                        :sourceCount="tableDict[item.key].count"
                        @row-dblclick="rowDblclick(item.key,$event)"
                        @send-change="sendChange(item.key,$event)" />
                </el-tab-pane>
            </el-tabs>
        </div>
        <div class="page-RowContent-item" data-search data-hover>
            <auto-form class="searchForm-column" ref="autoForm" :formItems="formItems" label-position="top" />
            <el-button type="primary" size="mini" class="search-form-btn" @click="request">查询</el-button>
            <el-button type="primary" size="mini" class="search-form-btn" @click="request">查询超期</el-button>
            <el-button type="primary" size="mini" class="search-form-btn">打印</el-button>
            <el-button type="primary" size="mini" class="search-form-btn" @click="exportExcel">导出</el-button>
            <exportExcel ref="exportExcel" :msg="excelData" :format="excelFormat" style="display: none" />
        </div>
    </div>
</div>
</template>

<script type="text/javascript">
import { statistics_elTabs, excel_statistics } from '@/common/mixins'
import { columnsKhddqk, columnsDdfhmxqk, columnsFhd, columnsDdfhqkcmxs } from './columns'
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
      tabsIndex: 'khddqk',
      cmmxFixProps: columnsDdfhqkcmxs.map(c => c.prop),
      cmmxDict: {
        sl: '订购数',
        yysl: '发货数',
        wfsl: '未发数'
      },
      editableTabs: [{
        label: '客户订单情况',
        key: 'khddqk',
        selection: false
      }, {
        label: '订单发货明细情况',
        key: 'ddfhmxqk',
        selection: true
      }, {
        label: '发货单',
        key: 'fhd',
        selection: false
      }, {
        label: '订单发货情况尺码显示',
        key: 'ddfhqkcmxs',
        selection: false
      }],
      tableDict: {
        khddqk: { tableData: [], columns: columnsKhddqk, count: 0, attachColumns: [], api: 'getOrderShipments_khdd' },
        ddfhmxqk: { tableData: [], columns: columnsDdfhmxqk, count: 0, attachColumns: [], api: 'getOrderShipments_ddfhmx' },
        fhd: { tableData: [], columns: columnsFhd, count: 0, attachColumns: [], api: 'getOrderShipments_fhd' },
        ddfhqkcmxs: { tableData: [], columns: columnsDdfhqkcmxs, count: 0, attachColumns: [], api: 'getOrderShipments_ddfhcmxs' }
      }
    }
  },
  created () {

  },
  methods: {
    rowDblclick () {},
    request (flag = true) {
      flag && this.clearTableHeader(flag)
      this.getSearchMsg().then(() => {
        const msg = { ...this.searchMsg, columns: { ...this.searchMsg.columns } }
        this.searchMsgHandle(msg)
        this.initAllTableData && this.initAllTableData()
        this.$api[this.api](msg)
          .then((data) => {
            this.mergeColumns && this.countMerge(data.res)
            this.tableDict[this.tabsIndex].count = data.count
            this.requestHandle && this.requestHandle(data)
            let sums = data
            if (this.tabsIndex === 'fhd') {
              const { sums: tempSums, result, columns } = this.getSizeColumns(data.res, ['khmc', 'kh', 'rq', 'sb', 'ysmc'], 'sl', { label: '小计', prop: 'xj' })
              sums = tempSums
              this.tableDict.fhd.attachColumns = columns
              data.res = result
            } else if (this.tabsIndex === 'ddfhqkcmxs') {
              sums = {}
              let filterArr = []
              data.res.some(item => {
                if (!filterArr.length) {
                  filterArr = Object.keys(item).filter(k => !this.cmmxFixProps.includes(k))
                  return true
                }
              })
              data.res.forEach(item => {
                filterArr.forEach(k => {
                  if (sums[k]) {
                    sums[k] = this.$math.add(sums[k], item[k] || 0)
                  } else {
                    sums[k] = item[k] || 0
                  }
                })
              })
              filterArr = filterArr.reduce((t, k) => {
                const [tKey, tKey2] = k.split('_')
                const temp = {
                  label: this.cmmxDict[tKey2],
                  prop: k,
                  sumProp: k,
                  width: 100,
                  show: true
                }
                if (t[tKey]) {
                  t[tKey].children.push(temp)
                } else {
                  t[tKey] = {
                    label: tKey,
                    prop: tKey,
                    width: 100,
                    show: true,
                    children: [temp]
                  }
                }
                return t
              }, {})
              this.tableDict.ddfhqkcmxs.attachColumns = Object.keys(filterArr).reduce((t, k) => {
                t.push(filterArr[k])
                return t
              }, [])
            }
            this.tableDict[this.tabsIndex].tableData = data.res
            this.$nextTick(() => {
              this.$refs['searchTable_' + this.tabsIndex][0].setSums(sums)
            })
          })
      })
    }
  }
}
</script>

<style lang="scss">
</style>
