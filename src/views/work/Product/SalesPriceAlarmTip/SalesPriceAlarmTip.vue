<template>
  <record-dialog-edit
    title="销售价报警提示"
    name="SalesPriceAlarmTip"
    class="SalesPriceAlarmTip"
    permission
    :api="api"
    v-if="$attrs.visible"
    v-bind="$attrs"
    v-on="listeners"
    :columns.sync="columns"
    :formItems="formItems"
    :hideAddMenu="false"
  />
</template>

<script type="text/javascript">
import { dialogRecord } from '@/common/mixins'
import { columnsPp as columns } from './columns'
import formItems from './formItems'
export default {
  mixins: [dialogRecord],
  data: function () {
    return {
      api: {
        get: 'getMaterialAlarm',
        update: 'updateMaterialAlarm'
      },
      columns,
      formItems
    }
  }
}
</script>
<style lang="scss">
 .SalesPriceAlarmTip{
   >.el-dialog{
     width: 900px;
   }
 }
</style>
