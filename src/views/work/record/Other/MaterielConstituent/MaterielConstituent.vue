<template>
  <record-dialog
    name="MaterielConstituent"
    title="物料成分"
    :api="{
      get:'getMaterielConstituent',
      del:'delMaterielConstituent',
      update:'updateMaterielConstituent',
      add:'addMaterielConstituent'
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
