<template>
  <record-dialog-edit
    title="物料报警设置"
    name="MaterialAlarm"
    permission
    :api="api"
    v-if="$attrs.visible"
    v-bind="$attrs"
    v-on="listeners"
    :columns.sync="columns"
    :formItems="formItems"
    hideAddMenu
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
