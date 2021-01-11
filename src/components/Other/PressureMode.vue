<template>
  <div class="PressureMode">
    <div class="PressureModeBox">
      <span>暂压金额模式</span>
      <el-radio-group :value="value" @input="input">
        <el-radio label="默认">默认</el-radio>
        <el-radio label="个">截取个位</el-radio>
        <el-radio label="十">截取十位</el-radio>
        <el-radio label="五十">截取五十</el-radio>
      </el-radio-group>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  props: ['value'],
  methods: {
    clear () {
      this.radio = '默认'
    },
    input (k) {
      this.$emit('input', k)
    }
  }
}
</script>
<style lang="scss">
.PressureMode {
  width: 130px;
  padding: 6px 6px 4px 6px;
  > .PressureModeBox {
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
