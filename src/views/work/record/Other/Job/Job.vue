<template>
  <record-dialog
    name="Job"
    title="职务档案"
    :api="{
      get:'getJob',
      del:'delJob',
      update:'updateJob',
      add:'addJob'
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
