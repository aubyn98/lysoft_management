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
          :formItems="formItemsConverter"
        />
      </div>
      <div class="billTitle-right" style="left: 750px">
        <div class="billTitle-right-table" style="width:537px">
          <edit-table
            hideNum
            hide-sums
            hideContext
            headerBg
            ref="editTable2"
            name="CapitaFlowConverterTitle"
            :columns.sync="columnsConverterTitle"
            :disabled="disabled"
          />
        </div>
      </div>
    </div>
    <div style="flex: 1; height: 0">
      <search-table
        api="getCapitaFlowConverter"
        name="CapitaFlowConverterTable"
        ref="searchTable"
        :columns.sync="columnsConverter"
      />
    </div>
  </div>
</template>

<script type="text/javascript">
import { capitaFlow } from '@/common/mixins'
import { columnsConverter, columnsConverterTitle } from './columns'
import { formItemsConverter } from './formItems'
export default {
  mixins: [capitaFlow],
  data () {
    return {
      formItemsConverter,
      columnsConverter,
      columnsConverterTitle,
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
        console.log(res)
      })
    },
    rowClickXx () {},
    rowDblclick () {}
  }
}
</script>
<style lang="scss">
</style>
