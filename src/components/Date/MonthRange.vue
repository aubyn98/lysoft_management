<template>
  <div class="MonthRange">
    <span>年份</span>
    <el-date-picker
      v-model="year"
      type="year"
      size="mini"
      value-format="yyyy"
      class="MonthRangePicker"
      placeholder="选择年"
      @change="yearChange"
    >
    </el-date-picker>
    <div class="MonthRangeBox">
      <span>月份范围</span>
      <el-radio-group v-model="radio" @change="change">
        <el-radio v-for="i in 12" :key="i" :label="i">
          <!-- eslint-disable -->
          {{ i < 10 ? "0" + i : i }}月-{{
            i + 1 < 13 ? (i + 1 < 10 ? "0" + (i + 1) : i + 1) : "0" + 1
          }}月
        </el-radio>
        <el-radio :label="13"> 01月-12月</el-radio>
      </el-radio-group>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  props: {
    defaultMonth: {
      type: [String, Number]
    }
  },
  data () {
    return {
      radio: -1,
      dict: {},
      year: new Date(Date.now() + 28800000).toISOString().substring(0, 10)
    }
  },
  mounted () {
    this.defaultMonth && (this.radio = this.defaultMonth) && this.change()
  },
  methods: {
    clear () {
      this.radio = -1
    },
    yearChange () {
      this.change(this.radio)
    },
    change (k = this.radio) {
      const year = this.year.substring(0, 4)
      const key = year + '$' + k
      if (!this.dict[key]) {
        let collection = null
        let startDate = null
        let endDate = null
        const e = k + 1
        if (k < 13) {
          startDate = new Date(new Date(year, k - 1, 1).getTime() + 28800000)
            .toISOString()
            .substring(0, 10)
          endDate = new Date(new Date(year, k, 0).getTime() + 28800000)
            .toISOString()
            .substring(0, 10)
          const startDate2 = new Date(new Date(year, k, 1).getTime() + 28800000)
            .toISOString()
            .substring(0, 10)
          const endDate2 = new Date(new Date(year, e, 0).getTime() + 28800000)
            .toISOString()
            .substring(0, 10)
          collection = {
            s: k,
            e: e === 13 ? 1 : e,
            startDate,
            endDate,
            startDate2,
            endDate2
          }
        } else {
          startDate = new Date(new Date(year, 0, 1).getTime() + 28800000)
            .toISOString()
            .substring(0, 10)
          endDate = new Date(new Date(year, 12, 0).getTime() + 28800000)
            .toISOString()
            .substring(0, 10)
          collection = { s: 1, e: 12, startDate, endDate }
        }
        this.dict[key] = collection
      }
      this.$emit('change', this.dict[key])
    }
  }
}
</script>
<style lang="scss">
.MonthRange {
  width: 130px;
  padding: 0 6px;
  > .MonthRangeBox {
    margin-top: 10px;
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
      width: 95%;
      margin: 0;
      text-align: center;
      &:nth-of-type(n + 2) {
        margin-top: 5px;
      }
      &:last-of-type {
        margin-bottom: 5px;
      }
    }
  }
}
</style>
