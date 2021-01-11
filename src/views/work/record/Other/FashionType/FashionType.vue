<template>
  <record-dialog
    name="FashionType"
    title="款式类型"
    permission
    :api="{
      get:'getFashionType',
      del:'delFashionType',
      update:'updateFashionType',
      add:'addFashionType'
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
