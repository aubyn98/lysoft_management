<template>
  <record-dialog
    name="Gears"
    title="档位档案"
    :api="{
      get:'getGears',
      del:'delGears',
      update:'updateGears',
      add:'addGears'
    }"
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
