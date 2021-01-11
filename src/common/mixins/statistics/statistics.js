export default {
  data () {
    return {
      count: 0,
      searchMsg: {},
      tableData: []
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.initSearchMsg().then(() => {
        !this.hideMount && this.request()
      })
    })
  },
  methods: {
    rowDblclick (row) {
      this.jumpTab && this.$emit('select', this.jumpTab, {
        cb (ref) {
          ref.getDataByDh(true, row.dh)
        }
      })
    },
    // 发送请求前触发    作用更改搜索条件  参数：msg-将要post的数据
    searchMsgHandle (msg) {
      msg.jdzt =
          msg.jdzt === '未结单'
            ? 0
            : msg.jdzt === '已结单'
              ? 1
              : ''
    },
    // 请求数据
    request (flag = true) {
      flag && this.clearTableHeader(flag)
      this.getSearchMsg().then(() => {
        const msg = { ...this.searchMsg, columns: { ...this.searchMsg.columns } }
        this.searchMsgHandle(msg)
        this.initAllTableData && this.initAllTableData()
        this.$api[this.api](msg)
          .then((data) => {
            this.mergeColumns && this.countMerge(data.res)
            this.count = data.count
            this.requestHandle && this.requestHandle(data)
            this.tableData = data.res
            this.$refs.searchTable.setSums(data)
          })
      })
    },
    // 清除表格搜索条件
    clearTableHeader (flag) {
      const searchTable = this.$refs.searchTable
      searchTable && searchTable.initMsg(flag)
    },
    // 初始化搜索条件
    initSearchMsg () {
      return new Promise(resolve => {
        this.clearTableHeader()
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
          this.searchMsg = {
            ...res,
            ...this.attach,
            columns: this.$refs.searchTable.getMsg(),
            ...this.$refs.searchTable.getSort()
          }
          resolve(this.searchMsg)
        })
      })
    },
    checkChange (row) {
      this.checkChangeApi && this.$api[this.checkChangeApi]({ dh: row.dh, jd: row.jd }).then(() => {

      })
    },
    // 表格搜索条件发生变化时触发
    sendChange () {
      this.request(false)
    },
    // 获取分组的key
    getGroupKey (it) {
      return this.groupKey.reduce((t, k) => {
        return t + it[k]
      }, '')
    },
    // 合并单元格
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
