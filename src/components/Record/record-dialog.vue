
<script type="text/javascript">
export default {
  render (h, c) {
    const { select, rowClick, rowCheckChange, rows, sendChange, currentRow, api, activeIndex, columns, formItems, selection, $attrs, $listeners, permission, columnsChange } = this
    const { visible, title, ...props } = $attrs
    const { selectEnd, ...listeners } = $listeners
    const $permission = this.$permission([{ mc: title, xg: true }])
    return (
      <el-dialog props={{ visible, center: true, title, 'append-to-body': $attrs['append-to-body'] }} on={{ close: () => { this.$emit('update:visible'); this.$emit('close') } }}>
        <header-btn props={{ border: true, activeIndex: activeIndex }} hideEdit>
          {($permission || permission) && <el-button type="primary" size="mini" on={{ click: this.add }}>添加</el-button>}
          {($permission || permission) && <el-button type="warning" size="mini" on={{ click: () => this.edit(false) }}>修改</el-button>}
          {($permission || permission) && <el-button type="danger" size="mini" on={{ click: this.del }}>删除</el-button>}
          {/* eslint-disable-next-line */}
          {selection ? <el-button type="success" size="mini" on={{ click: () => { selectEnd(rows == false ? [currentRow] : rows) } }}>选择完毕</el-button> : ''}
        </header-btn>
        <div class="page-RowContent" style={{ height: '500px' }}>
          {visible ? (<search-table
            small
            ref="searchTable"
            props={{ columns, pageSize: 30, api: api.get, ...props, selection }}
            on={{ select, 'select-all': select, 'row-click': rowClick, ...listeners, 'check-change': rowCheckChange, 'send-change': sendChange, 'columns-change': columnsChange }}
          />) : ''}
        </div>
        <el-dialog props={{ visible: this.subVisible, 'append-to-body': true }} on={{ close: this.closeInnerDialog, 'row-dblclick': (row) => { selectEnd([row]) } }} class="innerDialog">
          <auto-form ref="autoForm" props={{ formItems }}/>
          <span slot="footer" class="dialog-footer">
            <el-button size="mini" on={{ click: this.closeInnerDialog }}>取 消</el-button>
            <el-button size="mini" type="primary" on={{ click: this.submitForm }}>确 定</el-button>
          </span>
        </el-dialog>
      </el-dialog>
    )
  },
  props: {
    columns: {
      type: Array,
      required: true
    },
    formItems: {
      type: Array,
      required: true
    },
    api: {
      type: Object
    },
    selection: {
      type: Boolean,
      default: false
    },
    permission: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      rows: [],
      subVisible: false,
      currentRow: null,
      currentRowIndex: -1
    }
  },
  watch: {
    '$attrs.visible' (val) {
      if (!val) this.currentRow = null
    }
  },
  methods: {
    columnsChange (c) {
      this.$emit('update:columns', c)
    },
    sendChange () {
      this.currentRow = null
    },
    rowCheckChange ({ index, ...row }) {
      this.$api[this.api.update](row).then(res => {
        this.$refs.searchTable.request(true)
      })
    },
    submitForm () {
      this.$refs.autoForm.submitForm().then(({ index, ...r }) => {
        this.$api[this.api[this.currentRow ? 'update' : 'add']]({ ...r, ...(this.$attrs.params ? this.$attrs.params : {}) }).then(res => {
          this.$refs.searchTable.request(true)
          this.currentRow = { ...(this.currentRow || {}), ...r, ...(res.id ? { id: res.id } : {}) }
          this.initForm()
          this.subVisible = false
        }, e => {})
      })
    },
    openInnerDialog () {
      this.subVisible = true
    },
    closeInnerDialog () {
      this.subVisible = false
    },
    initForm () {
      this.$nextTick(() => {
        // console.log(this.$refs.autoForm.initForm)
        this.$refs.autoForm.initForm(this.currentRow)
      })
    },
    edit (flag) {
      if (!this.currentRow && !flag) return this.$message.error('请选择要修改数据')
      this.openInnerDialog()
      this.initForm()
    },
    add () {
      this.$refs.searchTable.setCurrentRow()
      this.currentRow = null
      this.currentRowIndex = -1
      this.edit(true)
    },
    rowClick (row) {
      this.currentRow = row
      this.currentRowIndex = row.index
    },
    del () {
      if (!this.currentRow) return this.$message.error('请选择要删除数据')
      this.$api[this.api.del]({ id: this.currentRow.id }).then(res => {
        this.currentRow = null
        this.$refs.searchTable.delRow(this.currentRowIndex)
      }, e => {})
    },
    select (rows) {
      this.rows = rows
    }
  }
}
</script>
