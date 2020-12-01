export default {
  data () {
    return {
      currentRow: null,
      tableDataMx: [],
      tableDataMxF: []
    }
  },
  methods: {
    initAllTableData () {
      this.tableData = []
      this.tableDataMx = []
      this.tableDataMxF = []
    },
    sendChangeMx ({ page, ...msg }) {
      this.tableDataMx = this.tableDataMxF.filter(
        item => {
          return Object.keys(msg).every(k => {
            return (item[k] ? item[k].toString() : '').startsWith(msg[k])
          })
        }
      )
    },
    searchMsgHandle () {
      this.searchMsg = { ...this.searchMsg, ...(this.currentRow ? this.currentRow : {}) }
    },
    rowDblclickMx () {

    }
  }
}
