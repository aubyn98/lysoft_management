<template>
  <record-dialog
    name="Store"
    title="仓库档案"
    :api="{
      get:'getStore',
      del:'delStore',
      update:'updateStore',
      add:'addStore'
    }"
    permission
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
