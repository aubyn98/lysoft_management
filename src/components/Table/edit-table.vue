<template>
  <!-- eslint-disable -->
  <div
    class="search-table"
    tabIndex="0"
    ref="TableBox"
    :class="{ searchTable_black: headerBg }"
    @contextmenu.prevent.stop="contextmenu"
    @click="visible = false"
    data-edit
  >
    <el-table
      border
      height="20px"
      style="width: 100%"
      ref="Table"
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
            :listData="autoCheckC"
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
        v-for="(column, index) in autoColumns"
        :key="index + column.prop"
        :prop="column.prop"
        :width="column.width"
      >
        <el-table-column
          v-if="showSearch"
          :label="column.label"
          align="center"
          :key="index + column.prop"
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
              @blur="blur($event, scope.row, column.prop)"
            ></el-input>
            <el-checkbox
              :disabled="disabled || column.disabled"
              v-model="scope.row[column.prop]"
              v-else-if="column.elType === 'checkbox'"
              @change="
                (event) => {
                  input(event, scope.row, column.prop);
                  $emit('check-change', scope.row, column.prop);
                }
              "
            ></el-checkbox>
            <el-autocomplete
              :disabled="disabled"
              highlight-first-item
              select-when-unmatched
              placeholder=" "
              v-else-if="column.elType === 'autocomplete'"
              v-model="scope.row[column.prop]"
              :value-key="column.sendKey || column.prop"
              :fetch-suggestions="
                (q, cb) => querySearchAsync(q, cb, column, scope.row)
              "
              @select="
                column.relation && autocompleteSelect($event, column, scope.row)
              "
            ></el-autocomplete>
            <el-select
              style="width: 100%"
              v-model="scope.row[column.prop]"
              filterable
              :clearable="!column.hideClearable"
              :disabled="disabled"
              placeholder="请选择"
              v-else-if="column.elType === 'select'"
              :value-key="column.sendKey || column.prop"
              @keypress.native.enter="enter"
              @focus="
                column.api &&
                  (remoteFn && column.remoteFn
                    ? remoteFn(column, scope.row)
                    : remoteMethod(column, scope.row))
              "
              @change="
                column.relation && autocompleteSelect($event, column, scope.row)
              "
            >
              <el-option
                v-for="item in column.listData"
                :key="column.api ? item[column.prop] : item"
                :label="column.api ? item[column.prop] : item"
                :value="item"
              >
              </el-option>
            </el-select>
            <el-date-picker
              style="width: 100%"
              :disabled="disabled"
              value-format="yyyy-MM-dd"
              v-else-if="column.elType === 'date'"
              v-model="scope.row[column.prop]"
              @change="$emit('date-change', scope.row, column.prop)"
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
            @blur="blur($event, scope.row, column.prop)"
          ></el-input>
          <el-checkbox
            :disabled="disabled || column.disabled"
            v-model="scope.row[column.prop]"
            @change="
              (event) => {
                input(event, scope.row, column.prop);
                $emit('check-change', scope.row, column.prop);
              }
            "
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
            :value-key="column.sendKey || column.prop"
            :fetch-suggestions="
              (q, cb) =>
                autocompleteFn && column.autocompleteFn
                  ? autocompleteFn(q, cb, column, scope.row, querySearchAsync)
                  : querySearchAsync(q, cb, column, scope.row)
            "
            @select="
              column.relation && autocompleteSelect($event, column, scope.row)
            "
          ></el-autocomplete>
          <el-select
            style="width: 100%"
            v-model="scope.row[column.prop]"
            filterable
            :clearable="!column.hideClearable"
            :disabled="disabled"
            placeholder="请选择"
            v-else-if="column.elType === 'select'"
            :value-key="column.sendKey || column.prop"
            @keypress.native.enter="enter"
            @focus="
              column.api &&
                (remoteFn && column.remoteFn
                  ? remoteFn(column, scope.row)
                  : remoteMethod(column, scope.row))
            "
            @change="
              column.relation && autocompleteSelect($event, column, scope.row)
            "
          >
            <el-option
              v-for="item in column.listData"
              :key="column.api ? item[column.prop] : item"
              :label="column.api ? item[column.prop] : item"
              :value="item"
            >
            </el-option>
          </el-select>
          <el-date-picker
            @keypress.native.enter="enter"
            style="width: 100%"
            :disabled="disabled"
            v-else-if="column.elType === 'date'"
            v-model="scope.row[column.prop]"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
            @change="$emit('date-change', scope.row, column.prop)"
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
    remoteFn: {
      type: Function,
      default: null
    },
    autocompleteFn: {
      type: Function,
      default: null
    },
    arrowEvent: {
      type: Boolean,
      default: true
    },
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
    },
    stopKeyEvent: {
      type: Boolean,
      default: false
    },
    params: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      // add: [],
      // 右键菜单显示
      visible: false,
      // 右键菜单定位
      position: { x: '1', y: '1' },
      valid: null,
      computeds: null
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
    },
    autoColumns: {
      handler (val) {
        this.computeds = val
          .filter((c) => c.computed)
          .map(({ prop, computed }) => {
            if (typeof computed === 'string') {
              // eslint-disable-next-line no-new-func
              computed = new Function('r', computed)
            } else if (typeof computed === 'object') {
              computed = {
                props: computed.props,
                // eslint-disable-next-line no-new-func
                handler: new Function('r', computed.handler)
              }
            }
            return { prop, computed }
          })
      },
      immediate: true,
      deep: true
    }
  },
  beforeDestroy () {
    !this.stopKeyEvent &&
      this.$refs.TableBox.removeEventListener('keydown', this.keyEvents)
  },
  mounted () {
    !this.stopKeyEvent &&
      this.$refs.TableBox.addEventListener('keydown', this.keyEvents)
    // window.addEventListener('keydown', this.keyEvents)
  },
  methods: {
    // 设置当前选中行
    setCurrentRow (val = null) {
      typeof val === 'number' && (val = this.tableData[val])
      this.$refs.Table.setCurrentRow(val)
    },
    blur ($event, row, prop) {
      this.$emit('blur', row, prop, this.tableData)
    },
    keyEvents (e) {
      if (this.disabled || !this.arrowEvent) return
      switch (e.code) {
        case 'ArrowDown':
          this.addRow()
          break
        case 'ArrowUp':
          this.tableData.pop()
          break
      }
    },
    enter (e) {
      this.$refs.Table.$el
        .querySelectorAll('.el-table__body-wrapper  input.el-input__inner')
        .forEach((it, i, arr) => {
          if (e.target === it) {
            const $next = arr[i + 1]
            $next && $next.focus()
          }
        })
    },
    // 单元格关联计算
    input (val, row, prop) {
      this.computeds.forEach((c) => {
        if (typeof c.computed === 'function') {
          row[c.prop] = c.computed.call(this, row)
        } else if (
          typeof computed === 'object' &&
          c.computed.props.includes(prop)
        ) {
          row[c.prop] = c.computed.handler.call(this, row)
        }
      })
      this.$emit('input', { row, prop, val })
    },
    // 单元格select下拉列表
    autocompleteSelect (v, { relation, clearRelation, prop }, row) {
      relation &&
        relation.forEach((key) => {
          if (key.indexOf('->') === -1) return (row[key] = v[key])
          const [oKey, nKey] = key.split('->')
          row[nKey] = v[oKey]
        })
      clearRelation &&
        clearRelation.forEach((key) => {
          row[key] = ''
        })
      this.$emit(
        'autocomplete-select',
        v,
        { prop, relation, clearRelation },
        row
      )
    },
    // 单元格input下拉列表
    querySearchAsync (q, cb, c, row) {
      this.$api[c.api](
        {
          ...this.params,
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
    remoteMethod (item, row) {
      this.$api[item.api](
        {
          [item.sendKey || item.prop]: row[item.prop],
          ...(item.superKeys
            ? item.superKeys.reduce((t, k) => {
              t[k] = row[k] || ''
              return t
            }, {})
            : {})
        },
        true
      ).then((data) => {
        item.listData = data.res
      })
    },
    submitTable (cType = 'autoColumns') {
      return this.$format.copy(
        this.tableData.map((it) => {
          const { index, ...res } = it
          return Object.keys(res).reduce((t, k) => {
            if (
              this[cType].some((c) => c.prop === k) ||
              this.includeKeys.includes(k)
            ) {
              t[k] = res[k]
            }
            return t
          }, {})
        })
      )
    },
    // 初始化表格数据
    initTableData (val = null, flag = true, copy = true) {
      this.tableData = copy ? this.$format.copy(val || []) : val
      flag && this.addRow()
    },
    setRow (row, index) {
      this.tableData.splice(index, 1, row)
    },
    getRowBlankData (cType = 'autoColumns') {
      return this[cType].reduce((t, c) => {
        if (c.elType === 'checkbox') {
          t[c.prop] = false
        } else if (c.elType === 'date') {
          t[c.prop] = this.getDate()
        } else if (c.defaultVal) {
          t[c.prop] =
            typeof c.defaultVal === 'function' ? c.defaultVal() : c.defaultVal
        } else {
          t[c.prop] = ''
        }
        return t
      }, {})
    },
    copyRow () {
      const len = this.tableData.length
      len >= 1
        ? this.tableData.push({ ...this.tableData[len - 1] })
        : this.addRow()
    },
    pushRow (o, type = 'push', index) {
      type === 'push' && this.tableData.push(...o)
      type === 'unshift' && this.tableData.unshift(...o)
      type === 'splice' && this.tableData.splice(index, 0, ...o)
    },
    // 添加行
    addRow () {
      const o = this.getRowBlankData()
      this.tableData.push(o)
    },
    // 删除行
    delRow () {
      if (this.selectData.length && this.selection) {
        const list = this.selectData
          .sort((a, b) => a.index - b.index)
          .map((s) => s.index)
        this.$arr.reverseForEach(this.tableData, (c, i) => {
          list.indexOf(i) !== -1 && this.tableData.splice(i, 1)
        })
        this.selectData = []
      } else {
        if (this.currentRow) {
          this.tableData.splice(this.currentRow.index, 1)
        } else if (this.tableData.length) {
          this.tableData.pop()
        }
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
      this.$emit('send-change', scope)
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
          sums[index + (this.selection ? 2 : 1)] = this.tableData.reduce(
            (t, r) => {
              return this.$math.add(t, parseFloat(r[v.sumProp] || 0))
            },
            0
          )
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
$bg-header-color-black: rgb(68, 68, 68);
$bg-current-row-color: #c5e2fd;
$bg-color-white: white;
$bg-color-blue: #409eff;
$text-color-white: white;
$text-color-gray: #999;
$shadow-color-gray: #ccc;
.search-table[data-edit] {
  padding: 1px;
  outline-color: #bedeff;
  outline-width: 1px;
  box-sizing: border-box;
  overflow-y: auto;
  .el-table__body tr.current-row > td {
    background-color: $bg-current-row-color;
  }
}
.searchTable_black {
  .header-cell-class-name {
    background-color: $bg-header-color-black;
    .cell {
      background-color: $bg-header-color-black;
      color: $text-color-white !important;
    }
  }
}
.search-table {
  .contextmenu {
    position: fixed;
    min-width: 54px;
    z-index: 666;
    padding: 2px;
    background-color: $bg-color-white;
    box-shadow: 0 0 15px $shadow-color-gray;
    li {
      height: 25px;
      line-height: 25px;
      text-align: center;
      color: $text-color-gray;
      padding: 2px;
    }
    li:hover {
      background-color: $bg-color-blue;
      color: $text-color-white;
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
