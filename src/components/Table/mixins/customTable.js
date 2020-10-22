export default {
  props: {
    selection: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      msg: { page: 1 },
      checkedList: [],
      currentRow: null,
      sums: []
    }
  },
  methods: {
    getDate () {
      return new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().substring(0, 10)
    },
    initMsg (flag) {
      if (flag) return (this.msg.page = 1)
      this.msg = {
        ...this.columns.reduce((t, l) => {
          if (l.elType === 'checkbox') {
            t[l.prop] = false
          } else {
            t[l.prop] = ''
          }
          return t
        }, {}),
        ...this.msg
      }
    },
    rowDblclick (r, c, e) {
      this.$emit('row-dblclick', r, c, e)
    },
    rowClick (r, c, e) {
      this.$emit('row-click', r, c, e)
    },
    select (selection, row) {
      this.$emit('select', selection, row)
    },
    selectAll (selection) {
      this.$emit('select-all', selection)
    },
    setCurrentRow (val = null) {
      this.$refs.searchTable.setCurrentRow(val)
    },
    handleCurrentChange (row) {
      this.currentRow = row
    },
    tableRowClassName ({ row, rowIndex }) {
      row.index = rowIndex
      if ((rowIndex + 1) % 4 === 2) {
        return 'success-row'
      }
      if ((rowIndex + 1) % 2 === 0) {
        return 'warning-row' // warning-row
      }
    },
    getSummaries (param) {
      return this.sums
    }
  },
  created () {
    const checkedList = JSON.parse(
      localStorage.getItem(this.name + 'CheackList')
    )
    this.checkedList = checkedList || this.columns.map((c) => c.label)
    this.initMsg()
  },
  watch: {
    checkedList: {
      handler (val) {
        localStorage.setItem(this.name + 'CheackList', JSON.stringify(val))
      },
      deep: true
    },
    tableData: {
      handler (val) {
        this.doLayout()
      },
      deep: true
    }
  },
  computed: {
    autoColumns () {
      const newColumns = this.columns.filter((item) => {
        return this.checkedList.some((v) => v === item.label)
      })
      this.doLayout()
      return newColumns
    },
    autoSums () {
      this.doLayout()
      return this.sums
    }
  }
}
