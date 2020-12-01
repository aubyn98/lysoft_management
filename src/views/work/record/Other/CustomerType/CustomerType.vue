<template>
  <record-dialog
    name="CustomerType"
    title="客户类型"
    permission
    :api="{
      get:'getCustomerType',
      del:'delCustomerType',
      update:'updateCustomerType',
      add:'addCustomerType'
    }"
    :columns="columns"
    :formItems="formItems"
    v-on="listeners"
    v-bind="$attrs"
  />
</template>

<script type="text/javascript">
import { columnsType as columns } from './columns'
import formItems from './formItems'
import { dialogRecord } from '@/common/mixins'
export default {
  data () {
    return { columns, formItems }
  },
  mixins: [dialogRecord]
}
</script>
