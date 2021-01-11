export default {
  methods: {
    spanFn ({ row, column, rowIndex, columnIndex }) {
      return {
        rowspan: (row.count && row.count[column.property]) || 1,
        colspan:
            row.count && row.count[column.property]
              ? 1
              : this.mergeColumns.includes(column.property)
                ? 0
                : 1
      }
    },
    countMerge (data, keys = this.mergeColumns, num = keys.length - 1) {
      const obj = {}
      const arr = []
      const key = keys[num]
      const obj2 = {}
      data.forEach(t => {
        if (obj[t[key]]) {
          obj[t[key]].count++
          obj[t[key]].vals.push(t)
        } else {
          obj[t[key]] = {
            count: 1,
            prop: key,
            key: t[key],
            vals: [t],
            last: num === 0
          }
        }
      })
      data.forEach(t => {
        if (!obj2[t[key]]) {
          obj2[t[key]] = 1
          !t.count && (t.count = {})
          t.count[obj[t[key]].prop] = obj[t[key]].count
        }
      })
      Object.keys(obj).forEach(k => {
        const { vals, ...res } = obj[k]
        arr.push({
          ...res,
          vals: num > 0 ? this.countMerge(vals, keys, num - 1) : vals
        })
      })
      return arr
    }
  }
}
