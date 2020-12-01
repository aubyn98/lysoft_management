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
      this.$api[this.excelApi]().then(({ res }) => {
        this.excelData = res
        this.$nextTick(() => {
          this.$refs.exportExcel.exportData()
        })
      })
    }
  }
}
