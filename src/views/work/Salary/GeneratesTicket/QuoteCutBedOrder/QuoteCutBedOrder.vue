<template>
  <quote-dialog
    v-bind="$attrs"
    v-on="$listeners"
    api="getQuoteCutBedOrder"
    name="QuoteCutBedOrder"
    title="引用裁床单"
    :columns.sync="columnsXx"
    :formItems="formItems"
    :attach-columns-fn="attachColumnsFn"
  />
</template>

<script type="text/javascript">
import { columnsLeft as columnsXx } from './columns'
import formItems from './formItems'
export default {
  data () {
    return {
      columnsXx,
      formItems
    }
  },
  methods: {
    attachColumnsFn (data, keys) {
      return Object.keys(data.res[0]).reduce((t, k) => {
        if (keys.indexOf(k) === -1 && ['id', 'xz'].indexOf(k) === -1) {
          t.push({
            label: k === 'hj' ? '合计' : k,
            dynamic: true,
            prop: k,
            width: 120,
            show: true
          })
        }
        return t
      }, [])
    }
  }
}
</script>
<style lang="scss">

</style>
