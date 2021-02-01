export default {
  created () {
    this.excelFormat = this.c2eFormat(this.columnsList)
  },
  methods: {
    rowclick (row) {
      if (!this.disabled) return
      this.$refs.autoForm.initForm(row)
      this.$refs.editTable2 && this.$refs.editTable2.initTableData([row], false)
      this.currentRow = row
    },
    sub (prop) {
      return []
    },
    getData () {
      return new Promise(resolve => {
        this.$refs.autoForm.submitForm().then(res => {
          const titleTableData = this.$refs.editTable2.submitTable()[0]
          const sendData = { ...res, ...titleTableData }
          resolve(sendData)
        })
      })
    },
    request () {
      this.$refs.statistic.request()
    },
    submitEnd ({ tableData, ...msg }, type) {
      msg.yggh === '多位员工' || msg.ygmc === '多位员工' ? (this.currentRow = null || this.initData()) : (this.currentRow = msg)
      this.$refs.autoForm.initForm(msg)
      this.request()
    },
    update () {
      this.tabIndex = '添加列表'
    }
  }
}
