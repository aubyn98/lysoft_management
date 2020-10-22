<template>
  <header
    class="page-header--btn"
    :style="{ borderBottom: border ? '1px solid var(--border-gray)' : 'none' }"
  >
    <el-button
      :disabled="disabled"
      v-if="!hideEdit"
      :type="editFlag ? 'primary' : 'success'"
      size="mini"
      @click="editFlag ? change('add') : change('save')"
      >{{ editFlag ? "添加" : "保存" }}</el-button
    >
    <el-button
      :disabled="disabled"
      v-if="!hideEdit"
      :type="editFlag ? 'warning' : 'info'"
      size="mini"
      @click="editFlag ? change('update') : change('cancel')"
      >{{ editFlag ? "修改" : "撤销" }}</el-button
    >
    <el-button
      v-if="!hideEdit"
      type="danger"
      size="mini"
      @click="change('del')"
      :disabled="disabled"
      >删除</el-button
    >
    <el-button
      :disabled="edit === 'edit'"
      :type="defaultTab === tab ? 'primary' : 'default'"
      size="mini"
      v-for="tab in tabs"
      :key="tab"
      @click="selectTab(tab)"
      >{{ tab }}</el-button
    >
    <slot></slot>
  </header>
</template>

<script type="text/javascript">
export default {
  name: 'header-btn',
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    hideEdit: {
      type: Boolean,
      default: false
    },
    activeIndex: {
      default: -1,
      type: Number
    },
    border: {
      type: Boolean
    },
    tabs: {
      type: Array,
      default: null
    },
    defaultTab: {
      default: null
    }
  },
  created () {},
  data () {
    return {
      store: 1,
      edit: 'save',
      action: 'add'
    }
  },
  computed: {
    editFlag () {
      return this.edit === 'save'
    }
  },
  methods: {
    selectTab (tab) {
      this.$emit('update:defaultTab', tab)
      this.$emit('tab-change', tab)
    },
    change (action) {
      if (action === 'update' && this.activeIndex < 0) {
        return this.$message.error('请先选择修改项！')
      }
      if (action === 'add' || action === 'update') {
        this.action = action
        this.edit = 'edit'
        this.$emit('change', { action, edit: this.edit })
        return
      }
      if (action === 'save') {
        this.$emit('change', {
          action: this.action + action,
          cb: () => {
            this.edit = 'save'
          }
        })
      } else if (action === 'cancel') {
        this.edit = 'save'
        this.$emit('change', { action: this.action + action, edit: this.edit })
      } else {
        this.edit = 'save'
        this.$emit('change', { action: 'del' })
      }
    }
  }
}
</script>
<style scoped>
.page-header--btn {
  width: 100%;
  min-height: 40px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  flex-shrink: 0;
}
</style>
