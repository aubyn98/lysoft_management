<template>
  <quote-dialog
    v-bind="$attrs"
    v-on="$listeners"
    api="getQuoteMaterialPurchase"
    name="QuoteMaterialPurchase"
    title="物料入库引用物料采购"
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
