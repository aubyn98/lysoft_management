<template>
  <el-dialog
    title="工序档案"
    class="record_dialog"
    :visible="visible"
    :append-to-body="appendToBody"
    @close="closeDialog"
    center
  >
    <div class="page Process">
      <header-btn border hide-edit :activeIndex="dataIndex">
        <div
          style="margin-right: 10px"
          v-if="$permission([{ mc: '工序档案', xg: true }])"
        >
          <el-button type="primary" size="mini" @click="change('add')"
            >添加</el-button
          ><el-button type="warning" size="mini" @click="change('update')"
            >修改</el-button
          >
          <el-button type="danger" size="mini" @click="del">删除</el-button>
        </div>
        <el-button type="success" size="mini" @click="getProcess"
          >刷新</el-button
        >
        <el-button type="success" size="mini" v-if="selection" @click="$emit('selectEnd',selectRows)"
          >选择完毕</el-button
        >
        <div class="header_dateBox">
          <el-tag>产量登记工价设置</el-tag>
          <span>开始日期</span>
          <el-date-picker
            v-model="attach.ksrq"
            type="date"
            size="mini"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
          <span>结束日期</span>
          <el-date-picker
            v-model="attach.jsrq"
            type="date"
            size="mini"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
            :picker-options="pickerOptions"
          >
          </el-date-picker>
          <el-button type="primary" size="mini" @click="changeSelectProcessWages">更新所选工序工价</el-button>
        </div>
      </header-btn>
      <content-table
        ref="contentTable"
        :columns.sync="contentColumn"
        name="ProcessContentTable"
      >
        <template #a>
          <search-table
            ref="searchTable"
            name="ProcessAddLeft"
            selection
            @select="select"
            @select-all="select"
            :columns.sync="columnsLeft"
            :sourceData="tableData"
            :sourceCount="count"
            @row-click="rowClick_left"
          />
        </template>
        <template #b>
          <search-table
            ref="searchTable2"
            name="ProcessAddRight"
            hide-search
            :sourceData="tableDataStaff"
            :columns.sync="columnsRight"
          />
        </template>
      </content-table>
    </div>
    <el-dialog
      title="工序信息"
      :visible.sync="subVisibles.change"
      append-to-body
      class="innerDialog"
      data-title-center
      destroy-on-close
    >
      <div style="height:60vh;overflow-y:auto;" v-if="subVisibles.change">
        <div v-for="r in ProcessList" :key="r.id">
          <auto-form
            ref="autoForm"
            style="width: 100%"
            :formItems="formItems"
            :disabled="false"
          />
          <div style="height: 300px">
            <edit-table
              ref="editTable"
              name="ProcessAddRight"
              :columns.sync="columnsRight"
              :disabled="false"
              hide-sums
            />
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="subVisibles.change = false">取 消</el-button>
        <el-button type="primary" @click="changeConfirm"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- <Job :visible="true" append-to-body/> -->
  </el-dialog>
</template>

<script type="text/javascript">
import { columnsLeft, columnsRight } from './columns'
import { formItems } from './formItems'
export default {
  props: {
    selection: {
      type: Boolean,
      default: false
    },
    appendToBody: {
      type: Boolean,
      default: false
    },
    visible: {
      type: Boolean,
      required: true,
      default: true
    },
    params: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      formItems,
      columnsLeft,
      columnsRight,
      disabled: true,
      dataIndex: -1,
      attach: {
        ksrq: '',
        jsrq: ''
      },
      subVisibles: { change: false },
      contentColumn: [
        { prop: 'a', width: 900 },
        { prop: 'b', width: 300 }
      ],
      tableData: [],
      tableDataStaff: [],
      count: 0,
      edit: 'add',
      selectRows: [],
      ProcessList: [],
      pickerOptions: {
        disabledDate: (time) => {
          return time.getTime() < new Date(this.attach.ksrq).getTime() - 28800000
        }
      }
    }
  },
  mounted () {
    this.getProcess()
  },
  methods: {
    async changeConfirm () {
      // 判断 添加 还是 修改
      const flag = this.edit === 'add'
      // 获取工序数据
      let forms = this.$refs.autoForm
      forms = await Promise.all(forms.map(c => c.submitForm()))
      forms.forEach((f, i) => {
        f.mx = this.$refs.editTable[i].submitTable()
      })
      this.$api[(flag ? 'add' : 'update') + 'Process'](forms).then(res => {
        this.getProcess()
        this.subVisibles.change = false
      })
      // 关闭dialog
      // this.subVisibles.change = false
    },
    select (vals) {
      this.selectRows = vals
    },
    getCondition () {
      return new Promise(resolve => {
        this.$nextTick(() => {
          resolve(this.$refs.searchTable.getMsg())
        })
      })
    },
    getProcess () {
      this.getCondition().then(msg => {
        this.$api.getProcess({ ...msg, ...(this.params) }).then(({ res }) => {
          this.tableData = res
        })
      })
    },
    rowClick_left (row) {
      this.$api.getStaffByProcess({ xh: row.xh }).then(({ res }) => {
        this.tableDataStaff = res
      })
    },
    closeDialog () {
      this.$emit('update:visible', false)
      this.$emit('close')
    },
    change (edit) {
      // 判断 添加 还是 修改
      const flag = edit === 'add'
      if (!flag && this.selectRows.length === 0) return this.$alert('请至少选择一项数据进行修改！')
      this.edit = edit
      // 显示dialog
      this.subVisibles.change = true
      // 初始化工序项
      this.ProcessList = flag ? [{}] : this.selectRows
      this.$nextTick(() => {
        // 初始化信息表单
        this.$refs.autoForm.forEach((c, i) => {
          c.initForm(flag ? null : this.ProcessList[i])
        })
        // 初始化工序关联员工表格
        const editTables = this.$refs.editTable
        flag ? editTables[0].initTableData(null, false) : Promise.all(this.selectRows.map(c => this.$api.getStaffByProcess({ xh: c.xh }))).then(res => {
          res = res.forEach((r, i) => {
            editTables[i].initTableData(r.res, false)
          })
        })
      })
    },
    changeSelectProcessWages () {
      if (this.selectRows.length === 0) return this.$alert('请至少选择一项数据进行修改！')
      const { ksrq, jsrq } = this.attach
      if (!ksrq || !jsrq || new Date(jsrq).getTime() < new Date(ksrq).getTime()) return this.$alert('请正确选择日期范围！')
      this.$api.changeProductionProcessWages({ list: this.selectRows, ksrq, jsrq }).then(res => {
        // this.getProcess()
      })
    },
    del () {
      if (this.selectRows.length === 0) return this.$alert('请至少选择一项数据进行删除！')
      this.$api.delProcess({ xhs: '\'' + this.selectRows.map(r => r.xh).join('\', \'') + '\'' }).then(r => {
        this.getProcess()
      })
    }
  }
}
</script>
<style lang="scss">
.Process {
  .page-header--btn {
    position: relative;
  }
  .header_dateBox {
    position: absolute;
    top: 0;
    right: 0;
    button {
      margin-left: 10px;
    }
    > span {
      + * {
        width: 150px;
      }
      margin: 0 5px 0 10px;
    }
  }
}
</style>
