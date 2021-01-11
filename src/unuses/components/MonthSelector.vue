<template>
  <div class="MonthSelector">
    <span>月份选择</span>
    <el-radio-group v-model="radio" @change="change">
      <!-- eslint-disable-next-line vue/no-parsing-error -->
      <el-radio v-for="i in 12" :key="i" :label="i">{{ i < 10 ? "0" + i : i }} 月</el-radio>
    </el-radio-group>
  </div>
</template>

<script type="text/javascript">
export default {
  data () {
    return {
      radio: 0,
      dict: {}
    }
  },
  methods: {
    clear () {
      this.radio = 0
    },
    change (k) {
      if (!this.dict[k]) {
        const year = new Date().getFullYear()
        let ksrq = new Date(year, k - 1, 1)
        let jsrq = new Date(year, k, 0)
        ksrq.setTime(ksrq.getTime() - ksrq.getTimezoneOffset() * 60000)
        jsrq.setTime(jsrq.getTime() - jsrq.getTimezoneOffset() * 60000)
        ksrq = ksrq.toISOString().substring(0, 10)
        jsrq = jsrq.toISOString().substring(0, 10)
        this.$set(this.dict, k, { ksrq, jsrq })
      }
      this.$emit('change', this.dict[k])
    }
  }
}
</script>
<style lang="scss">
.MonthSelector {
  padding: 0 6px;
  > span {
    display: block;
    font-size: 14px;
    margin-bottom: 4px;
  }
  > .el-radio-group {
    display: flex;
    flex-wrap: wrap;
    > .el-radio {
      width: 50%;
      margin: 0;
      text-align: left;
    }
  }
}
</style>
