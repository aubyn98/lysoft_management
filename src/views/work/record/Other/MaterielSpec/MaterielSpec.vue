<template>
  <record-dialog
    name="MaterielSpec"
    title="物料规格"
    :api="{
      get:'getMaterielSpec',
      del:'delMaterielSpec',
      update:'updateMaterielSpec',
      add:'addMaterielSpec'
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
