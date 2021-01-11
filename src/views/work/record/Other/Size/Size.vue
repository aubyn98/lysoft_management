<template>
  <record-dialog
    name="Size"
    title="尺码档案"
    :api="{
      get:'getSize',
      del:'delSize',
      update:'updateSize',
      add:'addSize'
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
