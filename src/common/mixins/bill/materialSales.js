export default {
  methods: {
    dataChangeMx (mx) {
      const tableData = this.$refs.editTable.submitTable()
      const row =
              tableData[this.tableIndex] || this.$refs.editTable.getRowBlankData()
      if (mx.length > 0) {
        if (!mx.every((r) => Object.keys(r).every((k) => !r[k]))) {
          row.ps = 0
          row.sl = 0
          mx.forEach((r, i) => {
            Object.keys(r).forEach((k) => {
              if (
                r[k] &&
                      parseFloat(r[k]) > 0 &&
                      k !== 'index' &&
                      k !== 'xh' &&
                      k !== 'xj' &&
                      k !== 'id'
              ) {
                row.ps = this.$math.add(parseFloat(row.ps), 1)
                row.sl = this.$math.add(parseFloat(row.sl), parseFloat(r[k]))
              }
            })
          })
        }
        row.mx = mx
        row.je = this.$math.multiply(parseFloat(row.sl || 0), parseFloat(row.dj || 0))
        this.$refs.editTable.setRow(row, this.tableIndex)
      }
    },
    rowClick_edit_left (row) {
      this.currentRow_Jl = row
      let mx = null
      if (row.index !== this.tableIndex) {
        this.$refs.editTable3.initTableData([], false)
        mx = this.$refs.editTable3.submitTable()
      } else {
        mx = this.$refs.editTable3.submitTable()
      }
      row.mx = row.mx ? row.mx : mx
      if (row.mx.length > 0 || row.index !== this.tableIndex) {
        this.$refs.editTable3.initTableData(row.mx, false)
      }
      this.columnsLeft.forEach((c) => {
        if (c.prop === 'sl' || c.prop === 'ps') {
          c.readonly =
                  row.mx.length > 0 &&
                  !mx.every((r) => Object.keys(r).every((k) => !r[k]))
        }
      })
      this.tableIndex = row.index
    },
    dataChange (tableData) {
      this.$refs.autoForm.setFieldsValue({
        kdje: tableData.reduce((t, r) => {
          t = this.$math.add(
            this.$math.multiply(parseFloat(r.sl || 0), parseFloat(r.dj || 0)),
            t
          )
          return t
        }, 0)
      })
    },
    handleSubmit (msg) {
      if (!msg.khmc) {
        this.$message.info('客户名称不能为空！')
        return false
      }
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
      msg.tableData.forEach(it => {
        it.mx = this.$format.arr_sortKeys(it.mx, { initKeys: ['xh'] })
      })
      return true
    }
  }
}
