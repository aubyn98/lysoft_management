<template>
  <!-- eslint-disable -->
  <div
    class="search-table"
    :class="{ searchTable_black: headerBg }"
    @contextmenu.prevent.stop="contextmenu"
    @click="visible = false"
    data-edit
  >
    <el-table
      border
      height="20px"
      style="width: 100%"
      ref="searchTable"
      :data="tableData"
      highlight-current-row
      cell-class-name="cell-class-name-edit"
      header-cell-class-name="header-cell-class-name"
      :row-class-name="tableRowClassName"
      :show-summary="!hideSums"
      :summary-method="getSummaries"
      @current-change="handleCurrentChange"
      @header-dragend="dragend"
      @row-click="rowClick"
      @row-dblclick="rowDblclick"
      @select="select"
      @select-all="selectAll"
      @selection-change="selectionChange"
    >
      <el-table-column
        v-if="!hideNum"
        label="序号"
        prop="prop"
        align="center"
        width="40"
        fixed="left"
      >
        <template slot="header" slot-scope="scope">
          <popover-check
            label="序号"
            :listData="columns"
            prop="label"
            v-model="checkedList"
          />
        </template>
        <template slot-scope="scope">
          <div style="width: 100%; heght: 100%">
            {{ scope.$index + 1 }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        type="selection"
        width="40"
        align="center"
        fixed="left"
        v-if="selection"
      >
      </el-table-column>
      <el-table-column
        :label="column.label"
        align="center"
        v-for="column in autoColumns"
        :key="column.prop"
        :prop="column.prop"
        :width="column.width"
      >
        <el-table-column
          v-if="showSearch"
          :label="column.label"
          align="center"
          :key="column.prop"
          :prop="column.prop"
          :width="column.width"
        >
          <template slot="header" slot-scope="scope">
            <el-input
              v-if="!column.checked"
              v-model.trim="msg[column.prop]"
              size="mini"
              @keyup.native.enter="inputEeter(scope)"
              placeholder="输入关键字回车搜索"
            />
            <el-checkbox
              v-else
              v-model="msg[column.prop]"
              @change="inputEeter(scope)"
            ></el-checkbox>
          </template>
          <template slot-scope="scope">
            <el-input
              size="mini"
              style="width: 100%"
              :readonly="column.readonly"
              :disabled="disabled"
              v-if="!column.elType"
              v-model="scope.row[column.prop]"
              @contextmenu.stop.prevent="contextmenu"
              @input="input($event, scope.row, column.prop)"
            ></el-input>
            <el-checkbox
              :disabled="disabled || column.disabled"
              v-model="scope.row[column.prop]"
              v-else-if="column.elType === 'checkbox'"
              @change="input($event, scope.row, column.prop)"
            ></el-checkbox>
            <el-autocomplete
              :disabled="disabled"
              highlight-first-item
              select-when-unmatched
              placeholder=" "
              v-else-if="column.elType === 'autocomplete'"
              v-model="scope.row[column.prop]"
              :value-key="column.prop"
              :fetch-suggestions="
                (q, cb) => querySearchAsync(q, cb, column, scope.row)
              "
              @select="
                column.relation && autocompleteSelect($event, column, scope.row)
              "
            ></el-autocomplete>
            <el-date-picker
              style="width: 100%"
              :disabled="disabled"
              v-else-if="column.elType === 'date'"
              v-model="scope.row[column.prop]"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </template>
        </el-table-column>
        <template slot-scope="scope" v-if="!showSearch">
          <el-input
            size="mini"
            style="width: 100%"
            :readonly="column.readonly"
            :disabled="disabled"
            v-if="!column.elType"
            v-model="scope.row[column.prop]"
            @contextmenu.stop.prevent="contextmenu"
            @keypress.native.enter="enter"
            @input="input($event, scope.row, column.prop)"
          ></el-input>
          <el-checkbox
            :disabled="disabled || column.disabled"
            v-model="scope.row[column.prop]"
            @change="input($event, scope.row, column.prop)"
            @keypress.native.enter="enter"
            v-else-if="column.elType === 'checkbox'"
          ></el-checkbox>
          <el-autocomplete
            :disabled="disabled"
            highlight-first-item
            select-when-unmatched
            placeholder=" "
            @keypress.native.enter="enter"
            v-else-if="column.elType === 'autocomplete'"
            v-model="scope.row[column.prop]"
            :value-key="column.prop"
            :fetch-suggestions="
              (q, cb) => querySearchAsync(q, cb, column, scope.row)
            "
            @select="
              column.relation && autocompleteSelect($event, column, scope.row)
            "
          ></el-autocomplete>
          <el-date-picker
            @keypress.native.enter="enter"
            style="width: 100%"
            :disabled="disabled"
            v-else-if="column.elType === 'date'"
            v-model="scope.row[column.prop]"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </template>
      </el-table-column>
    </el-table>
    <ol
      class="contextmenu"
      :style="`left: ${position.x}px;top: ${position.y}px;`"
      v-if="visible"
      @click="visible = false"
      @contextmenu.stop.prevent
    >
      <li @click="addRow" v-if="!hideAddMenu">添加</li>
      <li @click="delRow" v-if="!hideDelMenu">删除</li>
      <li
        v-for="m in contextMenus"
        :key="m.prop"
        @click="$emit('context-click', m.prop)"
      >
        {{ m.label }}
      </li>
    </ol>
  </div>
</template>

<script type="text/javascript">
import { dragendTable, customTable } from './mixins'
export default {
  mixins: [dragendTable, customTable],
  props: {
    contextMenus: {
      type: Array,
      default: () => []
    },
    // 是否显示右键菜单-添加按钮
    hideAddMenu: {
      type: Boolean,
      default: false
    },
    // 是否显示右键菜单-删除按钮
    hideDelMenu: {
      type: Boolean,
      default: false
    },
    // 是否显示表头黑色背景
    headerBg: {
      type: Boolean,
      default: false
    },
    // 是否显示表头搜索框
    showSearch: {
      type: Boolean,
      default: false
    },
    // 是否隐藏序号
    hideNum: {
      type: Boolean,
      default: false
    },
    // 是否隐藏右键菜单
    hideContext: {
      type: Boolean,
      default: false
    },
    // 是否禁用表格编辑
    disabled: {
      type: Boolean,
      default: true
    },
    includeKeys: {
      type: Array,
      default: () => ['mx', 'xh', 'nblsdh']
    }
  },
  data () {
    return {
      // add: [],
      // 右键菜单显示
      visible: false,
      // 右键菜单定位
      position: { x: '1', y: '1' },
      valid: null
    }
  },
  watch: {
    tableData: {
      handler (val) {
        /* const computeds = this.columns
          .filter((c) => c.computed)
          .map(({ prop, computed }) => ({ prop, computed }))
        val.forEach((row) => {
          computeds.forEach(c => {
            row[c.prop] = c.computed(row)
          })
        }) */
        this.$nextTick(() => {
          this.$emit('data-change', val)
          this.doLayout()
        })
      },
      deep: true
    }
  },
  mounted () {

  },
  methods: {
    enter (e) {
      this.$refs.searchTable.$el.querySelectorAll('.el-table__body-wrapper  input.el-input__inner').forEach((it, i, arr) => {
        if (e.target === it) {
          const $next = arr[i + 1]
          $next && $next.focus()
        }
      })
    },
    // 单元格关联计算
    input (val, row, prop) {
      const computeds = this.columns
        .filter((c) => c.computed)
        .map(({ prop, computed }) => ({ prop, computed }))
      computeds.forEach((c) => {
        if (typeof c.computed === 'function') {
          row[c.prop] = c.computed(row)
        } else if (c.computed.props.includes(prop)) {
          row[c.prop] = c.computed.handler(row)
        }
      })
    },
    // 单元格select下拉列表
    autocompleteSelect (v, { relation, clearRelation }, row) {
      relation &&
        relation.forEach((key) => {
          row[key] = v[key]
        })
      clearRelation &&
        clearRelation.forEach((key) => {
          row[key] = ''
        })
    },
    // 单元格input下拉列表
    querySearchAsync (q, cb, c, row) {
      this.$api[c.api](
        {
          [c.sendKey || c.prop]: q,
          ...(c.superKeys
            ? c.superKeys.reduce((t, k) => {
              t[k] = row[k] || ''
              return t
            }, {})
            : {})
        },
        true
      ).then(
        (data) => {
          cb(data.res)
        },
        (e) => {}
      )
    },
    submitTable () {
      return this.$format.copy(this.tableData.map(it => {
        const { index, ...res } = it
        return Object.keys(res).reduce((t, k) => {
          if (this.columns.some(c => c.prop === k) || this.includeKeys.includes(k)) {
            t[k] = res[k]
          }
          return t
        }, {})
      }))
    },
    // 初始化表格数据
    initTableData (val = null, flag = true) {
      this.tableData = this.$format.copy(val || [])
      flag && this.addRow()
    },
    setRow (row, index) {
      this.tableData.splice(index, 1, row)
    },
    getRowBlankData () {
      return this.columns.reduce((t, c) => {
        if (c.elType === 'checkbox') {
          t[c.prop] = false
        } else if (c.elType === 'date') {
          t[c.prop] = this.getDate()
        } else if (c.defaultVal) {
          t[c.prop] = typeof c.defaultVal === 'function' ? c.defaultVal() : c.defaultVal
        } else {
          t[c.prop] = ''
        }
        return t
      }, {})
    },
    pushRow (o, type = 'push') {
      type === 'push' && this.tableData.push(...o)
      type === 'unshift' && this.tableData.unshift(...o)
    },
    // 添加行
    addRow () {
      const o = this.getRowBlankData()
      this.tableData.push(o)
      this.setCurrentRow(o)
    },
    // 删除行
    delRow () {
      if (this.currentRow) {
        this.tableData.splice(this.currentRow.index, 1)
      } else {
        this.tableData.pop()
      }
      this.setCurrentRow()
    },
    // 右键菜单
    contextmenu ({ x, y }) {
      if (this.disabled || this.hideContext) return
      this.visible = true
      this.position = { x, y }
    },
    inputEeter (scope) {
      console.log(scope)
    },
    // 获取合计信息  独立-非混入
    getSummaries () {
      return this.autoSums
    },
    debounce () {
      if (this.valid) {
        clearTimeout(this.valid)
      } else {
        this.valid = setTimeout(() => {
          this.$nextTick(() => {
            this.doLayout()
          })
        }, 1000)
      }
    }
  },
  computed: {
    autoSums () {
      const sums = ['合计', '']
      this.autoColumns.forEach((v, index) => {
        if (v.sumProp) {
          sums[index + 1 + (this.selection ? 1 : 0)] = this.tableData.reduce((t, r) => {
            return this.$math.add(t, parseFloat(r[v.sumProp] || 0))
          }, 0)
        }
      })
      this.$nextTick(() => {
        this.doLayout()
      })
      return sums
    }
  }
}
</script>

<style lang="scss">
.search-table[data-edit] {
  width: 100%;
  overflow-y: auto;
  .el-table__body tr.current-row > td {
    background-color: var(--current-row-bg);
  }
}
.searchTable_black {
  .header-cell-class-name {
    background-color: var(--editTable-header-black);
    .cell {
      background-color: var(--editTable-header-black);
      color: white;
    }
  }
}
.search-table {
  .contextmenu {
    position: fixed;
    min-width: 54px;
    z-index: 666;
    padding: 2px;
    background-color: white;
    box-shadow: 0 0 15px #ccc;
    li {
      height: 25px;
      line-height: 25px;
      text-align: center;
      color: #999;
      padding: 2px;
    }
    li:hover {
      background-color: var(--dark-blue);
      color: white;
    }
  }
  .cell-class-name-edit {
    padding: 0 !important;
    height: 30px;
    line-height: 30px;
    .cell {
      height: 30px;
      display: flex !important;
      justify-content: center;
      align-items: center;
      padding: 0 0px !important;
      .el-input {
        display: block !important;
      }
      .el-input__inner {
        border: none;
        border-radius: 0;
        height: 30px;
        line-height: 30px;
        padding: 0 4px !important;
      }
      .el-date-editor .el-input__inner {
        padding: 0 30px !important;
      }
      .el-input__icon {
        line-height: 30px;
      }
    }
  }
}
</style>
