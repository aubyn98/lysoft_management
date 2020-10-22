<template>
  <record-dialog-edit
    title="物料报警设置"
    name="MaterielAlarm"
    :api="api"
    v-if="$attrs.visible"
    v-bind="$attrs"
    v-on="listeners"
    :columns="columns"
    :formItems="formItems"
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
        get: 'getMaterielAlarm',
        update: 'updateMaterielAlarm'
      },
      columns,
      formItems
    }
  }
}
</script>
