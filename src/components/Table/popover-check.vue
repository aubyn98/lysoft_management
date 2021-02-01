<template>
<el-popover placement="right" width="400" trigger="click">
    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange($event,'')">全选</el-checkbox>
    <el-checkbox-group :value="value" @input="input($event,'')" @change="handleCheckedListChange($event,'')">
        <el-checkbox v-for="item in listData" :label="item[prop]" :key="item[prop]">{{ item[prop] }}</el-checkbox>
    </el-checkbox-group>
    <el-checkbox :indeterminate="isIndeterminateAC" v-model="checkAllAC" @change="handleCheckAllChange($event,'AC')" v-if="attachData && attachData.length">全选</el-checkbox>
    <el-checkbox-group :value="checkedListAC" @input="input($event,'AC')" @change="handleCheckedListChange($event,'AC')" v-if="attachData && attachData.length">
        <el-checkbox v-for="item in attachData" :label="item[prop]" :key="item[prop]">{{ item[prop] }}</el-checkbox>
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
    attachData: {
      type: Array,
      default: null
    },
    checkedListAC: {
      type: Array
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
      isIndeterminateAC: false,
      checkAll: false,
      checkAllAC: false
    }
  },
  watch: {
    value (val) {
      this.handleCheckedListChange(val)
    },
    checkedListAC (val) {
      this.handleCheckedListChange(val, 'AC')
    }
  },
  created () {
    this.handleCheckedListChange(this.value)
  },
  methods: {
    input (val, p) {
      p ? this.$emit('update:checkedListAC', val) : this.$emit('input', val)
    },
    handleCheckAllChange (val, p) {
      if (p) {
        this.$emit('update:checkedListAC', val ? this.attachData.map((c) => c[this.prop]) : [])
        this.isIndeterminateAC = false
      } else {
        this.$emit('input', val ? this.listData.map((c) => c[this.prop]) : [])
        this.isIndeterminate = false
      }
    },
    handleCheckedListChange (value, p) {
      const checkedCount = value.length
      if (p) {
        this.checkAllAC = checkedCount === this.attachData.length
        this.isIndeterminateAC =
        checkedCount > 0 && checkedCount < this.attachData.length
      } else {
        this.checkAll = checkedCount === this.listData.length
        this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.listData.length
      }
    }
  },
  components: {}
}
</script>
