<template>
  <record-dialog
    name="MaterialType"
    title="物料类型"
    permission
    :api="{
      get:'getMaterialType',
      del:'delMaterialType',
      update:'updateMaterialType',
      add:'addMaterialType'
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
