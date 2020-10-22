<template>
  <div class="tabsMini">
    <div
      class="tabsMini-item"
      v-for="tab in tabs"
      :key="tab"
      :class="{ 'tabsMini-item-blue': tabIndex === tab }"
      @click="change(tab)"
    >
      {{tab}}
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  props: {
    tabIndex: {
      type: String,
      required: true
    },
    tabs: {
      type: Array,
      required: true
    }
  },
  methods: {
    change (tab) {
      this.$emit('change', tab)
      this.$emit('update:tabIndex', tab)
    }
  }
}
</script>
<style lang="scss">
.tabsMini {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  min-height: 20px;
}
.tabsMini-item {
  font-size: 12px;
  min-width: 40px;
  height: 24px;
  padding: 2px;
  text-align: center;
  line-height: 20px;
  border-radius: 3px;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  margin: auto;
}
.tabsMini-item-blue {
  background: #66b1ff;
  border-color: #66b1ff;
  color: #ffffff;
}
.tabsMini-item:hover {
  color: #409eff;
  border-color: #c6e2ff;
  background-color: #ecf5ff;
}
.tabsMini-item-blue:hover {
  background: #66b1ff;
  border-color: #66b1ff;
  color: #ffffff;
}
</style>
