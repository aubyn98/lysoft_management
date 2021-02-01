export default {
  data () {
    return {
      visible: false,
      excludeKeys: null
    }
  },
  methods: {
    attachColumnsFn (data, keys) {
      const arr = []
      this.excludeKeys = [...keys, 'index', '1112', 'xz', 'xh', 'xh2', 'dw', 'mbjs', 'dmms', 'hj', 'sl', 'ysmc']
      const collect = {}
      let ms = null
      data.res.forEach(d => {
        const { tableData, ...msg } = d
        ms = ms || Object.keys(tableData[0] || []).filter(k => this.excludeKeys.indexOf(k) === -1)
        tableData.forEach(r => {
          arr.push({ ...r, ...msg, source: r })
          ms.forEach(m => {
            const num = r[m] || 0
            collect[m] = collect[m] ? this.$math.add(collect[m], num) : num
          })
        })
      })
      data.res = arr
      const filterKeys = Object.keys(collect).filter(k => collect[k])
      const columns = ms.filter(m => filterKeys.includes(m)).map(m => ({
        label: m,
        prop: m,
        sumProp: m,
        width: 100,
        show: true
      }))
      columns.push({
        label: '合计',
        prop: 'hj',
        sumProp: 'hj',
        width: 100,
        show: true
      })
      return columns
    },
    quoteDh () {
      this.$refs.autoForm.submitForm().then((res) => {
        if ('ghsbh' in res) this.params.ghsbh = res.ghsbh
        if ('khbh' in res) this.params.khbh = res.khbh
        this.params.ids = this.$refs.editTable
          .submitTable()
          .filter((it) => it.yyid)
          .map((it) => it.yyid)
          .join(',')
        this.visible = true
      })
    },
    quoteSelectEnd (selection) {
      if (!selection.length) return
      const editTable = this.$refs.editTable
      const blankRow = editTable.getRowBlankData()
      const dhs = selection.reduce((t, s) => {
        t[s.dh] ? t[s.dh].push(s) : (t[s.dh] = [s])
        return t
      }, {})
      const arr = Object.keys(dhs).reduce((t, k) => {
        const temp = { ...blankRow }
        const collect = {}
        let ms = []
        dhs[k].forEach(({ source: r }, i) => {
          if (i === 0) {
            Object.keys(temp).forEach(k => {
              temp[k] = r[k] || ''
            })
            ms = Object.keys(r).filter(k => this.excludeKeys.indexOf(k) === -1)
          }
          ms.forEach(m => {
            const num = r[m] || 0
            collect[m] = collect[m] ? this.$math.add(collect[m], num) : num
          })
        })
        temp.sl = dhs[k].reduce((t, r) => this.$math.add(t, r.hj || 0), 0)
        temp.yydh = k
        const filterKeys = Object.keys(collect).filter(k => collect[k])
        const columns = ms.filter(m => filterKeys.includes(m)).reduce((t, m) => {
          t.push({
            label: m,
            prop: m,
            sumProp: m,
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

        temp.msC = columns
        temp.mx = dhs[k].map(({ source, ...msg }) => columns.reduce((t, c) => {
          t[c.prop] = msg[c.prop]
          return t
        }, {}))
        t.push(temp)
        return t
      }, [])
      editTable.pushRow(
        arr
      )
    }
  }
}
