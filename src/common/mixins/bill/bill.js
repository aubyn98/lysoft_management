export default {
  methods: {
    initData (val = null, vTitle, vTable) {
      this.$refs.autoForm.initForm(val)
      this.$refs.editTable.initTableData(vTitle)
      this.$refs.editTable2.initTableData(vTable)
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
    }
  }
}
