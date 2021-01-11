<template>
  <div class="SettlementMode">
    <div class="SettlementModeBox">
      <span>结算模式</span>
      <el-radio-group :value="value" @input="input">
        <el-radio :label="28">28</el-radio>
        <el-radio :label="29">29</el-radio>
        <el-radio :label="30">30</el-radio>
        <el-radio :label="31" :key="31">31</el-radio>
        <el-radio :label="'五十'">当前月份</el-radio>
      </el-radio-group>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  props: ['value'],
  methods: {
    clear () {
      this.radio = 28
    },
    input (k) {
      this.$emit('input', k)
    }
  }
}
</script>
<style lang="scss">
.SettlementMode {
  width: 130px;
  padding: 6px 6px 4px 6px;
  > .SettlementModeBox {
    padding-bottom: 2px;
    border-radius: 3px;
    border: 1px solid var(--border-gray);
    > span {
      display: block;
      background-color: var(--bg-light-gray);
      font-size: 14px;
      margin-bottom: 4px;
    }
    > .el-radio-group {
      display: flex;
      flex-wrap: wrap;
      > .el-radio {
        width: 100%;
        margin: 0;
        margin-left: 10px;
        text-align: left;
      }
    }
  }
}
</style>
