export default {
  data () {
    return {
      disabled: true,
      tabIndex: '添加列表',
      currentRow: null
    }
  },
  mounted () {
    this.initData()
  },
  methods: {
    autocompleteSelect ({ v, prop }) {
      switch (prop) {
        case 'ghsmc':
          this.$api[this.autocompleteApi[prop]]({ ghsbh: v.ghsbh })
            .then((data) => {
              data.res.length > 0 &&
                this.$refs.autoForm.setFieldsValue({
                  qdqk: data.res[0].ljqk,
                  ljqk: data.res[0].ljqk,
                  ljqk1: data.res[0].ljqk
                })
            })
          break
        case 'khmc':
          this.$api[this.autocompleteApi[prop]]({ khbh: v.khbh })
            .then((data) => {
              data.res.length > 0 &&
                this.$refs.autoForm.setFieldsValue({
                  qdqk: data.res[0].ljqk,
                  ljqk: data.res[0].ljqk,
                  ljqk1: data.res[0].ljqk
                })
            })
          break
      }
    },
    initData (val = null, vTitle, vTable, flag = true) {
      this.$refs.autoForm && this.$refs.autoForm.initForm(val)
      this.$refs.editTable && this.$refs.editTable.initTableData(vTable, flag)
      this.$refs.editTable2 && this.$refs.editTable2.initTableData(vTitle, flag)
    },
    getData () {
      return new Promise(resolve => {
        this.$refs.autoForm.submitForm().then(res => {
          const titleTableData = this.$refs.editTable2.submitTable()[0]
          const tableData = this.$refs.editTable.submitTable()
          const sendData = { ...res, ...titleTableData, tableData }
          resolve(sendData)
        })
      })
    },
    rowClickXx (row) {
      this.currentRow = row
    },
    rowDblclick (row) {
      this.currentRow = row
      this.getDataByDh()
    },
    getDataByDh (flag = true, dh = null) {
      this.$api[this.api.getByDh]({ dh: dh || this.currentRow.dh }).then(({ res }) => {
        res = res instanceof Array ? res[0] : res
        // eslint-disable-next-line no-prototype-builtins
        res.hasOwnProperty('ljqk') && (res.ljqk1 = res.ljqk)
        const { tableData, ...msg } = res
        flag && (this.tabIndex = '添加列表')
        this.currentRow = this.$format.copy(res)
        this.initData(msg, [msg], tableData, false)
      })
    },
    add () {
      this.tabIndex = '添加列表'
      this.initData()
    },
    submit (api, cb) {
      this.getData().then(({ tableData, ...res }) => {
        const m = { tableData, ...res }
        if (this.handleSubmit && !this.handleSubmit(m)) {
          return
        }
        // this.$refs.editTable.initTableData(m.tableData, false)
        this.$api[this.api[api]](m).then(data => {
          this.disabled = true
          const { msg, status, ...res } = data
          this.submitEnd({ ...m, ...res }, api)
          cb()
        })
      })
    },
    request () {
      this.$refs.List && this.$refs.List.request()
    },
    handleExamine () {
      if (!this.currentRow) {
        return this.$message.info('请选择要审核的单据！')
      }
      this.$api[this.api.examine]({
        dh: this.currentRow.dh,
        sh: !this.currentRow.sh
      })
        .then((res) => {
          this.currentRow.sh = !this.currentRow.sh
          this.request && this.request()
        })
    },
    handleStatement () {
      if (!this.currentRow) {
        return this.$message.info('请选择要结单的单据！')
      }
      this.$api[this.api.statement]({ dh: this.currentRow.dh, jd: !this.currentRow.jd }).then(res => {
        this.currentRow.jd = !this.currentRow.jd
        this.request && this.request()
      })
    },
    handleNullify () {
      if (!this.currentRow) {
        return this.$message.info('请选择要作废的单据！')
      }
      this.$api[this.api.nullify]({
        dh: this.currentRow.dh,
        ch: !this.currentRow.ch
      })
        .then((res) => {
          this.currentRow.ch = !this.currentRow.ch
          this.request && this.request()
        })
    },
    addsave (cb) {
      this.submit('add', cb)
    },
    addcancel () {
      if (this.currentRow) {
        const { tableData, ...msg } = this.currentRow
        this.initData(msg, [msg], tableData, false)
      } else {
        this.initData()
      }
    },
    updatesave (cb) {
      this.submit('update', cb)
    },
    update () {
      this.tabIndex = '添加列表'
      this.currentRow && this.getDataByDh()
    },
    updatecancel () {
      const { tableData, ...msg } = this.currentRow
      this.initData(msg, [msg], tableData, false)
    },
    del () {
      if (!this.currentRow) return this.$message.info('请先选择要删除的数据！')
      this.$api[this.api.del]({ ...this.currentRow, dh: this.currentRow.dh }).then(res => {
        const List = this.$refs.List
        this.currentRow = null
        List && List.setCurrentRow && List.setCurrentRow() && List.request && List.request()
        this.request && this.request()
        this.initData()
      })
    },
    editChange ({ action, edit, cb }) {
      if (action === 'del') {
        this.disabled = true
      } else if (!cb) {
        this.disabled = edit === 'save'
      }
      this[action](cb)
    }
  },
  computed: {
    activeIndex () {
      return this.currentRow ? 1 : -1
    }
  }
}
