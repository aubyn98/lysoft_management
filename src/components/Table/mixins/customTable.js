export default {
  props: {
    // 是否显示选择列
    selection: {
      type: Boolean,
      default: false
    },
    // 隐藏表尾合计
    hideSums: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      // 表头搜索条件 和 页码
      msg: { page: 1 },
      // 选中显示的列
      checkedList: [],
      // 选择的行
      currentRow: null,
      // 表尾 合计
      sums: [],
      // 表格数据
      tableData: [],
      valid: null
    }
  },
  methods: {
    // 防抖
    debounce () {
      if (this.valid) {
        clearTimeout(this.valid)
      } else {
        this.valid = setTimeout(() => {
          this.$nextTick(() => {
            this.doLayout()
            this.valid = null
          })
        }, 1000)
      }
    },
    // 获取日期   yyyy-MM-dd
    getDate () {
      return new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().substring(0, 10)
    },
    // 初始化搜索条件
    initMsg (flag) {
      if (flag) return (this.msg.page = 1)
      const sort = {}
      this.msg = {
        ...this.columns.reduce((t, l) => {
          if (l.elType === 'checkbox') {
            t[l.prop] = false
          } else {
            t[l.prop] = ''
          }
          sort[l.prop] = ''
          return t
        }, {}),
        ...this.msg
      }
      this.sort = sort
    },
    // 双击单元格
    cellDblclick (...agv) {
      this.$emit('cell-dblclick', ...agv)
    },
    // 双击行
    rowDblclick (...agv) {
      this.$emit('row-dblclick', ...agv)
    },
    // 单击行
    rowClick (...agv) {
      this.$emit('row-click', ...agv)
    },
    // 选择行
    select (...agv) {
      this.$emit('select', ...agv)
    },
    // 选择全部行
    selectAll (selection) {
      this.$emit('select-all', selection)
    },
    selectionChange (selection) {
      this.$emit('selection-change', selection)
    },
    // 设置当前选中行
    setCurrentRow (val = null) {
      this.$refs.searchTable.setCurrentRow(val)
    },
    // 当前行变化时触发
    handleCurrentChange (row) {
      this.currentRow = row
    },
    // 设置表格-行样式
    tableRowClassName ({ row, rowIndex }) {
      row.index = rowIndex
      if ((rowIndex + 1) % 4 === 2) {
        return 'success-row'
      }
      if ((rowIndex + 1) % 2 === 0) {
        return 'warning-row' // warning-row
      }
    },
    // 获取合计信息
    getSummaries (param) {
      return this.sums
    }
  },
  created () {
    this.localforage.getItem(this.name + 'CheackList').then(checkedList => {
      this.checkedList = checkedList || this.columns.filter(c => {
        // eslint-disable-next-line no-prototype-builtins
        const hasShow = c.hasOwnProperty('show')
        if ((hasShow && c.show) || !hasShow) return true
      }).map((c) => c.label)
      this.initMsg()
    })
    this.initMsg()
  },
  watch: {
    checkedList: {
      handler (val) {
        this.localforage.setItem(this.name + 'CheackList', val)
        this.setSums && this.setSums(this.sumsData)
      },
      deep: true
    },
    tableData: {
      handler (val) {
        // this.doLayout()
      },
      deep: true
    }
  },
  computed: {
    autoColumns () {
      const newColumns = this.columns.filter((item) => {
        return this.checkedList.some((v) => v === item.label)
      })
      // this.request && this.request()
      this.$nextTick(() => {
        this.doLayout()
      })
      return newColumns
    },
    autoSums () {
      this.$nextTick(() => {
        this.doLayout()
      })
      return this.sums
    }
  }
}
