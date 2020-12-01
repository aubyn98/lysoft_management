export default {
  data () {
    return {
      // excel 表格导出相关
      excelData: []
    }
  },
  methods: {
    exportExcel () {
      this.$refs.autoForm.submitForm().then(form => {
        this.$api[this.api]({ ...form, ...(this.attach || {}) }).then(({ res }) => {
          this.excelData = res
          this.$nextTick(() => {
            this.$refs.exportExcel.exportData()
          })
        })
      })
    }
  }
}
