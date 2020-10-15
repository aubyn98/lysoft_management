<template>
  <record-dialog
    name="MaterielColor"
    title="物料颜色"
    :api="{
      get:'getMaterielColor',
      del:'delMaterielColor',
      update:'updateMaterielColor',
      add:'addMaterielColor'
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
