<template>
  <div>
    <el-submenu :index="menu.index" v-if="menu.children">
      <template slot="title">
        <i :class="menu.icon"></i>
        <span slot="title">{{ menu.label }}</span>
      </template>
      <!-- eslint-disable-next-line -->
      <template v-for="item in menu.children">
        <el-menu-item
          v-if="!item.children && $permission([{ mc: item.label, ll: true }])"
          :index="item.index"
          :key="item.index"
          >{{ item.label }}</el-menu-item
        >
        <tree-menu v-else-if="item.children" :menu="item" :key="item.index" />
      </template>
    </el-submenu>
    <el-menu-item v-else :index="menu.index" :key="menu.index">
      <i :class="menu.icon || ''"></i>
      <span v-if="!isCollapse">{{ menu.label }}</span>
    </el-menu-item>
  </div>
</template>
<script>
export default {
  name: 'treeMenu',
  props: {
    menu: {
      type: Object,
      required: true
    },
    isCollapse: {
      type: Boolean,
      default: false
    }
  },
  created () {
  }
}
</script>
