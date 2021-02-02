<template>
<div class="page">
    <div class="page-RowContent">
        <div class="page-RowContent-item" data-left>
            <div style="height:50%">
                <search-table
                    small
                    hide-search
                    ref="searchTable"
                    name="ProductInventoryAdjustTable_top"
                    :sourceData="tableData"
                    :columns.sync="columns"
                    :sourceCount="0"
                    :attach-columns.sync="attachColumns" />
            </div>
            <div style="height:50%">
                <edit-table
                    small
                    hideAddMenu
                    hideDelMenu
                    stopKeyEvent
                    :disabled="false"
                    hide-search
                    ref="editTable"
                    :includeKeys="includeKeys"
                    name="ProductInventoryAdjustTable_bottom"
                    :columns.sync="columns"
                    :attach-columns.sync="attachColumns" />
            </div>
        </div>
        <div class="page-RowContent-item" data-search data-hover>
            <auto-form class="searchForm-column" ref="autoForm" :formItems="formItems" label-position="top" :includeKeys="includeKeys"/>
            <el-button type="primary" size="mini" class="search-form-btn" @click="request">查询</el-button>
            <el-button type="primary" size="mini" class="search-form-btn" @click="confirm">确认</el-button>
            <el-button type="primary" size="mini" class="search-form-btn" @click="finish ">完成</el-button>
        </div>
    </div>
</div>
</template>

<script type="text/javascript">
import { columnsXx as columns } from './columns'
import formItems from './formItems'
export default {
  data () {
    return {
      columns,
      formItems,
      api: 'getProductInventoryAdjust',
      tableData: [],
      attachColumns: [],
      collection: [],
      includeKeys: ['kh', 'ckmc', 'ysmc', 'kslx', 'sb', 'dw', 'ykcsl']
    }
  },
  methods: {
    request () {
      this.$refs.autoForm.submitForm().then(ruleForm => {
        const editTable = this.$refs.editTable
        if (!ruleForm.kh) return this.$alert('请输入款号进行查询！')
        this.$api.getProductInventoryAdjust(ruleForm).then(({ res }) => {
          let ms = res.reduce((t, r) => {
            Object.keys(r).forEach(k => {
              if (k !== 'ysmc') {
                t.push(k)
              }
            })
            return t
          }, [])
          ms = Array.from(new Set(ms))
          /* const { result, columns } = this.getSizeColumns(res, ['ysmc'], 'sl', {
            label: '合计',
            prop: 'hj'
          })
          columns.pop() */
          const columns = ms.map(m => ({
            label: m,
            prop: m,
            sumProp: m
          }))
          this.attachColumns = columns
          this.tableData = res
          this.$nextTick(() => {
            const BlankRow = editTable.getRowBlankData()
            editTable.initTableData(
              res.map((r) => ({ ...BlankRow, ysmc: r.ysmc, ykcsl: r.sl, ...ruleForm })),
              false
            )
          })
        })
      })
    },
    initData (flag = null) {
      this.tableData = []
      flag && (this.collection = [])
      this.attachColumns = []
      this.$refs.editTable.initTableData([], false)
    },
    confirm () {
      const ruleForm = this.$refs.autoForm.ruleForm
      if (!ruleForm.ckmc) return this.$alert('请输入仓库名称再确认！')
      const table = this.$refs.editTable.submitTable()
      const arr = table.reduce((t, row, i) => {
        Object.keys(row).forEach(k => {
          if (!this.includeKeys.includes(k) && row[k]) {
            const num = this.$math.subtract(row[k] || 0, this.tableData[i][k] || 0)
            const base = this.includeKeys.reduce((t, k2) => {
              t[k2] = row[k2]
              return t
            }, {})
            t.push({ ...base, ckmc: ruleForm.ckmc, ms: k, sl: num })
          }
        })
        return t
      }, [])
      this.collection.push(...arr)
      this.initData()
    },
    finish () {
      if (!this.collection.length) return this.$alert('请至少录入一条数据！')
      this.$authentication().then(() => {
        /* const data = this.collection.reduce((t, row) => {
          row.sl > 0 && t.py.push(row)
          row.sl < 0 && t.pk.push(row)
          return t
        }, { py: [], pk: [] }) */
        const data = this.collection.reduce((t, row) => {
          const { sl, ckmc } = row
          const temp = { ...row, sl: Math.abs(sl) }
          const key = sl > 0 ? '盘盈' : '盘亏'
          if (!t[key][ckmc]) {
            t[key][ckmc] = [temp]
          } else {
            t[key][ckmc].push(temp)
          }
          return t
        }, { 盘盈: {}, 盘亏: {} })
        this.$api.addProductInventoryAdjust(data).then(res => {
          this.$confirm('是否打开盘点单！', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$emit('select', 'ProductCheck', {
              cb: function (ref) {
                ref.getDataByDh(true, res.dh)
              }
            })
          })
          this.initData(true)
        })
      })
    }
  }
}
</script>

<style lang="scss"></style>
