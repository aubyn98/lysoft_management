<template>
<div class="page BalanceSheet">
    <div class="page-RowContent">
        <div class="page-RowContent-item" data-left>
            <div class="collapse-title-box">
                <el-collapse>
                    <el-collapse-item title="项目名称：" name="title" key="title" class="hideArrow">
                        <template #title>
                            <span class="collapse-title">项目名称：</span>
                            <p class="el-collapse-item-sum">
                                <span class="collapse-title">金额</span>
                            </p>
                        </template>
                    </el-collapse-item>
                </el-collapse>
            </div>
            <div class="collapse-scroll-box">
                <el-collapse v-model="activeNames">
                    <el-collapse-item :title="row.xmmc" :name="row.xmmc" v-for="row in tableData" :key="row.xmmc">
                        <template #title>
                            <span class="collapse-scroll-title">{{row.xmmc}}</span>
                            <p class="el-collapse-item-sum">
                                <!-- <span>合计：</span> -->
                                <span>{{row.je || 0}}</span>
                            </p>
                        </template>
                        <div style="height:500px">
                            <search-table
                                small
                                hide-search
                                span-method
                                :ref="'searchTable_'+row.xmmc"
                                :name="'BalanceSheetTable_'+row.xmmc"
                                :sourceData="row.children"
                                :columns.sync="columns[row.xmmc]"
                                @row-dblclick="rowDblclick"
                                @send-change="sendChange"
                                @check-change="checkChange"
                                @sort-change="sortChange" />
                        </div>
                    </el-collapse-item>
                </el-collapse>
            </div>
            <div class="collapse-title-box">
                <el-collapse>
                    <el-collapse-item title="合计：" name="title" key="title" class="hideArrow">
                        <template #title>
                            <span class="collapse-title" style="font-size:15px">利润 = {{earning.join(' + ')}} - {{expense.join(' - ')}} </span>
                            <p class="el-collapse-item-sum">
                                <span class="collapse-title">{{sumJe}}</span>
                            </p>
                        </template>
                    </el-collapse-item>
                </el-collapse>
            </div>
        </div>
        <div class="page-RowContent-item" data-search data-hover>
            <auto-form class="searchForm-column" ref="autoForm" :formItems="formItems" label-position="top" />
            <el-button type="primary" size="mini" class="search-form-btn" @click="request
          ">查询</el-button>
            <el-button type="primary" size="mini" class="search-form-btn" @click="expandHandle
          ">全部{{expand ? '收起' : '展开'}}</el-button>
            <el-button type="primary" size="mini" class="search-form-btn">打印</el-button>
            <el-button type="primary" size="mini" class="search-form-btn" @click="exportExcel">导出</el-button>
            <exportExcel ref="exportExcel" :msg="excelData" :format="excelFormat" style="display: none" />
        </div>
    </div>
</div>
</template>

<script type="text/javascript">
import columns from './columns'
import formItems from './formItems'
import { statistics, excel_statistics } from '@/common/mixins'
export default {
  data () {
    return {
      formItems,
      columns,
      activeNames: [],
      // jumpTab: 'MaterialPurchase',
      api: 'getBalanceSheet',
      attach: {},
      sumJe: 0,
      groupKey: [
        'dh',
        'wlmc'
      ],
      earning: ['账户余额', '应收账款', '其他应收款', '固定资产', '成品库存', '材料库存'],
      expense: ['应付供货商账款', '应付加工商账款', '其他欠款', '工资欠款', '投资者投入'],
      expand: false /* ,
      mergeColumns: ['rq', 'wlmc', 'dh', 'lsdh', 'wlbh', 'lx', 'dw'],
      checkChangeApi: 'statementMaterialPurchase' */
    }
  },
  mixins: [statistics, excel_statistics],
  methods: {
    expandHandle () {
      this.activeNames = this.expand ? [] : Array.from([...this.earning, ...this.expense])
      this.expand = !this.expand
    },
    addRecursion (res) {
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
        const msg = {
          ...this.searchMsg /* , columns: { ...this.searchMsg.columns } */
        }
        this.searchMsgHandle(msg)
        this.initAllTableData && this.initAllTableData()
        this.$api[this.api](msg).then((data) => {
          this.sumJe = 0
          this.mergeColumns && this.countMerge(data.res)
          this.count = data.count
          this.requestHandle && this.requestHandle(data)
          let res = data.res
          const sumTmepDict = {}
          res = Object.keys(res).reduce((t, k, index) => {
            sumTmepDict[k] = res[k].reduce(
              (t, r) => {
                t.je = this.$math.add(t.je, r.je || 0)
                r.sl && (t.sl = this.$math.add(t.sl, r.sl || 0))
                r.rjje && (t.rjje = this.$math.add(t.rjje, r.rjje || 0))
                return t
              },
              { je: 0, sl: 0, rjje: 0 }
            )
            const { je } = sumTmepDict[k]
            t.push({
              xmmc: k,
              children: res[k],
              je
            })
            return t
          }, [])
          this.tableData = res
          this.$nextTick(() => {
            Object.keys(sumTmepDict).forEach(k => {
              const temp = sumTmepDict[k]
              if (this.earning.includes(k)) {
                this.sumJe = this.$math.add(this.sumJe, Math.abs(temp.je))
              }
              if (this.expense.includes(k)) {
                this.sumJe = this.$math.subtract(this.sumJe, Math.abs(temp.je))
              }
              this.$refs['searchTable_' + k][0].setSums(temp)
            })
          })
        })
      })
    },
    searchMsgHandle (msg) {},
    sortChange () {},
    getSearchMsg () {
      return new Promise((resolve) => {
        this.$refs.autoForm.submitForm().then((res) => {
          this.searchMsg = {
            ...res,
            ...this.attach
          }
          resolve(this.searchMsg)
        })
      })
    }
  }
}
</script>

<style lang="scss">
.BalanceSheet {
    .page-RowContent-item {
        padding: 4px 10px !important;
    }

    .collapse-title-box {}

    .collapse-scroll-box {
        flex: 1;
        height: 0;
        overflow: auto;
        position: relative;
    }

    .el-collapse-item__header {
        position: relative;

        .el-collapse-item-sum {
            position: absolute;
            right: 25px;
        }
    }

    .collapse-title {
        color: var(--text-light-black);
        font-weight: 600;
        font-size: 17px;
    }

    .collapse-scroll-title {
        color: var(--dark-blue);
        font-weight: 700;
        font-size: 15px;
    }

    .hideArrow {
        .el-collapse-item__arrow {
            display: none !important;
        }
    }
}
</style>
