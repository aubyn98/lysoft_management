<template>
  <record-dialog
    name="MaterialSpec"
    title="物料规格"
    :api="{
      get:'getMaterialSpec',
      del:'delMaterialSpec',
      update:'updateMaterialSpec',
      add:'addMaterialSpec'
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
