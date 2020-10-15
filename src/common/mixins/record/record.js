export default {
  data () {
    return {
      // 选中的信息
      currentRow: null,
      xxDataIndex: -1,
      // 操作禁用
      disabled: true
    }
  },
  methods: {
    // 表单相关---------------------------------------------
    initForm (val = null) {
      this.$refs.autoForm.initForm(val)
    },
    // 顶部编辑按钮相关---------------------------------------------
    editChange ({ action, edit, cb }) {
      if (action === 'del') {
        this.disabled = true
      } else if (!cb) {
        this.disabled = edit === 'save'
      }
      this[action](cb)
    },
    addsaveCommon (result, fn) {
      this.currentRow = result
      this.initForm(result)
      fn()
      this.disabled = true
      this.xxDataIndex = 0
      this.refresh()
    },
    addCommon () {
      this.initForm()
      this.currentRow = null
      this.xxDataIndex = -1
    },
    addcancelCommon () {
      this.initForm()
      this.currentRow = null
    },
    updatesaveCommon (api, fn, res, opt) {
      this.$api[api](res).then(
        (r) => {
          this.currentRow = { ...opt }
          fn()
          this.disabled = true
          this.refresh()
        },
        (e) => {}
      )
    },
    updatecancel () {
      this.initForm(this.currentRow)
    },
    // 表格相关---------------------------------------------
    rowClickXxCommon (row) {
      if (!this.disabled) {
        return
      }
      this.initForm(row)
      this.xxDataIndex = 0
      this.currentRow = this.$format.copy(row)
    },
    rowDblclickCommon (row) {
      this.initForm(row)
      this.xxDataIndex = 0
      this.currentRow = this.$format.copy(row)
    }
  }
}
