<template>
  <record-dialog
    name="Type"
    title="类型"
    permission
    :api="{
      get:'getType',
      del:'delType',
      update:'updateType',
      add:'addType'
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
