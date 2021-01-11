<template>
<div class="page WorkshopSchedule">
    <content-table ref="contentTable" :columns.sync="contentColumn" name="WorkshopScheduleContentTable">
        <template #a>
            <div class="hierarchyBox_Left" v-show="tabIndex === '裁床汇总'">
                <div class="hierarchyBox_Left_item">
                    <search-table
                        small
                        ref="searchTableHZ1"
                        name="WorkshopCutSummary"
                        :sourceData="tableData.HZ1"
                        :columns.sync="columnsCutSummary"
                        @row-click="rowClick_HZ1" />
                </div>
                <div class="hierarchyBox_Left_btn">
                    <el-tag style="margin-right: 5px">工序明细</el-tag>
                    <el-select v-model="HZ2Mode" size="mini" style="width: 100px">
                        <el-option label="全部" :value="0"></el-option>
                        <el-option label="已交货" :value="1"></el-option>
                        <el-option label="未交货" :value="2"></el-option>
                    </el-select>
                    <el-button type="primary" size="mini" @click="delHandle">删除</el-button>
                    <el-button type="primary" size="mini" @click="changeHandle('xg')">修改</el-button>
                    <el-button type="primary" size="mini" @click="changeHandle('xgczsl')">修改此扎数量</el-button>
                    <el-button type="primary" size="mini" @click="invalidHandle('czzf')">此扎作废</el-button>
                    <el-button type="primary" size="mini" @click="invalidHandle('cdgxzf')">此道工序作废</el-button>
                </div>
                <div class="hierarchyBox_Left_item">
                    <search-table
                        small
                        ref="searchTableHZ2"
                        name="WorkshopProcessDetail"
                        :sourceData="computeTableDataHZ2"
                        :columns.sync="columnsProcessDetail"
                        :rowClassName="HZ2RowClassName"
                        @row-click="rowClick_HZ2" />
                </div>
            </div>
            <div class="hierarchyBox_Left" v-show="tabIndex === '裁床明细'">
                <div class="hierarchyBox_Left_item">
                    <search-table
                        small
                        ref="searchTableMX1"
                        name="WorkshopCutDetailTop"
                        :sourceData="tableData.MX1"
                        :columns.sync="columnsCutDetailTop"
                        :attach-columns="attachColumns"
                        @row-click="rowClick_MX1" />
                </div>
                <div class="hierarchyBox_Left_item">
                    <search-table
                        small
                        ref="searchTableMX2"
                        name="WorkshopCutDetailBottom"
                        :sourceData="tableData.MX2"
                        :columns.sync="columnsCutDetailBottom"
                        @row-click="rowClick_MX2" />
                </div>
            </div>
        </template>
        <template #b>
            <div class="page-RowContent" style="height: 100%">
                <div class="page-RowContent-item" data-left>
                    <search-table
                        small
                        ref="searchTable"
                        name="WorkshopScheduleTable"
                        :sourceData="tableData.default"
                        :columns.sync="columnsXx"
                        :sourceCount="count"
                        @row-click="rowClick"
                        @send-change="sendChange"
                        @check-change="searchChange"
                        @date-change="searchChange" />
                </div>
                <div class="page-RowContent-item" style="width: 160px" data-search data-hover>
                    <tabs-mini :tabIndex.sync="tabIndex" :tabs="['裁床汇总', '裁床明细']" />
                    <auto-form style="margin-top: 5px" class="searchForm-column" ref="autoForm" :formItems="formItems" label-position="top" />
                    <el-button type="primary" size="mini" class="search-form-btn" @click="request">查询</el-button>
                    <el-button type="primary" size="mini" class="search-form-btn">打印</el-button>
                    <el-button type="primary" size="mini" class="search-form-btn" @click="exportExcel">导出</el-button>
                    <exportExcel ref="exportExcel" :msg="excelData" :format="excelFormat" style="display: none" />
                </div>
            </div>
        </template>
    </content-table>
    <el-dialog
        v-for="v in visibles"
        :key="v.prop"
        :visible.sync="v.visible"
        :title="v.title"
        :close-on-click-modal="false"
        class="innerDialog">
        <div style="width:600px;margin:auto">
            <auto-form :ref="'autoForm_' + v.prop" :formItems="v.formItems" v-if="v.visible"></auto-form>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="v.visible = false">取 消</el-button>
            <el-button type="primary" @click="dialogConfirm(v)">确 定</el-button>
        </span>
    </el-dialog>
</div>
</template>

<script>
import { excel_statistics } from '@/common/mixins'
import {
  columnsXx,
  columnsCutSummary,
  columnsProcessDetail,
  columnsCutDetailTop,
  columnsCutDetailBottom
} from './columns'
import { formItems, formItems_xg, formItems_xgzcsl } from './formItems'
export default {
  mixins: [excel_statistics],
  data () {
    return {
      columnsXx,
      formItems,
      columnsCutSummary,
      columnsProcessDetail,
      columnsCutDetailTop,
      columnsCutDetailBottom,
      visibles: [
        {
          visible: false,
          prop: 'xg',
          formItems: formItems_xg,
          title: '修改'
        },
        {
          visible: false,
          prop: 'xgczsl',
          formItems: formItems_xgzcsl,
          title: '修改此扎数量'
        }
      ],
      tableData: {
        default: [],
        HZ1: [],
        HZ2: [],
        MX1: [],
        MX2: []
      },
      currentRow: {
        default: null,
        HZ1: null,
        HZ2: null,
        MX1: null,
        MX2: null
      },
      count: 0,
      HZ2Mode: 0,
      tabIndex: '裁床汇总',
      api: 'getWorkshopSchedule',
      contentColumn: [
        {
          prop: 'a',
          width: 950
        },
        {
          prop: 'b',
          width: 250
        }
      ],
      attachColumns: [],
      excelData: [],
      excelFormat: {}
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.initSearchMsg()
      this.request()
    })
  },
  watch: {
    computeTableDataHZ2 (val) {
      const sums = {
        je: 0,
        jhsl: 0,
        sl: 0
      }
      val.forEach(r => {
        sums.je = this.$math.add(sums.je, r.je || 0)
        sums.jhsl = this.$math.add(sums.jhsl, r.jhsl || 0)
        sums.sl = this.$math.add(sums.sl, r.sl || 0)
      })
      this.$nextTick(() => {
        this.$refs.searchTableHZ2.setSums(sums)
      })
    }
  },
  computed: {
    computeTableDataHZ2 () {
      switch (this.HZ2Mode) {
        case 1:
          return this.tableData.HZ2.filter(r => r.yggh && r.ygmc)
        case 2:
          return this.tableData.HZ2.filter(r => !r.yggh && !r.ygmc)
        default:
          return this.tableData.HZ2
      }
    }
  },
  methods: {
    dialogConfirm (v) {
      this.$refs['autoForm_' + v.prop][0].submitForm().then(res => {
        this.$api[v.prop === 'xg' ? 'update_jhsl_SetTicket' : 'update_czsl_SetTicket']({ ...this.currentRow.HZ2, ...res }).then(() => {
          v.visible = false
          this.rowClick_HZ1(this.currentRow.HZ1)
        })
      })
    },
    changeHandle (state) {
      const flag = state === 'xg'
      if (!this.currentRow.HZ2) return this.$alert('请先选择要修改的数据！')
      if (this.currentRow.HZ2.bz.includes('作废') && flag) {
        return this.$alert('已作废，无法修改！')
      }
      if (!this.currentRow.HZ2.yggh && flag) {
        return this.$alert('未交货，无法修改！')
      }
      this.$authentication()
        .then(() => {
          this.visibles.some(v => {
            return (v.visible = v.prop === state)
          })
          this.$nextTick(() => {
            this.$refs['autoForm_' + state][0].initForm({
              ...this.currentRow.HZ2,
              ...(flag ? {
                czyjsyy: true,
                ckyjsyy: false
              } : { xgjhsl: false, yjhslbd: true })
            })
          })
        })
        .catch(e => {})
    },
    delHandle () {
      if (!this.currentRow.HZ2) return this.$alert('请先选择要删除的数据！')
      if (this.currentRow.HZ2.bz.includes('作废')) {
        return this.$alert('已作废，无法删除！')
      }
      if (!this.currentRow.HZ2.yggh) return this.$alert('未交货，无法删除！')
      this.$authentication()
        .then(() => {
          this.$api.delWorkshopScheduleHZ2(this.currentRow.HZ2).then(() => {
            this.rowClick_HZ1(this.currentRow.HZ1)
          })
        })
        .catch(e => {})
    },
    invalidHandle (state) {
      const flag = state === 'czzf'
      if (!this.currentRow.HZ2) return this.$alert('请先选择要作废的数据！')
      this.$authentication()
        .then(() => {
          this.$api[flag ? 'invalid_cz_SetTicket' : 'invalid_cdgx_SetTicket']({
            ...this.currentRow.HZ2,
            bz: flag ? '此扎作废' : '此道工序作废'
          }).then(() => {
            this.rowClick_HZ1(this.currentRow.HZ1)
          })
        })
        .catch(e => {})
    },
    HZ2RowClassName ({ row }) {
      if (row.ygmc && row.yggh) {
        return 'danger-row-span'
      }
    },
    rowClick (row) {
      this.currentRow.default = row
      this.$api.getWorkshopScheduleHZJL(row).then(data => {
        const gxmc = data.gxmc
        const sums = {}
        data.jl.forEach(r => {
          r['gxmc_' + gxmc.indexOf(r.gxmc)] = ''
          Object.keys(r).forEach(k => {
            if (k.endsWith('jhsl') || k.endsWith('wjsl')) {
              sums[k] = this.$math.add(r[k] || 0, sums[k] || 0)
            }
          })
        })
        this.attachColumns = gxmc.map((m, i) => {
          const prop = 'gxmc_' + i
          const jhslProp = m + '_jhsl'
          const wjslProp = m + '_wjsl'
          return {
            label: m,
            prop: prop,
            width: 70,
            show: true,
            dynamic: true,
            children: [
              {
                label: '交货数量',
                prop: jhslProp,
                sumProp: jhslProp,
                width: 70,
                show: true,
                dynamic: true
              },
              {
                label: '未交数量',
                prop: wjslProp,
                sumProp: wjslProp,
                width: 70,
                show: true,
                dynamic: true
              }
            ]
          }
        })
        this.currentRow.HZ1 = null
        this.tableData.HZ1 = data.res
        this.tableData.MX1 = data.jl
        this.tableData.MX2 = data.mx

        this.$nextTick(() => {
          this.$refs.searchTableHZ1.setSums(data.cchzhj)
          this.$refs.searchTableMX1.setSums(sums)
          this.$refs.searchTableMX2.setSums(data.ccmxmxhj)
        })
      })
    },
    rowClick_HZ1 (row) {
      this.currentRow.HZ1 = row
      this.$refs.autoForm.submitForm().then(({ ksrq, jsrq }) => {
        this.$api
          .getWorkshopScheduleHZMX({
            ...row,
            ksrq,
            jsrq
          })
          .then(data => {
            this.currentRow.HZ2 = null
            this.tableData.HZ2 = data.res
          })
      })
    },
    rowClick_HZ2 (row) {
      this.currentRow.HZ2 = row
    },
    rowClick_MX1 (row) {
      this.currentRow.MX1 = row
      // this.currentRow.MX2 = null
      // this.tableData.MX2 = data.res
    },
    rowClick_MX2 (row) {
      this.currentRow.HZ2 = row
    },
    async searchChange (r, p) {
      // if (p === 'jd' || p === 'sfdx') {
      // }
      this.$authentication()
        .then(() => {
          this.$api.updateWorkshopSchedule(r).then(res => {})
        })
        .catch(e => {
          console.log(e)
          if (p === 'jd' || p === 'sfdx') return (r[p] = !r[p])
        })
    },
    clearTableHeader (flag) {
      const searchTable = this.$refs.searchTable
      searchTable && searchTable.initMsg(flag)
    },
    // 初始化搜索条件
    initSearchMsg () {
      this.clearTableHeader()
      let startDate = this.$format.getDate(
        new Date(new Date().getTime() - 2592000000)
      )
      let endDate = this.$format.getDate(new Date())
      const company = this.$store.state.company
      if (company) {
        const dateDict = this.$format.dateDict[company.rqlx]
        startDate = dateDict.startDate
        endDate = dateDict.endDate
      }
      this.$refs.autoForm.setFieldsValue({
        ksrq: startDate,
        jsrq: endDate
      })
    },
    request () {
      this.$refs.autoForm.submitForm().then(res => {
        const sendData = {
          ...res,
          columns: this.$refs.searchTable.getMsg()
        }
        this.$api.getWorkshopSchedule(sendData).then(data => {
          Object.keys(this.currentRow).forEach(k => {
            this.currentRow[k] = null
            this.tableData[k] = k === 'default' ? data.res : []
          })
        })
      })
    },
    sendChange () {
      this.request()
    }
  }
}
</script>

<style lang="scss">
.WorkshopSchedule {
    .hierarchyBox_Left {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;

        .hierarchyBox_Left_item {
            height: 0;
            flex: 1;
            width: 100%;
        }

        .hierarchyBox_Left_btn {
            height: 38px;
            line-height: 36px;

            >span~button {
                margin-left: 5px;
            }
        }
    }
}
</style>
