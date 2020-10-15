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
      currentRow: null
    }
  },
  methods: {
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
      return this.autoSums
    }
  },
  created () {
    const checkedList = JSON.parse(
      localStorage.getItem(this.name + 'CheackList')
    )
    this.checkedList = checkedList || this.columns.map((c) => c.label)
    this.msg = {
      ...this.columns.reduce((t, l) => {
        if (l.checked) {
          t[l.prop] = false
        } else {
          t[l.prop] = ''
        }
        return t
      }, {}),
      ...this.msg
    }
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
      return this.sums
    }
  }
}
