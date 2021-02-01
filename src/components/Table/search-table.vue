<template>
<!-- eslint-disable -->
<div class="search-table">
    <el-table
        border
        height="20px"
        style="width: 100%"
        ref="Table"
        :data="autoTableData"
        v-loading="loading"
        highlight-current-row
        :default-expand-all="expand"
        cell-class-name="cell-class-name"
        header-cell-class-name="header-cell-class-name"
        :row-class-name="tableRowClassName"
        :show-summary="autoSums.length > 1 && !this.hideSums"
        :summary-method="getSummaries"
        :tree-props="{ children: 'children' }"
        :row-key="rowKey"
        :span-method="spanMethod ? objectSpanMethod : () => {}"
        @current-change="handleCurrentChange"
        @header-dragend="dragend"
        @row-click="rowClick"
        @row-dblclick="(r, c, e) => rowDblclick(r, c, e, 'row')"
        @select="select"
        @select-all="selectAll"
        @selection-change="selectionChange"
        @cell-dblclick="cellDblclick">
        <el-table-column type="selection" width="40" align="center" fixed="left" v-if="selection"></el-table-column>
        <el-table-column
            label="序号"
            prop="prop"
            align="center"
            width="40"
            :fixed="!selection && 'left'"
            v-if="!hideNum">
            <template slot="header" slot-scope="scope">
                <popover-check
                    label="序号"
                    :listData="autoCheckC"
                    :attachData="attachCheckC"
                    :checkedListAC.sync="checkedListAC"
                    prop="label"
                    v-model="checkedList" />
            </template>
            <template slot-scope="scope">
                <span>{{ scope.$index + 1 }}</span>
            </template>
        </el-table-column>
        <el-table-column
            :label="column.label"
            :align="column.align || 'left'"
            v-for="(column, index) in autoColumns"
            :key="index + column.prop"
            :prop="column.prop"
            :width="column.width">
            <template slot="header" slot-scope="scope">
                <div @click.exact="sort_click(column.prop)" @click.ctrl="sort_click_ctrl(column.prop)" @click.shift="sort_click_shift(column.prop)">
                    <span>{{ column.label }}</span>
                    <span style="color: #409eff">
                        {{
              !sort[column.prop] ? "" : sort[column.prop] === "desc" ? "▼" : "▲"
              }}
                    </span>
                </div>
            </template>
            <template v-if="column.children">
                <el-table-column
                    :label="c.label"
                    :align="c.align || 'left'"
                    v-for="(c, index) in column.children"
                    :key="index + c.prop"
                    :prop="c.prop"
                    :width="c.width">
                    <template slot-scope="scope">
                        <el-checkbox :disabled="c.disabled" v-if="c.elType === 'checkbox'" v-model="scope.row[c.prop]" @change="$emit('check-change', scope.row, c.prop)"></el-checkbox>
                        <span v-else>
                            {{
                scope.row[c.prop]
                }}
                        </span>
                    </template>
                </el-table-column>
            </template>
            <template v-else-if="!hideSearch && !column.children">
                <el-table-column :prop="column.prop" :key="index + column.prop" :width="column.width" :align="column.align || 'left'">
                    <!-- eslint-disable-next-line -->
                    <template slot="header" slot-scope="scope">
                        <el-input v-if="!column.elType" v-model.trim="msg[column.prop]" size="mini" @keyup.native.enter="inputEeter(scope)" placeholder="输入关键字回车搜索" />
                        <el-date-picker value-format="yyyy-MM-dd" v-else-if="column.elType === 'date'" v-model="msg[column.prop]" type="date" placeholder="选择日期"></el-date-picker>
                        <el-checkbox v-else-if="column.elType === 'checkbox'" v-model="msg[column.prop]" @change="inputEeter(scope)"></el-checkbox>
                    </template>
                    <template slot-scope="scope">
                        <el-checkbox :disabled="column.disabled" v-if="column.elType === 'checkbox'" v-model="scope.row[column.prop]" @change="$emit('check-change', scope.row, column.prop)"></el-checkbox>
                        <el-date-picker
                            @keypress.native.enter="enter"
                            style="width: 100%"
                            :disabled="column.disabled"
                            v-else-if="column.elType === 'date'"
                            v-model="scope.row[column.prop]"
                            type="date"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期"
                            @change="$emit('date-change', scope.row, column.prop)"></el-date-picker>
                        <span v-else>
                            {{
                scope.row[column.prop]
                }}
                        </span>
                    </template>
                </el-table-column>
            </template>
            <template slot-scope="scope" v-if="hideSearch && !column.children">
                <el-checkbox :disabled="column.disabled" v-if="column.elType === 'checkbox'" v-model="scope.row[column.prop]" @change="$emit('check-change', scope.row, column.prop)"></el-checkbox>
                <span v-else>
                    {{
            scope.row[column.prop]
            }}
                </span>
            </template>
        </el-table-column>
        <slot name="column"></slot>
    </el-table>
    <div class="search-table-pagination" data-small v-if="small && !hidePagination && autoCount > pageSize">
        <el-pagination
            :disabled="loading"
            layout="prev, next,jumper"
            :total="autoCount"
            :page-size="pageSize"
            :current-page="msg.page"
            @current-change="currentChange"
            small></el-pagination>
        <div class="totalPage">{{ Math.ceil(autoCount / pageSize) }}页</div>
    </div>
    <div class="search-table-pagination" v-else-if="!small && !hidePagination && autoCount > pageSize">
        <el-pagination
            :disabled="loading"
            background
            layout="prev, pager, next,jumper"
            :total="autoCount"
            :page-size="pageSize"
            :current-page="msg.page"
            @current-change="currentChange"
            small></el-pagination>
    </div>
</div>
</template>

<script type="text/javascript">
import { dragendTable, customTable } from './mixins'
export default {
  mixins: [dragendTable, customTable],
  created () {
    this.request(true)
  },
  props: {
    // 设置表格-行样式
    rowClassName: {
      type: Function,
      default: null
    },
    rowKey: {
      type: [String, Number]
    },
    // 需要合并单元格的列
    mergeColumns: {
      type: Array,
      default: () => []
    },
    // 是否开启单元格合并
    spanMethod: {
      type: [Boolean, Function],
      default: false
    },
    // 是否展开单元格
    expand: {
      type: Boolean,
      default: false
    },
    hideNum: {
      type: Boolean,
      default: false
    },
    // 隐藏表头加载效果
    hideLoading: {
      type: Boolean,
      default: false
    },
    // 隐藏表头搜索条件
    hideSearch: {
      type: Boolean,
      default: false
    },
    // 没有api时 传入的表格行数
    sourceCount: {},
    // 没有api时 传入的表格数据
    sourceData: {
      type: Array,
      default: null
    },
    sourcePageSize: {
      type: Number
    },
    // 请求api时附带的额外参数
    params: {
      type: Object,
      default: () => ({})
    },
    // 分页器-小
    small: {
      type: Boolean,
      default: false
    },
    // 隐藏分页器
    hidePagination: {
      type: Boolean,
      default: false
    },
    // 表格获取数据的api
    api: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      // 数据总行数
      count: 0,
      // 是否显示表格加载效果
      loading: false,
      // 表格排序信息
      sort: {},
      sumsData: {},
      init: false
    }
  },
  computed: {
    autoCount () {
      return this.api ? parseFloat(this.count) : parseFloat(this.sourceCount)
    },
    autoTableData () {
      // this.doLayout()
      return this.api || this.init ? this.tableData : this.sourceData
    },
    pageSize () {
      return (
        this.sourcePageSize ||
        (this.$store.state.company
          ? parseFloat(this.$store.state.company.mysj)
          : 60)
      )
    }
  },
  methods: {
    // 设置当前选中行
    setCurrentRow (val = null, cb) {
      typeof val === 'number' && (val = this.autoTableData[val])
      this.$refs.Table.setCurrentRow(val)
      cb && cb(val)
    },
    initTableData (val = null, flag = true, copy = true) {
      this.init = true
      this.tableData = copy ? this.$format.copy(val || []) : val
      const hasOwnProperty = Object.prototype.hasOwnProperty
      const sums = this.autoColumns.reduce((t, c) => {
        if (hasOwnProperty.call(c, 'sumProp')) {
          t[c.prop] = 0
        }
        return t
      }, {})
      this.tableData.forEach((r) => {
        Object.keys(sums).forEach((k) => {
          sums[k] = this.$math.add(sums[k], r[k])
        })
      })
      this.setSums(sums)
    },
    // 表格条件发生变化时触发
    sendChange (flag) {
      this.request(flag)
      this.$emit('send-change', { ...this.msg, ...this.getSort() })
    },
    // 排序
    sort_click (prop) {
      Object.keys(this.sort).forEach((k) => {
        if (k !== prop) {
          this.sort[k] = ''
        }
      })
      this.sort[prop] = !this.sort[prop]
        ? 'asc'
        : this.sort[prop] === 'asc'
          ? 'desc'
          : 'asc'
      this.sendChange()
    },
    sort_click_shift (prop) {
      this.sort[prop] = !this.sort[prop]
        ? 'asc'
        : this.sort[prop] === 'asc'
          ? 'desc'
          : 'asc'
      this.sendChange()
    },
    sort_click_ctrl (prop) {
      this.sort[prop] = ''
      this.sendChange()
    },
    // 合并单元格
    objectSpanMethod (o) {
      return typeof this.spanMethod === 'function'
        ? this.spanMethod(o)
        : (function ({ row, column, rowIndex, columnIndex }) {
          if (this.mergeColumns.includes(column.property) && row.count) {
            return {
              rowspan: row.count,
              colspan: 1
            }
          } else if (
            this.mergeColumns.includes(column.property) &&
              !row.count
          ) {
            return {
              rowspan: 0,
              colspan: 0
            }
          }
        }.call(this, o))
    },
    /* objectSpanMethod ({ row, column, rowIndex, columnIndex }) {
      return {
        rowspan: (row.count && row.count[column.property]) || 1,
        colspan: (row.count && row.count[column.property]) ? 1 : this.mergeColumns.includes(column.property) ? 0 : 1
      }
    }, */
    // 设置表尾合计信息
    setSums (data) {
      const sums = ['合计']
      let step = this.selection ? 2 : 1
      this.autoColumns.forEach((v) => {
        if (v.sumProp) {
          sums[step] = parseFloat(data[v.sumProp]) || 0
        } else if (v.children) {
          return v.children.forEach((c) => {
            sums[step] = parseFloat(data[c.sumProp]) || 0
            step++
          })
        }
        step++
      })
      this.sumsData = data
      this.sums = sums
    },
    toggleRowSelection (row, selected) {
      this.$refs.Table.toggleRowSelection(row, selected)
    },
    // 添加行
    addRow (row) {
      this.tableData.unshift(row)
    },
    // 更新行
    updateRow (i, row) {
      this.tableData.splice(i, 1, row)
    },
    // 删除行
    delRow (i) {
      this.tableData.splice(i, 1)
    },
    // 获取表格数据
    getData () {
      return this.tableData
    },
    // 获取排序条件
    getSort () {
      return Object.keys(this.sort).every((k) => !this.sort[k])
        ? {}
        : {
          sort: Object.keys(this.sort).reduce((t, k) => {
            if (this.sort[k]) {
              t[k] = this.sort[k]
            }
            return t
          }, {})
        }
    },
    // 发送请求
    request (flag) {
      return new Promise((resolve, reject) => {
        flag && (this.msg.page = 1)
        if (this.api) {
          !this.hideLoading && (this.loading = true)
          this.$emit('reqStart')
          this.$api[this.api]
            ? this.$api[this.api](
              { ...this.msg, ...this.params, ...this.getSort() },
              !this.hideLoading
            )
              .then((data) => {
                resolve(data)
                this.loading = false
                this.$emit('reqEnd', data.res)
                this.tableData = data.res
                !this.hidePagination && (this.count = data.count)
                if (!this.hideSums) {
                  this.setSums(data)
                  this.sumsData = data
                }
              })
              .catch((e) => {
                this.loading = false
                reject(e)
              })
            : (this.loading = false)
        }
      })
    },
    // 页码变化时触发
    currentChange (val) {
      this.msg.page = val
      this.sendChange()
    },
    // 表头搜索框 回车触发
    inputEeter (scope) {
      this.sendChange(true)
    }
  }
}
</script>

<style lang="scss">
$bg-color-blue: #409eff;
$text-color-white: white;
$border-color-gray: #ccc;

.search-table {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    flex-shrink: 1;

    .el-table__body tr.current-row>td {
        background-color: $bg-color-blue;
        color: $text-color-white;

        >div {
            color: $text-color-white;

            >span {
                color: $text-color-white !important;
            }
        }
    }

    .header-cell-class-name {
        padding: 0 !important;
        height: 30px;
        line-height: 30px;
        max-height: 30px;
        overflow: hidden;

        .cell {
            display: flex !important;
            justify-content: center;
            align-items: center;
            padding: 0 1px !important;
            color: #666666; // #606266

            .el-input {
                display: block !important;
            }

            .el-input__inner {
                padding: 0 4px !important;
                border: none;
                height: 30px;
                line-height: 30px;
            }

            .el-input__icon {
                line-height: 30px;
            }

            .el-date-editor .el-input__inner {
                padding: 0 30px !important;
                border-radius: 0;
            }
        }
    }

    .cell-class-name {
        padding: 0 !important;
        height: 30px;
        line-height: 30px;

        .cell {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            padding: 0 !important;

            >span {
                color: #000000; // #606266
                padding: 0 10px;
            }

            .el-date-editor {
                border: none;
            }

            .el-input {
                display: block !important;
            }

            .el-input__inner {
                padding: 0 4px !important;
                border: none;
                height: 30px;
                line-height: 30px;
            }

            .el-date-editor .el-input__inner {
                padding: 0 30px !important;
                border-radius: 0;
            }

            .el-input__icon {
                line-height: 30px;
            }
        }
    }

    .el-table__footer {
        .cell {
            padding: 2px 5px !important;
        }
    }

    .el-table__fixed-footer-wrapper {
        .el-table_1_column_1 {
            position: relative;
        }

        .el-table_1_column_1::before {
            content: "";
            position: absolute;
            left: 0;
            bottom: -1px;
            width: 100%;
            height: 2px;
            // background-color:var(--border-gray);
        }
    }

    .el-table__fixed-footer-wrapper tbody td,
    .el-table__footer-wrapper tbody td {
        padding: 0 !important;
        overflow: hidden;
    }
}

.search-table-pagination {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: solid 1px $border-color-gray;
    box-sizing: border-box;
    border-top: none;
    height: 34px;

    &.search-table-pagination[data-small] {
        .totalPage {
            height: 22px;
            line-height: 24px;
            font-size: 13px;
            padding: 2px 5px;
            font-weight: bold;
        }

        .el-input--mini {
            height: 22px;

            .el-input__inner {
                height: 22px;
            }
        }

        .el-pagination__jump {
            margin: 0;
        }
    }
}
</style>
