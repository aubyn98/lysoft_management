<template>
  <el-container class="home-container">
    <el-aside style="width: auto" class="home-aside">
      <a class="logoBox" href="http://www.lyerp.net" target="_blank">
        <p v-show="!isCollapse">领域软件</p>
        <img src="../assets/logo_mini.png" alt="" />
      </a>
      <div class="home-collapse-btn" @click="isCollapse = !isCollapse">
        <i v-show="!isCollapse" class="el-icon-s-fold"></i>
        <p
          v-show="!isCollapse"
          :style="{
            marginLeft: isCollapse ? '0' : '20px',
          }"
        >
          收起
        </p>
        <p v-show="isCollapse">展开</p>
        <i v-show="isCollapse" class="el-icon-s-unfold"></i>
      </div>
      <div class="home-menuBox">
        <el-menu
          :default-active="editableTabsValue"
          class="el-menu-vertical-demo"
          @select="handleSelect"
          :collapse="isCollapse"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          style="max-width: 150px"
          mode="horizontal"
        >
          <!-- mode="horizontal" -->
          <tree-menu
            :key="menu.index"
            v-for="menu in menus"
            :menu="menu"
          ></tree-menu>
        </el-menu>
      </div>
    </el-aside>
    <el-container class="home-content">
      <el-header class="home-header"
        ><el-dropdown trigger="click" style="cursor: pointer">
          <span class="el-dropdown-link">
            {{ "名字预留位" }}
            <i class="el-icon-setting el-icon-setting"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="cipherShowHandle"
              >更改密码</el-dropdown-item
            >
            <el-dropdown-item @click.native="ipShowHandle"
              >设置打印IP</el-dropdown-item
            >
            <el-dropdown-item
              v-if="$store.state.mobile"
              @click.native="setBluetoothPrinter"
              >设置蓝牙打印机</el-dropdown-item
            >
            <el-dropdown-item @click.native="tcdl">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown></el-header
      >
      <el-main class="home-main">
        <el-tabs
          v-model="editableTabsValue"
          type="card"
          @tab-remove="removeTab"
          data-home
        >
          <el-tab-pane
            v-for="item in editableTabs"
            :closable="item.closable"
            :key="item.name"
            :label="item.label"
            :name="item.name"
          >
            <component
              :is="item.name"
              @editable="handleSelect"
              :ref="item.name"
            ></component>
          </el-tab-pane>
        </el-tabs>
      </el-main>
      <!-- <el-footer>Footer</el-footer> -->
    </el-container>
    <component
      v-for="d in dialogs"
      :key="d.index"
      :is="d.index"
      :visible.sync="visibles[d.index]"
      :ref="d.index"
      @close="dialogClose(d.index)"
    ></component>
  </el-container>
</template>

<script>
import { tabs as tabData, menus } from './tabData'
const dialogs = Object.keys(tabData).reduce((t, k) => {
  if (tabData[k].dialog) {
    t.push({ ...tabData[k], index: k })
  }
  return t
}, [])
const visibles = dialogs.reduce((t, it) => {
  t[it.index] = false
  return t
}, {})
export default {
  data () {
    return {
      dialogColorVisible: true,
      show: false,
      activeArr: [],
      isCollapse: true,
      editableTabs: [],
      editableTabsValue: '',
      dialogs,
      visibles,
      menus
    }
  },
  created () {
    this.initMenu(tabData.MonthlyStatusTable, 'MonthlyStatusTable')
  },
  watch: {
    activeArr: {
      handler (newValue, oldValue) {
        if (newValue.length === 0) {
          this.editableTabsValue = ''
        }
      },
      deep: true
    }
  },
  methods: {
    dialogClose (index) {
      this.removeTab(index)
    },
    initMenu (tab, name) {
      this.activeArr.push(name)
      this.addTab(tab, name)
    },
    addTab (tab, name) {
      this.editableTabs.push({
        ...tab,
        name
      })
      this.editableTabsValue = name
    },
    removeTab (targetName) {
      this.activeArr.splice(this.activeArr.indexOf(targetName), 1)
      const tabs = this.editableTabs
      let activeName = this.editableTabsValue
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            const nextTab = tabs[index + 1] || tabs[index - 1]
            if (nextTab) {
              activeName = nextTab.name
            } else {
              activeName = '1'
            }
          }
        })
      }
      this.editableTabsValue = activeName
      this.editableTabs = tabs.filter((tab) => tab.name !== targetName)
    },
    handleSelect (index, options) {
      if (
        !this.activeArr.includes(index) &&
        tabData[index]
      ) {
        this.activeArr.push(index)
        this.addTab(tabData[index], index)
      }
      if (tabData[index].dialog) {
        this.visibles[index] = true
      }
      this.editableTabsValue = index
    }
  }
}
</script>
