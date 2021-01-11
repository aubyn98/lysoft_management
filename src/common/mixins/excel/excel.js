export default {
  data () {
    return {
      // excel 表格导出相关
      excelFormat: {},
      excelData: []
    }
  },
  methods: {
    exportExcel () {
      const statistic = this.$refs.statistic
      const autoForm = statistic ? statistic.$children[1] : this.$refs.autoForm
      const { columns, ...form } = autoForm ? autoForm.ruleForm : {}
      this.$api[this.excelApi](form).then(({ res }) => {
        this.excelData = res
        this.$nextTick(() => {
          this.$refs.exportExcel.exportData()
        })
      })
    }
  }
}
