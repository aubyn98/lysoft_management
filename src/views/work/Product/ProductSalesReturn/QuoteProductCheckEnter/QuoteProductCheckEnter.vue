<template>
  <quote-dialog
    v-bind="$attrs"
    v-on="$listeners"
    api="getQuoteProductCheckEnter"
    name="QuoteProductCheckEnter"
    title="引用产品盘点入库"
    :columns="columnsXx"
    :formItems="formItems"
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
  }
}
</script>
<style lang="scss">

</style>
