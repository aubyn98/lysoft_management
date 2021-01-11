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
      // 选择的行
      currentRow: null,
      selectData: [],
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
      this.selectData = selection
      this.$emit('selection-change', selection)
    },
    // 当前行变化时触发
    handleCurrentChange (row) {
      this.currentRow = row
    },
    // 获取合计信息
    getSummaries (param) {
      return this.sums
    },
    // 设置表格-行样式
    tableRowClassName ({ row, rowIndex }) {
      row.index = rowIndex
      let className = ''
      if (this.rowClassName) {
        className = this.rowClassName({ row, rowIndex })
      }
      if ((rowIndex + 1) % 4 === 2) {
        return `success-row ${className}`
      }
      if ((rowIndex + 1) % 2 === 0) {
        return `warning-row ${className}`
      }
      return className
    }
  },
  created () {
    this.initMsg()
  },
  watch: {
    /* tableData: {
      handler (val) {
        // this.doLayout()
      },
      deep: true
    } */
  },
  computed: {
    autoSums () {
      this.$nextTick(() => {
        this.doLayout()
      })
      return this.sums
    }
  }
}
