<template>
  <div class="page">
    <header-btn
      border
      @change="editChange"
      :activeIndex="activeIndex"
      :defaultTab="tabIndex"
      :tabs="['客户来款', '加工商还款', '供货商还款']"
      @tab-change="(tab)=>$emit('update:tabIndex',tab)"
    ></header-btn>
    <div class="billTitle">
      <div class="billTitle-left">
        <auto-form
          ref="autoForm"
          :disabled="disabled"
          style="width: 100%"
          :formItems="formItemsProcessor"
        />
      </div>
      <div class="billTitle-right" style="left: 750px">
        <div class="billTitle-right-table" style="width:540px">
          <edit-table
            hideNum
            hide-sums
            hideContext
            headerBg
            ref="editTable2"
            name="CapitaFlowProcessorTitle"
            :columns.sync="columnsProcessorTitle"
            :disabled="disabled"
          />
        </div>
      </div>
    </div>
    <div style="flex: 1; height: 0">
      <search-table
        api="getCapitaFlowProcessor"
        name="CapitaFlowProcessorTable"
        ref="searchTable"
        :columns.sync="columnsProcessor"
      />
    </div>
  </div>
</template>

<script type="text/javascript">
import { capitaFlow } from '@/common/mixins'
import { columnsProcessor, columnsProcessorTitle } from './columns'
import { formItemsProcessor } from './formItems'
export default {
  mixins: [capitaFlow],
  data () {
    return {
      formItemsProcessor,
      columnsProcessor,
      columnsProcessorTitle,
      disabled: false
    }
  },
  mounted () {
    this.$refs.editTable2.initTableData()
  },
  methods: {
    add () {},
    addsave () {},
    update () {},
    updatesave () {},
    del () {},
    editChange () {
      this.getData().then((res) => {
      })
    },
    rowClickXx () {},
    rowDblclick () {}
  }
}
</script>
<style lang="scss">
</style>
