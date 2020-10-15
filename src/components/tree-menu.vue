<template>
  <div>
    <el-submenu :index="menu.index" v-if="menu.children">
      <template slot="title">
        <i :class="menu.icon"></i>
        <span slot="title">{{ menu.label }}</span>
      </template>
      <template v-for="item in menu.children">
        <el-menu-item
          v-if="!item.children"
          :index="item.index"
          :key="item.index"
          >{{ item.label }}</el-menu-item
        >
        <tree-menu v-else :menu="item" :key="item.index" />
      </template>
    </el-submenu>
    <el-menu-item v-else :index="menu.index" :key="menu.index">{{
      menu.label
    }}</el-menu-item>
  </div>
</template>
<script>
export default {
  name: 'treeMenu',
  props: {
    menu: {
      type: Object,
      required: true
    }
  }
}
</script>
