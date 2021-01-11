<template>
  <record-dialog
    name="SalaryBalanceType"
    title="工资结算方式"
    :api="{
      get:'getSalaryBalanceType',
      del:'delSalaryBalanceType',
      update:'updateSalaryBalanceType',
      add:'addSalaryBalanceType'
    }"
    permission
    :columns.sync="columns"
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
