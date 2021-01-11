<template>
  <record-dialog
    name="Department"
    title="部门档案"
    :api="{
      get:'getDepartment',
      del:'delDepartment',
      update:'updateDepartment',
      add:'addDepartment'
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
