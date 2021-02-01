export default {
  data () {
    return {
      PVisible: false
    }
  },
  methods: {
    multipleConfirm (kh, data, ms) {
      if (!data.length) return
      ms = this.generateSizeColumns(ms)
      const editTable = this.$refs.editTable
      const blankRow = editTable.getRowBlankData()
      const res = data.reduce((t, mx) => {
        const row = { ...blankRow, kh, sl: mx.reduce((t, r) => this.$math.add(t, r.hj), 0), mx, msC: ms }
        t.push(row)
        return t
      }, [])
      editTable.pushRow(res)
    },
    dataChangeMx (mx) {
      const editTable = this.$refs.editTable
      const tableData = editTable.submitTable()
      const mxBlankRow = this.$refs.editTable3.getRowBlankData()
      const row =
        tableData[this.tableIndex] || editTable.getRowBlankData()
      if (mx.length) {
        if (!mx.every((r) => Object.keys(r).every((k) => !r[k]))) {
          row.sl = mx.reduce((t, r) => {
            t = this.$math.add(t, r.hj || 0)
            return t
          }, 0)
        }
        row.mx = mx.map(m => Object.keys(mxBlankRow).reduce((t, k) => {
          t[k] = m[k]
          return t
        }, {}))
        row.je = this.$math.multiply(parseFloat(row.sl || 0), parseFloat(row.dj || 0))
        editTable.setRow(row, this.tableIndex)
      }
    },
    rowClick_edit_left (row) {
      const editTable3 = this.$refs.editTable3
      this.currentRow_Jl = row
      let mx = null
      if (row.index !== this.tableIndex) {
        editTable3.initTableData([], false)
        mx = editTable3.submitTable()
      } else {
        mx = editTable3.submitTable()
      }
      row.mx = row.mx ? row.mx : mx
      this.columnsRight = row.msC ? row.msC : []
      if (row.mx.length > 0 || row.index !== this.tableIndex) {
        editTable3.initTableData(row.mx, false)
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
    submitEnd ({ dh }) {
      this.getDataByDh(true, dh)
    },
    getDataByDh (flag = true, dh = null) {
      this.tableIndex = 0
      this.$api[this.api.getByDh]({ dh: dh || this.currentRow.dh }).then(
        ({ res }) => {
          res = res instanceof Array ? res[0] : res
          // eslint-disable-next-line no-prototype-builtins
          res.hasOwnProperty('ljqk') && (res.ljqk1 = res.ljqk)
          const { tableData, ...msg } = res
          flag && (this.tabIndex = '添加列表')
          this.currentRow = this.$format.copy(res)
          const excludes = ['hj', 'xh', 'xh2', 'ysmc']
          tableData.forEach(r => {
            if (r.mx.length) {
              r.mx.forEach(r2 => {
                r.msC = this.generateSizeColumns(Object.keys(r2).filter(k => excludes.indexOf(k) === -1).map(m => ({ ms: m })))
              })
            } else {
              r.msC = []
            }
          })
          this.columnsRight = tableData.length ? tableData[0].msC : []
          this.initData(msg, [msg], tableData, this.initMx(tableData), false)
        }
      )
    },
    generateSizeColumns (ms) {
      const columns = ms.reduce((t, m) => {
        t.push({
          label: m.ms,
          prop: m.ms,
          sumProp: m.ms,
          width: 100,
          dynamic: true
        })
        return t
      }, [{
        label: '颜色',
        prop: 'ysmc',
        width: 100,
        show: true,
        elType: 'autocomplete',
        api: 'getColor',
        dynamic: true
      }])
      columns.push({
        label: '合计',
        prop: 'hj',
        sumProp: 'hj',
        width: 100,
        show: true,
        dynamic: true,
        readonly: true,
        computed: `
            const excludes = ['hj', 'xh', 'xh2', 'ysmc','index']
            return Object.keys(r).reduce((t,k)=>{
                if(excludes.indexOf(k) === -1){
                    t = this.$math.add(t,r[k] || 0)
                }
                return t
            },0)
          `
      })
      return columns
    },
    editAutocompleteSelect (v, { prop }, r) {
      if (prop === 'kh') {
        const columns = this.generateSizeColumns(v.ms)
        this.columnsRight = columns
        r.msC = columns
      }
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
      /* if (!msg.khmc) {
        this.$message.info('客户名称不能为空！')
        return false
      } */
      msg.tableData = msg.tableData.filter((it) => it.kh)
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
        it.mx = this.$format.arr_sortKeys(it.mx, { initKeys: ['xh', 'xh2'] })
      })
      msg.tableData.forEach(r => {
        delete r.msC
      })
      return true
    }
  }
}
