<template>
  <record-dialog
    name="Band"
    title="品牌"
    :api="{
      get:'getBand',
      del:'delBand',
      update:'updateBand',
      add:'addBand'
    }"
    selection
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
