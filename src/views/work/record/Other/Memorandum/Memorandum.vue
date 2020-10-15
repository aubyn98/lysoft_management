<template>
  <record-dialog
    name="Memorandum"
    title="备忘录"
    :api="{
      get:'getMemorandum',
      del:'delMemorandum',
      update:'updateMemorandum',
      add:'addMemorandum'
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
