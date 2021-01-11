<template>
  <record-dialog
    name="Trademark"
    title="商标档案"
    :api="{
      get:'getTrademark',
      del:'delTrademark',
      update:'updateTrademark',
      add:'addTrademark'
    }"
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
