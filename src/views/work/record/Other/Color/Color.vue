<template>
  <record-dialog
    name="Color"
    title="颜色"
    :api="{
      get:'getColor',
      del:'delColor',
      update:'updateColor',
      add:'addColor'
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
