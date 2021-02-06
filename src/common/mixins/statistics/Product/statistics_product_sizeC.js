export default {
  data () {
    return {
      sizeColumns: [],
      sums: {}
    }
  },
  computed: {
    attachColumns () {
      return this.sizeColumns.filter(c => this.sums[c.prop])
    }
  },
  methods: {
    request (flag = true) {
      flag && this.clearTableHeader(flag)
      this.getSearchMsg().then(() => {
        const msg = { ...this.searchMsg, columns: { ...this.searchMsg.columns } }
        this.searchMsgHandle(msg)
        this.initAllTableData && this.initAllTableData()
        this.$api[this.api](msg)
          .then((data) => {
            this.currentRow = null
            this.mergeColumns && this.countMerge(data.res)
            this.count = data.count
            this.requestHandle && this.requestHandle(data)
            this.tableData = data.res
            const { res, status, count, ...r } = data
            this.sums = r
            this.$nextTick(() => {
              this.$refs.searchTable.setSums(data)
            })
          }).catch(e => {
            this.tableData = []
            this.sums = {}
          })
      })
    }
  },
  async created () {
    try {
      const { res } = await this.$api.getSize()
      this.sizeColumns = res.reduce((t, c) => {
        t.push({
          label: c.ms,
          prop: c.ms,
          sumProp: c.ms,
          width: 100,
          show: true
        })
        return t
      }, [])
      this.sizeColumns.push({
        label: '合计',
        prop: 'hj',
        sumProp: 'hj',
        width: 100,
        show: true
      })
    } catch (e) {
      this.sizeColumns = []
    }
  }

}
