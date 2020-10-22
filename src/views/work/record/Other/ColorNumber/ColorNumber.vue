<template>
  <record-dialog
    name="ColorNumber"
    title="色号"
    :api="{
      get:'getColorNumber',
      del:'delColorNumber',
      update:'updateColorNumber',
      add:'addColorNumber'
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
