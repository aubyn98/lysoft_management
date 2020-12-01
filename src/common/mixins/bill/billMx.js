export default {
  data () {
    return {
      contentColumn: [
        { prop: 'a', width: 800 },
        { prop: 'b', width: 400 }
      ],
      currentRow_Jl: null,
      tableIndex: 0
    }
  },
  methods: {
    initMx (tableData) {
      return tableData[0] ? tableData[0].mx : []
    },
    submitEnd ({ tableData, ...msg }, type) {
      this.currentRow = {
        tableData,
        ...msg,
        sh: type === 'add' ? false : !this.currentRow ? false : !!this.currentRow.sh,
        ch: type === 'add' ? false : !this.currentRow ? false : !!this.currentRow.ch
      }
      this.initData(msg, [msg], tableData, this.initMx(tableData), false)
    },
    initData (val = null, vTitle, vTable, vTableMx, flag = true) {
      this.$refs.autoForm && this.$refs.autoForm.initForm(val)
      this.$refs.editTable2 &&
          this.$refs.editTable2.initTableData(vTitle, flag)
      this.$refs.editTable && this.$refs.editTable.initTableData(vTable, flag)
      this.$refs.editTable3 &&
          this.$refs.editTable3.initTableData(vTableMx, false)
      // this.$refs.editTable3 && this.$refs.editTable3.initTableData(vTableMx, flag)
    },
    add () {
      this.tabIndex = '添加列表'
      this.initData()
      this.tableIndex = 0
      this.currentRow_Jl = this.$refs.editTable3.submitTable()
    },
    updatecancel () {
      const { tableData, ...msg } = this.currentRow
      this.initData(msg, [msg], tableData, this.initMx(tableData), false)
      this.tableIndex = 0
    },
    addcancel () {
      if (this.currentRow) {
        const { tableData, ...msg } = this.currentRow
        this.tableIndex = msg.index
        this.initData(msg, [msg], tableData, this.initMx(tableData), false)
      } else {
        this.initData()
      }
      this.tableIndex = 0
    },
    getDataByDh (flag = true, dh = null) {
      this.$api[this.api.getByDh]({ dh: dh || this.currentRow.dh }).then(
        ({ res }) => {
          res = res instanceof Array ? res[0] : res
          // eslint-disable-next-line no-prototype-builtins
          res.hasOwnProperty('ljqk') && (res.ljqk1 = res.ljqk)
          const { tableData, ...msg } = res
          flag && (this.tabIndex = '添加列表')
          this.currentRow = this.$format.copy(res)
          this.initData(msg, [msg], tableData, this.initMx(tableData), false)
        }
      )
    }
  }
}
