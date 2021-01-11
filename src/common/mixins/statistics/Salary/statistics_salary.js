export default {
  data () {
    return {
      treeFlag: true
    }
  },
  methods: {
    checkboxchange (v, p) {
      this.treeFlag = !v
    },
    searchMsgHandle (msg) {
      const { yggh, staffs, departments } = msg
      if (yggh) {
        msg.yggh = [yggh]
        delete msg.departments
      } else {
        staffs && staffs.length ? (msg.yggh = [...staffs.map(s => s.yggh)]) : (delete msg.yggh)
        departments && departments.length && (msg.departments = `'${departments.join('\',\'')}'`)
      }
      delete msg.staffs
    },
    dateChange (v) {
      // this.$refs.MonthSelector.clear()
    },
    monthChange (v) {
      this.$refs.autoForm.setFieldsValue(v)
    },
    initSearchMsg () {
      return new Promise(resolve => {
        this.clearTableHeader()
        this.$refs.tree.resetChecked()
        this.getSearchMsg().then((res) => {
          let startDate = this.$format.getDate(new Date(new Date().getTime() - 2592000000))
          let endDate = this.$format.getDate(new Date())
          const company = this.$store.state.company
          if (company) {
            const dateDict = this.$format.dateDict[company.rqlx]
            startDate = dateDict.startDate
            endDate = dateDict.endDate
          }
          !this.searchMsg.ksrq && (this.searchMsg.ksrq = startDate)
          !this.searchMsg.jsrq && (this.searchMsg.jsrq = endDate)
          this.$refs.autoForm.initForm(this.searchMsg)
          resolve(this.searchMsg)
        })
      })
    },
    // 获取右侧表单信息和表格搜索信息及页码
    getSearchMsg () {
      return new Promise((resolve) => {
        this.$refs.autoForm.submitForm().then((res) => {
          const treeNodes = this.$refs.tree.getCheckedNodes()
          if (treeNodes.departments) treeNodes.departments = treeNodes.departments.map(c => c.bm)
          this.searchMsg = {
            ...res,
            ...this.attach,
            ...treeNodes,
            columns: this.$refs.searchTable.getMsg(),
            ...this.$refs.searchTable.getSort()
          }
          resolve(this.searchMsg)
        })
      })
    }
  }
}
