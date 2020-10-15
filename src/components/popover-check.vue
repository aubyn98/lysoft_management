<template>
  <el-popover placement="right" width="400" trigger="click">
    <el-checkbox
      :indeterminate="isIndeterminate"
      v-model="checkAll"
      @change="handleCheckAllChange"
      >全选</el-checkbox
    >
    <el-checkbox-group :value="value" @input="input" @change="handleCheckedListChange">
      <el-checkbox
        v-for="item in listData"
        :label="item[prop]"
        :key="item[prop]"
        >{{ item[prop] }}</el-checkbox
      >
    </el-checkbox-group>
    <span slot="reference">{{ label }}</span>
  </el-popover>
</template>

<script type="text/javascript">
export default {
  props: {
    listData: {
      type: Array,
      required: true
    },
    prop: {
      type: String,
      required: true
    },
    label: {
      required: true
    },
    value: {}
  },
  data () {
    return {
      isIndeterminate: false,
      checkAll: false
    }
  },
  created () {
    this.handleCheckedListChange(this.value)
  },
  methods: {
    input (val) {
      this.$emit('input', val)
    },
    handleCheckAllChange (val) {
      this.$emit('input', val ? this.listData.map((c) => c[this.prop]) : [])
      this.isIndeterminate = false
    },
    handleCheckedListChange (value) {
      const checkedCount = value.length
      this.checkAll = checkedCount === this.listData.length
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.listData.length
    }
  },
  components: {}
}
</script>
