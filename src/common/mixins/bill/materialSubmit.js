export default {
  methods: {
    handleSubmit (msg) {
      msg.tableData = msg.tableData.filter((it) => it.wlbh && it.wlmc)
      if (
        msg.tableData.some((it, index) => {
          if (
            (it.wlmc !== '' || it.wlbh !== '') &&
              parseFloat(it.sl || 0) === 0
          ) {
            this.$message.info(`第${index + 1}行数量为空！`)
            return true
          }
        })
      ) {
        return false
      }
      msg.tableData = this.$format.arr_sortKeys(msg.tableData, {
        initKeys: ['ckdw'],
        delKeys: ['id']
      })
      return true
    }
  }
}
