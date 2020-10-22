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
    add () {
      this.initForm()
      this.currentRow = null
      this.xxDataIndex = -1
      this.$refs.Xx.setCurrentRow()
      this.tabIndex = this.editTab
      this.addAction && this.addAction()
    },
    addsave (fn) {
      const { api, prop } = this.addApi
      this.$refs.autoForm.submitForm().then(res => {
        this.addsaveAction && this.addsaveAction(res)
        this.$api[api](res).then(
          (r) => {
            const result = { ...res, id: r.res, [prop]: r[prop] }
            this.currentRow = result
            this.initForm(result)
            fn()
            this.disabled = true
            this.xxDataIndex = 0
            this.refresh()
          },
          (e) => {}
        )
      })
    },
    addcancel () {
      this.add()
    },
    update () {},
    updatesaveCommon (fn, res, opt) {
      const { api } = this.updateApi
      this.$api[api](res).then(
        r => {
          this.currentRow = { ...opt }
          fn()
          this.disabled = true
          this.refresh()
        },
        e => {}
      )
    },
    updatecancel () {
      this.updatecancelAction && this.updatecancelAction()
      this.initForm(this.currentRow)
    },
    del () {
      const { api, prop } = this.delApi
      this.$api[api]({ [prop]: this.currentRow[prop] }).then(() => {
        this.$refs.Xx.setCurrentRow()
        this.$refs.autoForm.submitForm().then(res => {
          if (res[prop] === this.currentRow[prop]) {
            this.add()
          }
          this.refresh()
        })
      })
    },
    // 表格相关---------------------------------------------
    refresh () {
      this.$refs.Xx.request(true)
      this.$refs.Lb.request(true)
      this.$refs.Ty.request(true)
    },
    rowClickXx (row) {
      if (!this.disabled) {
        return
      }
      this.initForm(row)
      this.xxDataIndex = 0
      this.currentRow = this.$format.copy(row)
      this.rowClickXxAction && this.rowClickXxAction(row)
    },
    rowDblclick (row, c, e) {
      this.rowClickXx(row, c, e)
      this.$refs.Xx.setCurrentRow()
      this.tabIndex = this.editTab
      this.rowDblclickAction && this.rowDblclickAction(row, c, e)
    }
  }
}
