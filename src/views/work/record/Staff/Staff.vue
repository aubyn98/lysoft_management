<template>
  <el-dialog
    title="员工档案"
    class="record_dialog"
    :visible="visible"
    :append-to-body="appendToBody"
    @close="closeDialog"
  >
    <!-- :disabled="disabled_header" -->
    <div class="page Staff">
      <header-btn
        border
        :hide-edit="!$permission([{ mc: '员工档案', xg: true }])"
        @change="editChange"
        :activeIndex="xxDataIndex"
        :defaultTab.sync="tabIndex"
        :tabs="['员工信息', '员工信息列表', '离职员工信息列表']"
      >
        <el-button type="primary" size="mini" @click="exportExcel"
          >导出</el-button
        >
        <exportExcel
          ref="exportExcel"
          :msg="excelData"
          :format="excelFormat"
          style="display: none"
        />
      </header-btn>
      <div v-show="tabIndex === '员工信息'" class="page-RowContent">
        <div class="page-RowContent-item" data-left>
          <search-table
            small
            hideLoading
            name="StaffTable"
            ref="Xx"
            api="getStaff"
            :columns.sync="columnsXx"
            @row-click="rowClickXx"
            @row-dblclick="rowDblclick"
            @reqStart="disabled_header = true"
            @reqEnd="disabled_header = false"
          />
        </div>
        <div class="page-RowContent-item" data-main style="max-width: 800px">
          <auto-form
            ref="autoForm"
            :disabled="disabled"
            style="width: 100%"
            :formItems="formItems"
            @btn-click="fromBtnClick"
            @icon-click="fromIconClick"
          />
        </div>
        <div class="page-RowContent-item" data-right>
          <div class="page-RowContent-item-header">
            <el-tag style="margin-right: 10px; height: 28px">负责工序</el-tag>
            <el-button
              type="primary"
              size="mini"
              :disabled="disabled"
              @click="dialogPpVisible = !dialogPpVisible"
              >添加</el-button
            ><el-button
              type="danger"
              size="mini"
              @click="delKhPp"
              :disabled="disabled || selectKhPpRows.length < 1"
              >删除</el-button
            >
          </div>
          <div class="page-RowContent-item-main" style="flex-shrink: 1">
            <search-table
              hidePagination
              hideSearch
              selection
              name="StaffTableGx"
              ref="StaffTableGx"
              :columns.sync="columnsRight"
              :sourceData="currentRowPpList"
              @select="selectKhPp"
              @select-all="selectKhPp"
            />
          </div>
        </div>
      </div>
      <div class="page-RowContent" v-show="tabIndex === '员工信息列表'">
        <search-table
          api="getStaff"
          name="StaffXxlbTable"
          ref="Lb"
          :params="{ sfzz: '是' }"
          :columns.sync="columnsLb"
          @row-click="rowClickXx"
          @row-dblclick="rowDblclick"
        />
      </div>
      <div class="page-RowContent" v-show="tabIndex === '离职员工信息列表'">
        <search-table
          api="getStaffByTz"
          name="StaffTyxxlbTable"
          ref="Ty"
          :columns.sync="columnsTy"
          @row-click="rowClickXx"
          @row-dblclick="rowDblclick"
        />
      </div>
      <Process
        append-to-body
        v-if="dialogPpVisible"
        :visible.sync="dialogPpVisible"
        :params="{ exclude: `'${currentRowPpList.map((l) => l.gxmc).join('\',\'')}'` }"
        @row-dblclick="ppDblclick"
        @selectEnd="selectEndPp"
        selection
      />
      <div v-for="item in subRecords" :key="item.component">
        <component
          :is="item.component"
          :visible.sync="item.visible"
          append-to-body
          @row-dblclick="
            (...argv) => {
              subDblclick(item.prop, ...argv);
            }
          "
          @selectEnd="
            (...argv) => {
              subSelectEnd(item.prop, ...argv);
            }
          "
        />
      </div>
      <Memorandum
        append-to-body
        :visible.sync="dialogMemorandumVisible"
        :params="{ khbh: currentRow && currentRow.khbh }"
      />
    </div>
  </el-dialog>
</template>

<script type="text/javascript">
import { record, excel, formIconClick } from '@/common/mixins'
import formItems from './formItems'
import {
  columnsXx,
  columnsRight,
  columnsLb,
  columnsTy,
  columnsPp
} from './columns'
export default {
  mixins: [record, excel, formIconClick],
  data () {
    return {
      // 选择的tab
      editTab: '员工信息',
      tabIndex: '员工信息',
      // 操作
      addApi: {
        api: 'addStaff',
        prop: 'yggh'
      },
      delApi: {
        api: 'delStaff',
        prop: 'yggh'
      },
      updateApi: {
        api: 'updateStaff',
        prop: 'yggh'
      },
      // 弹窗显示
      dialogPpVisible: false,
      dialogMemorandumVisible: false,
      // 操作禁用
      disabled_header: false,
      // 当前员工的工序列表
      currentRowPpList: [],
      // 选中的员工工序
      selectKhPpRows: [],
      // 列信息
      columnsXx,
      columnsRight,
      columnsLb,
      columnsTy,
      columnsPp,
      // 表单项
      formItems,
      excelApi: 'getStaff',
      subRecords: [
        {
          prop: 'bm',
          visible: false,
          component: 'Department'
        },
        {
          prop: 'zw',
          visible: false,
          component: 'Job'
        },
        {
          prop: 'jsfs',
          visible: false,
          component: 'SalaryBalanceType'
        }
      ]
    }
  },
  created () {
    this.excelFormat = this.c2eFormat(this.columnsLb)
  },
  methods: {
    // 表单相关---------------------------------------------
    fromBtnClick (prop) {
      if (!this.currentRow) return
      this.dialogMemorandumVisible = true
    },
    // 工序相关---------------------------------------------
    selectKhPp (rows) {
      this.selectKhPpRows = rows
    },
    // 表格弹窗 -工序相关---------------------------------------------
    selectEndPp (rows) {
      this.dialogPpVisible = false
      if (rows.length < 1) return
      this.addKhPp(rows)
    },
    addAction () {
      this.currentRowPpList = []
    },
    addsaveAction (res) {
      res.gxList = this.currentRowPpList
    },
    addKhPp (rows) {
      this.currentRowPpList.push(...rows)
      /* this.$api.addKhPp({ pp: rows, khbh: this.currentRow.khbh }).then(
        (res) => {
          this.getKhPp()
        },
        (e) => {}
      ) */
    },
    getKhPp () {
      this.$api.getKhPp({ khbh: this.currentRow.khbh }).then(
        data => {
          this.currentRowPpList = data.res
        },
        e => {}
      )
    },
    ppDblclick (row) {
      this.dialogPpVisible = false
      this.addKhPp([row])
    },
    delKhPp () {
      this.currentRowPpList = this.currentRowPpList.filter(it => {
        return !this.selectKhPpRows.some(i => it.gxmc === i.gxmc)
      })
    },
    // 表格相关---------------------------------------------
    initPpList (flag) {
      this.currentRowPpList = flag
        ? this.$format.copy(this.currentRow.gxList)
        : []
    },
    rowClickXxAction () {
      this.initPpList(true)
    },
    // 顶部编辑按钮相关---------------------------------------------
    addsave (fn) {
      const { api /* , prop */ } = this.addApi
      this.$refs.autoForm.submitForm().then(res => {
        this.addsaveAction && this.addsaveAction(res)
        this.$api[api](res).then(
          r => {
            const result = { ...res, id: r.id, yggh: r.yggh, qxkh: r.qxkh }
            this.currentRow = result
            this.initForm(result)
            fn()
            this.disabled = true
            this.xxDataIndex = 0
            this.refresh(false)
          },
          e => {}
        )
      })
    },
    addcancelAction () {
      this.initPpList()
    },
    updatecancelAction () {
      this.initPpList(true)
    },
    updatesave (fn) {
      this.$refs.autoForm.submitForm().then(option => {
        const { bwl, id, index, rownumber, blank_1, blank_2, ...res } = option
        const gxList = this.currentRowPpList
        const r = { ...res, gxList }
        const opt = { ...option, gxList }
        if (parseFloat(res.ljqk) > 0 && res.sftykh) {
          this.$confirm('此员工有累计欠款, 是否离职?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.updatesaveCommon(fn, r, opt)
          })
        } else {
          this.updatesaveCommon(fn, r, opt)
        }
      })
    }
  }
}
</script>
<style lang="scss">
.Staff {
  > .page-RowContent {
    > .page-RowContent-item[data-main] {
      overflow-y: auto;
      > .auto-form {
        padding-top: 0px;
        padding-right: 2px;
      }
    }
  }
}
</style>
