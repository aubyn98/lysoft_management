export default {
  data () {
    return {
      // excel 表格导出相关
      excelFormat: {},
      excelData: []
    }
  },
  created () {
    this.columnsXx && (this.excelFormat = this.c2eFormat(this.columnsXx))
  },
  methods: {
    exportExcel () {
      this.$refs.autoForm.submitForm().then(form => {
        this.searchMsgHandle && this.searchMsgHandle(form)
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
