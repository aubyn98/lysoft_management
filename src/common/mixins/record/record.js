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
  props: {
    sub: {
      type: [Array, Boolean],
      default: false
    },
    visible: {
      type: Boolean,
      required: true,
      default: true
    },
    appendToBody: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    closeDialog () {
      this.$emit('update:visible', false)
      this.$emit('close')
    },
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
            this.refresh(false)
          },
          (e) => {}
        )
      })
    },
    addcancel () {
      this.add()
      this.$refs.autoForm.clearValidate()
    },
    update () {
      this.tabIndex = this.editTab
    },
    updatesaveCommon (fn, res, opt) {
      const { api } = this.updateApi
      this.$api[api](res).then(
        r => {
          this.currentRow = { ...opt }
          fn()
          this.disabled = true
          this.refresh(false)
        },
        e => {}
      )
    },
    updatecancel () {
      this.updatecancelAction && this.updatecancelAction()
      this.initForm(this.currentRow)
      this.$refs.autoForm.clearValidate()
    },
    del () {
      const { api, prop } = this.delApi
      this.$api[api]({ [prop]: this.currentRow[prop] }).then(() => {
        this.$refs.Xx.setCurrentRow()
        this.$refs.autoForm.submitForm().then(res => {
          if (res[prop] === this.currentRow[prop]) {
            this.add()
          }
          this.refresh(false)
        })
      })
    },
    // 表格相关---------------------------------------------
    refresh (flag = true) {
      this.$refs.Xx && this.$refs.Xx.request(flag)
      this.$refs.Lb && this.$refs.Lb.request(flag)
      this.$refs.Ty && this.$refs.Ty.request(flag)
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
      if (this.sub) {
        if (this.sub instanceof Array && this.sub.length > 0) {
          row = this.sub.reduce((t, it) => {
            t[it] = row[it]
            return t
          }, {})
        }
        this.$emit('row-dblclick', row)
        this.closeDialog()
      }
      this.rowDblclickAction && this.rowDblclickAction(row, c, e)
    }
  }
}
