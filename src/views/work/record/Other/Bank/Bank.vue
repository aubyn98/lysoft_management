<template>
  <record-dialog
    name="BankRecord"
    title="银行档案"
    :api="{
      get:'getBank',
      del:'delBank',
      update:'updateBank',
      add:'addBank'
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
