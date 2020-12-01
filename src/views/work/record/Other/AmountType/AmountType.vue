<template>
  <record-dialog
    name="AmountType"
    title="金额类型"
    :api="{
      get:'getAmountType',
      del:'delAmountType',
      update:'updateAmountType',
      add:'addAmountType'
    }"
    permission
    :columns="columns"
    :formItems="formItems"
    v-on="listeners"
    v-bind="$attrs"
  />
</template>

<script type="text/javascript">
import { columnsPp as columns } from './columns'
import formItems from './formItems'
import { dialogRecord } from '@/common/mixins'
export default {
  data () {
    return { columns, formItems }
  },
  mixins: [dialogRecord]
}
</script>
