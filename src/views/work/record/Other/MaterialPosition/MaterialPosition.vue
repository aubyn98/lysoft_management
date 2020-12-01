<template>
  <record-dialog
    name="MaterialPosition"
    title="物料用料部位"
    permission
    :api="{
      get:'getMaterialPosition',
      del:'delMaterialPosition',
      update:'updateMaterialPosition',
      add:'addMaterialPosition'
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
