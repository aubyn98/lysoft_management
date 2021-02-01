import store from '@/store'
export default {
  install (Vue) {
    Vue.prototype.$authentication = function () {
      return new Promise((resolve, reject) => {
        this.$prompt('请输入密码', '验证', {
          inputType: 'password',
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /.+/,
          inputErrorMessage: '请输入密码',
          closeOnClickModal: false
        })
          .then(({ value: mm }) => {
            this.$api
              .validateAuth({ mm })
              .then(() => {
                resolve(true)
              })
              .catch(e => {
                reject(e)
              })
          })
          .catch(e => {
            reject(e)
          })
      })
    }
    Vue.prototype.$permission = function (arr) {
      const qx = store.state.qx
      return arr.every(({ mc, ...auth }) => {
        if (qx[mc]) {
          return Object.keys(auth).every(k => {
            return qx[mc][k]
          })
        } else {
          return false
        }
      })
    }
    Vue.prototype.c2eFormat = function (c) {
      return c.reduce((t, c) => {
        t[c.prop] = c.label
        return t
      }, {})
    }
    Vue.prototype.getSizeColumns = function (data, groupKeys, childKey, sumKey) {
      // 分组横向合计条件 groupKeys
      // 收集动态的码数
      const sizes = []
      // 横向合计分组
      const horizontal = {}
      // 纵向合计
      const sums = {}
      data.forEach(item => {
        if (sizes.indexOf(item.ms) === -1) sizes.push(item.ms)
        const num = item[childKey] || 0
        item[item.ms] = num
        sums[sumKey.prop] =
          sumKey.prop in sums ? this.$math.add(sums[sumKey.prop], num) : num
        sums[item.ms] =
          item.ms in sums ? this.$math.add(sums[item.ms], num) : num
        const key = groupKeys.reduce((t, g) => t + item[g], '')
        if (horizontal[key]) {
          horizontal[key].push(item)
        } else {
          horizontal[key] = [item]
        }
      })
      /*eslint-disable */
      // 添加字段后的数据
      const result = Object.keys(horizontal).reduce((t, k) => {
        const key = sumKey.prop
        const collect = { [key]: 0 }
        t.push(
          horizontal[k].reduce((t2, it) => {
            collect[key] = this.$math.add(collect[key], it[childKey] || 0)
            delete it[childKey]
            return { ...t2, ...it, ...collect }
          }, {})
        )
        return t
      }, [])
      const columns = sizes.map(ms => ({
        label: ms,
        prop: ms,
        sumProp: ms,
        width: 100,
        show: true
      }))
      columns.push({
        sumProp: sumKey.prop,
        width: 100,
        show: true,
        ...sumKey
      })
      return {
        sizes,
        result,
        sums,
        columns
      }
    }
    Vue.prototype.getSizeMultistageColumns = function(
      data,
      groupKeys,
      childKeys,
      sumKey
    ) {
      // 分组横向合计条件 groupKeys
      // 收集动态的码数
      const sizes = []
      // 横向合计分组
      const horizontal = {}
      const horizontalCollection = childKeys.reduce((prev, cur) => {
        prev[cur.prop] = 0
        return prev
      }, {})
      // 纵向合计
      const sums = {}
      data.forEach(item => {
        if (sizes.indexOf(item.ms) === -1) sizes.push(item.ms)
        childKeys.forEach(c => {
          const tmepKey = c.prop + '_' + sizes.indexOf(item.ms)
          const num = item[c.prop] || 0
          item[tmepKey] = num
          // delete item[c.prop]
          sums[c.prop] =
            c.prop in sums ? this.$math.add(sums[c.prop], num) : num
          sums[tmepKey] =
            tmepKey in sums ? this.$math.add(sums[tmepKey], num) : num
        })
        const key = groupKeys.reduce((t, g) => t + item[g], '')
        if (horizontal[key]) {
          horizontal[key].push(item)
        } else {
          horizontal[key] = [item]
        }
      })
      /*eslint-disable */
      // 添加字段后的数据
      const result = Object.keys(horizontal).reduce((t, k) => {
        const collect = { ...horizontalCollection }
        t.push(
          horizontal[k].reduce((t2, it) => {
            Object.keys(collect).forEach(k => {
              collect[k] = this.$math.add(collect[k], it[k] || 0)
            })
            return { ...t2, ...it, ...collect }
          }, {})
        )
        return t
      }, [])
      const columns = sizes.reduce((t, s, i) => {
        t.push({
          label: s,
          prop: s,
          width: 100,
          show: true,
          children: childKeys.map(c => {
            const prop = c.prop + '_' + i
            return {
              width: 100,
              show: true,
              ...c,
              prop: prop,
              sumProp: prop
            }
          })
        })
        return t
      }, [])
      columns.push({
        width: 100,
        show: true,
        ...sumKey,
        children: childKeys.map(c => {
          return {
            width: 100,
            show: true,
            sumProp: c.prop,
            ...c
          }
        })
      })
      return {
        sizes,
        result,
        sums,
        columns
      }
    }
  }
}
