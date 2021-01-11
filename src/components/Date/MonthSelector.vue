<template>
  <div class="MonthSelect">
    <div class="MonthRangeBox">
      <span>月份选择</span>
      <el-radio-group v-model="radio" @change="change">
        <el-radio v-for="i in 12" :key="i" :label="i">
          <!-- eslint-disable -->
          {{ i < 10 ? "0" + i : i }}月
        </el-radio>
      </el-radio-group>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  data () {
    return {
      monthDict: {},
      radio: 0
    }
  },
  methods: {
    change (k) {
      const year = new Date(Date.now() + 28800000).toISOString().substring(0, 4)
      for (let month = 1; month < 13; month++) {
        if (!this.monthDict[month]) {
          let startDate = new Date(year, month - 1, 1)
          let endDate = new Date(year, month, 0)
          startDate.setTime(
            startDate.getTime() - startDate.getTimezoneOffset() * 60000
          )
          endDate.setTime(
            endDate.getTime() - endDate.getTimezoneOffset() * 60000
          )
          startDate = startDate.toISOString().substring(0, 10)
          endDate = endDate.toISOString().substring(0, 10)
          this.monthDict[month] = { startDate, endDate }
        }
      }
      this.$emit('change', this.monthDict[k], k)
    }
  }
}
</script>
<style lang="scss">
.MonthSelect {
  width: 130px;
  padding:6px 6px 4px 6px;
  > .MonthRangeBox {
    // margin-top: 10px;
    padding-bottom: 2px;
    border-radius: 3px;
    border: 1px solid var(--border-gray);
    > span {
      display: block;
      background-color: var(--bg-light-gray);
      font-size: 14px;
      margin-bottom: 4px;
    }
  }
  > .MonthRangePicker {
    width: 128px;
  }
  > span {
    display: block;
    font-size: 14px;
    margin-bottom: 4px;
  }
  .el-radio-group {
    display: flex;
    flex-wrap: wrap;
    > .el-radio {
      width: 50%;
      margin: 0;
      text-align: center;
      .el-radio__label{
          padding-left: 5px;
      }
      &:nth-of-type(n + 1) {
        margin-top: 5px;
      }
      &:last-of-type {
        margin-bottom: 5px;
      }
    }
  }
}
</style>
