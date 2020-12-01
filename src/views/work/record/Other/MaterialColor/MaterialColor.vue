<template>
  <record-dialog
    name="MaterialColor"
    title="物料颜色"
    :api="{
      get:'getMaterialColor',
      del:'delMaterialColor',
      update:'updateMaterialColor',
      add:'addMaterialColor'
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
