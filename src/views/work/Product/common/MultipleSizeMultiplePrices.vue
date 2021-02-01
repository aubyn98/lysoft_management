<template>
<el-dialog
    append-to-body
    :visible="visible"
    title="多码多价录入"
    center
    class="record_dialog"
    @close="close">
    <div class="page">
        <div class="page-RowContent">
            <div class="page-RowContent-item" data-left>
                <div style="height:50%">
                    <search-table
                        small
                        hide-search
                        ref="searchTable"
                        name="MultipleSizeMultiplePrices_top"
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
                        name="MultipleSizeMultiplePrices_bottom"
                        :columns.sync="columns"
                        :attach-columns.sync="attachColumns" />
                </div>
            </div>
            <div class="page-RowContent-item" data-search data-hover>
                <auto-form class="searchForm-column" ref="autoForm" :formItems="formItems" label-position="top" />
                <el-button type="primary" size="mini" class="search-form-btn" @click="request">查询</el-button>
                <el-button type="primary" size="mini" class="search-form-btn" @click="confirm">确定</el-button>
            </div>
        </div>
    </div>
</el-dialog>
</template>

<script type="text/javascript">
export default {
  props: {
    visible: Boolean
  },
  data () {
    return {
      tableData: [],
      attachColumns: [],
      columns: [{ label: '颜色', prop: 'ysmc', width: 100 }],
      formItems: [
        {
          label: '款号',
          prop: 'kh',
          style: { width: '130px' },
          placeholder: '请输入款号',
          elType: 'autocomplete',
          api: 'getFashion'
        }
      ]
    }
  },
  methods: {
    confirm () {
      const kh = this.$refs.autoForm.ruleForm.kh
      if (!kh) return this.$alert('请输入款号进行查询！')
      const editTable = this.$refs.editTable
      const ms = this.attachColumns
        .filter((c) => c.prop !== 'ysmc')
        .map((c) => c.prop)
      const data = editTable.submitTable()
      const res = []
      ms.forEach((m) => {
        let tempArr = []
        data.forEach(r => {
          const temp = { ...r }
          Object.keys(temp).forEach((k) => {
            if (k !== 'ysmc' && k !== m) {
              temp[k] = ''
            }
          })
          temp.hj = r[m]
          tempArr.push(temp)
        })
        tempArr = tempArr.filter(r => r[m])
        tempArr.length && res.push(tempArr)
      })
      this.tableData = []
      editTable.initTableData([], false)
      this.$emit('confirm', kh, res, ms.map(m => ({ ms: m })))
    },
    request () {
      const ruleForm = this.$refs.autoForm.ruleForm
      const editTable = this.$refs.editTable
      if (!ruleForm.kh) return this.$alert('请输入款号进行查询！')
      this.$api.getMultipleSizeMultiplePrices(ruleForm).then(({ res }) => {
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
    },
    close () {
      this.$emit('update:visible', false)
      this.$emit('close', false)
    }
  }
}
</script>
