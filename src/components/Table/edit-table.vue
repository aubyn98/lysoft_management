<template>
  <!-- eslint-disable -->
  <div
    class="search-table"
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
        <template slot-scope="scope">
          <el-input
            size="mini"
            style="width: 100%"
            :readonly="column.readonly"
            :disabled="disabled"
            v-if="!column.elType"
            v-model="scope.row[column.prop]"
            @contextmenu.stop.prevent="contextmenu"
          ></el-input>
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
      <li @click="addRow">添加</li>
      <li @click="delRow">删除</li>
    </ol>
  </div>
</template>

<script type="text/javascript">
import { dragendTable, customTable } from '@/common/mixins'
export default {
  mixins: [dragendTable, customTable],
  created () {
    this.initTableData()
  },
  mounted () {
    this.setCurrentRow(this.tableData[0])
  },
  props: {
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
    sourceData: {
      type: Array,
      required: true
    },
    disabled: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      tableData: [],
      visible: false,
      position: { x: '1', y: '1' }
    }
  },
  methods: {
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
      ).then(data => {
        cb(data.res)
      }, e => {})
    },
    sendTableData () {
      return this.$format.copy(this.tableData)
    },
    initTableData () {
      this.tableData = this.$format.copy(this.sourceData)
    },
    addRow () {
      const o = this.columns.reduce((t, c) => {
        t[c.prop] = ''
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
      return sums
    }
  }
}
</script>

<style lang="scss">
.search-table[data-edit] {
  overflow-y: auto;
  .el-table__body tr.current-row > td {
    background-color: var(--current-row-bg);
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
      .el-input__icon{
        line-height: 30px;
      }
    }
  }
}
</style>
