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
$bg-color-blue:#66b1ff;
$bg-color-light-blue:#ecf5ff;
$border-color-blue:#66b1ff;
$border-color-light-blue:#c6e2ff;
$text-color-white:white;
$text-color-blue:#409eff;
.tabsMini {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  min-height: 20px;
  flex-shrink: 0;
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
  background: $bg-color-blue;
  border-color:$border-color-blue;
  color:$text-color-white;
}
.tabsMini-item:hover {
  color: $text-color-blue;
  border-color: $border-color-light-blue;
  background-color: $bg-color-light-blue;
}
.tabsMini-item-blue:hover {
  background: $bg-color-blue;
  border-color:$border-color-blue;
  color:$text-color-white;
}
</style>
