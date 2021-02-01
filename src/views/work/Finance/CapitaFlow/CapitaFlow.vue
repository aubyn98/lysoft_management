<template>
  <div style="height: 100%; width: 100%">
    <CapitaFlowPage
      :tabIndex.sync="tabIndex"
      v-show="tabIndex === '客户来款'"
      :params="{ lx: '客户' }"
      :tabs="tabs"
      :api="{
        add: 'addCapitaFlowCustomer',
        update: 'updateCapitaFlow',
        del: 'delCapitaFlow',
      }"
      name="Customer"
    />
    <CapitaFlowPage
      :tabIndex.sync="tabIndex"
      v-show="tabIndex === '加工商还款'"
      :params="{ lx: '加工商' }"
      :tabs="tabs"
      :api="{
        add: 'addCapitaFlowProcessor',
        update: 'updateCapitaFlow',
        del: 'delCapitaFlow',
      }"
      name="Processor"
    />
    <CapitaFlowPage
      :tabIndex.sync="tabIndex"
      v-show="tabIndex === '供货商还款'"
      :params="{ lx: '供货商' }"
      :tabs="tabs"
      :api="{
        add: 'addCapitaFlowVendor',
        update: 'updateCapitaFlow',
        del: 'delCapitaFlow',
      }"
      name="Vendor"
    />
  </div>
</template>

<script type="text/javascript">
export default {
  data () {
    return {
      tabIndex: '客户来款',
      tabs: []
    }
  },
  created () {
    this.$permission([{ mc: '资金往来_客户', ll: true }]) &&
      this.tabs.push('客户来款')
    this.$permission([{ mc: '资金往来_加工商', ll: true }]) &&
      this.tabs.push('加工商还款')
    this.$permission([{ mc: '资金往来_供货商', ll: true }]) &&
      this.tabs.push('供货商还款')
  },
  mounted () {},
  methods: {}
}
</script>
<style lang="scss">
</style>
