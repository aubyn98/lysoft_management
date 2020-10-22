export default {
  data () {
    return {
      count: 0,
      searchMsg: {},
      tableData: []
    }
  },
  mounted () {
    this.initSearchMsg().then(() => {
      this.request()
    })
  },
  methods: {
    searchMsgHandle () {
      this.searchMsg.jdzt =
          this.searchMsg.jdzt === '未结单'
            ? 0
            : this.searchMsg.jdzt === '已结单'
              ? 1
              : ''
    },
    request (flag = true) {
      this.getSearchMsg().then(() => {
        flag && this.clearTableHeader(flag)
        this.searchMsgHandle()
        this.$api[this.api](this.searchMsg)
          .then((data) => {
            this.countMerge(data.res)
            this.count = data.count
            this.tableData = data.res
            this.$refs.searchTable.setSums(data)
          })
          .catch((e) => {})
      })
    },
    clearTableHeader (flag) {
      this.$refs.searchTable.initMsg(flag)
    },
    initSearchMsg () {
      return new Promise(resolve => {
        this.clearTableHeader()
        this.getSearchMsg().then((res) => {
          this.searchMsg.ksrq = this.$format.getDate(
            new Date(new Date().getTime() - 2592000000)
          )
          this.searchMsg.jsrq = this.$format.getDate(new Date())
          this.$refs.autoForm.initForm(this.searchMsg)
          resolve(this.searchMsg)
        })
      })
    },
    getSearchMsg () {
      return new Promise((resolve) => {
        this.$refs.autoForm.submitForm().then((res) => {
          this.searchMsg = {
            ...res,
            ...this.attach,
            columns: this.$refs.searchTable.msg
          }
          resolve(this.searchMsg)
        })
      })
    },
    sendChange () {
      this.request(false)
    },
    getGroupKey (it) {
      return this.groupKey.reduce((t, k) => {
        return t + it[k]
      }, '')
    },
    countMerge (data) {
      const obj = {}
      data.forEach((it) => {
        const tempK = this.getGroupKey(it)
        obj[tempK]
          ? obj[tempK]++
          : (obj[tempK] = 1)
      })
      const obj2 = {}
      data.forEach((it) => {
        const tempK = this.getGroupKey(it)
        if (!obj2[tempK]) {
          it.count = obj[tempK]
          obj2[tempK] = true
        } else {
          it.count = false
        }
      })
    }
  }
}
