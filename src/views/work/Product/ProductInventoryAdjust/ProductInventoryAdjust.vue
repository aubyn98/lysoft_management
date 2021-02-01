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
                    name="ProductInventoryAdjustTable_bottom"
                    :columns.sync="columns"
                    :attach-columns.sync="attachColumns" />
            </div>
        </div>
        <div class="page-RowContent-item" data-search data-hover>
            <auto-form class="searchForm-column" ref="autoForm" :formItems="formItems" label-position="top" />
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
      collection: []
    }
  },
  methods: {
    request () {
      this.$refs.autoForm.submitForm().then(ruleForm => {
        const editTable = this.$refs.editTable
        if (!ruleForm.kh) return this.$alert('请输入款号进行查询！')
        this.$api.getProductInventoryAdjust(ruleForm).then(({ res }) => {
          const { result, columns } = this.getSizeColumns(res, ['ysmc'], 'sl', {
            label: '合计',
            prop: 'hj'
          })
          columns.pop()
          this.attachColumns = columns
          this.tableData = result
          this.$nextTick(() => {
            const BlankRow = editTable.getRowBlankData()
            editTable.initTableData(
              result.map((r) => ({ ...BlankRow, ysmc: r.ysmc })),
              false
            )
          })
        })
      })
    },
    confirm () {
      const editTable = this.$refs.editTable
      const table = editTable.submitTable()
      this.collection.push(table)
      editTable.initTableData([], false)
      this.attachColumns = []
    },
    finish () {
      if (!this.collection.length) return this.$alert('请至少录入一条数据！')
      this.$api.addProductInventoryAdjust(this.collection).then(res => {
        this.collection = []
      })
    }
  }
}
</script>

<style lang="scss"></style>
