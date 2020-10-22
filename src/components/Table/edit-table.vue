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
      :show-summary="!hideSum"
      :summary-method="getSummaries"
      @current-change="handleCurrentChange"
      @header-dragend="dragend"
      @row-click="rowClick"
      @row-dblclick="rowDblclick"
      @select="select"
      @select-all="selectAll"
    >
      <el-table-column
        type="selection"
        width="40"
        align="center"
        fixed="left"
        v-if="selection"
      >
      </el-table-column>
      <el-table-column
        v-if="!hideNum"
        label="序号"
        prop="prop"
        align="center"
        width="40"
        :fixed="!selection && 'left'"
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
              @input="input($event,scope.row,column.prop)"
            ></el-input>
            <el-checkbox
              :disabled="disabled"
              v-model="scope.row[column.prop]"
              v-else-if="column.elType === 'checkbox'"
            ></el-checkbox>
            <el-autocomplete
              :disabled="disabled"
              highlight-first-item
              select-when-unmatched
              placeholder="请输入内容"
              v-else-if="column.elType === 'autocomplete'"
              v-model="scope.row[column.prop]"
              :value-key="column.prop"
              :fetch-suggestions="
                (q, cb) => querySearchAsync(q, cb, column, scope.row)
              "
              @select="
                column.relation &&
                  autocompleteSelect($event, column.relation, scope.row)
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
            @input="input($event,scope.row,column.prop)"
          ></el-input>
          <el-checkbox
            :disabled="disabled"
            v-model="scope.row[column.prop]"
            v-else-if="column.elType === 'checkbox'"
          ></el-checkbox>
          <el-autocomplete
            :disabled="disabled"
            highlight-first-item
            select-when-unmatched
            placeholder="请输入内容"
            v-else-if="column.elType === 'autocomplete'"
            v-model="scope.row[column.prop]"
            :value-key="column.prop"
            :fetch-suggestions="
              (q, cb) => querySearchAsync(q, cb, column, scope.row)
            "
            @select="
              column.relation &&
                autocompleteSelect($event, column.relation, scope.row)
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
    </ol>
  </div>
</template>

<script type="text/javascript">
import { dragendTable, customTable } from './mixins'
export default {
  mixins: [dragendTable, customTable],
  props: {
    hideAddMenu: {
      type: Boolean,
      default: false
    },
    hideDelMenu: {
      type: Boolean,
      default: false
    },
    headerBg: {
      type: Boolean,
      default: false
    },
    showSearch: {
      type: Boolean,
      default: false
    },
    hideNum: {
      type: Boolean,
      default: false
    },
    hideSum: {
      type: Boolean,
      default: false
    },
    hideContext: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      tableData: [],
      add: [],
      visible: false,
      sums: [],
      position: { x: '1', y: '1' }
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
        this.doLayout()
      },
      deep: true
    }
  },
  methods: {
    input (val, row, prop) {
      const computeds = this.columns
        .filter((c) => c.computed)
        .map(({ prop, computed }) => ({ prop, computed }))
      computeds.forEach(c => {
        if (typeof c.computed === 'function') {
          row[c.prop] = c.computed(row)
        } else if (c.computed.props.includes(prop)) {
          row[c.prop] = c.computed.handler(row)
        }
      })
    },
    autocompleteSelect (v, relation, row) {
      relation.forEach((key) => {
        row[key] = v[key]
      })
    },
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
      return this.$format.copy(this.tableData)
    },
    initTableData (val = null) {
      this.tableData = this.$format.copy(val || [])
      this.addRow()
    },
    addRow () {
      const o = this.columns.reduce((t, c) => {
        if (c.elType === 'checkbox') {
          t[c.prop] = false
        } else {
          t[c.prop] = ''
        }
        return t
      }, {})
      this.tableData.push(o)
      this.setCurrentRow(o)
    },
    delRow () {
      if (this.currentRow) {
        this.tableData.splice(this.currentRow.index, 1)
      } else {
        this.tableData.pop()
      }
      this.setCurrentRow()
    },
    contextmenu ({ x, y }) {
      if (this.disabled || this.hideContext) return
      this.visible = true
      this.position = { x, y }
    },
    inputEeter (scope) {
      console.log(scope)
    },
    getSummaries () {
      return this.autoSums
    }
  },
  computed: {
    autoSums () {
      const sums = ['合计']
      this.autoColumns.forEach((v, index) => {
        if (v.sumProp) {
          sums[index + 1] = this.tableData.reduce((t, r) => {
            return this.$math.add(t, parseFloat(r[v.sumProp] || 0))
          }, 0)
        }
      })
      this.doLayout()
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
    width: 54px;
    z-index: 666;
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
      }
      .el-input__icon {
        line-height: 30px;
      }
    }
  }
}
</style>
