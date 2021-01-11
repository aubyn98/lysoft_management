<template>
  <record-dialog-edit
    title="产品库存报警设置"
    name="FashionAlarm"
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
        get: 'getFashionAlarm',
        update: 'updateFashionAlarm'
      },
      columns,
      formItems
    }
  }
}
</script>
