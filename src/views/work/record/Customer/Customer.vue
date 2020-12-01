<template>
  <el-dialog
    title="客户档案"
    class="record_dialog"
    :visible="visible"
    :append-to-body="appendToBody"
    @close="closeDialog"
  >
    <div class="page">
      <header-btn
        border
        :hide-edit="!$permission([{ mc: '客户档案', xg: true }])"
        @change="editChange"
        :activeIndex="xxDataIndex"
        :disabled="disabled_header"
        :defaultTab.sync="tabIndex"
        :tabs="['客户信息', '客户信息列表', '停用客户信息列表']"
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
      <div v-show="tabIndex === '客户信息'" class="page-RowContent">
        <div class="page-RowContent-item" data-left>
          <search-table
            small
            hideLoading
            name="CustomerTable"
            ref="Xx"
            api="getCustomer"
            :columns.sync="columnsXx"
            @row-click="rowClickXx"
            @row-dblclick="rowDblclick"
            @reqStart="disabled_header = true"
            @reqEnd="disabled_header = false"
          />
        </div>
        <div class="page-RowContent-item" data-main>
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
            <el-tag style="margin-right: 10px; height: 28px">品牌</el-tag>
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
              name="CustomerTablePp"
              ref="CustomerTablePp"
              :columns.sync="columnsRight"
              :sourceData="currentRowPpList"
              @select="selectKhPp"
              @select-all="selectKhPp"
            />
          </div>
        </div>
      </div>
      <div class="page-RowContent" v-show="tabIndex === '客户信息列表'">
        <search-table
          api="getCustomer"
          name="CustomerXxlbTable"
          ref="Lb"
          :params="{ ty: 0 }"
          :columns.sync="columnsLb"
          @row-click="rowClickXx"
          @row-dblclick="rowDblclick"
        />
      </div>
      <div class="page-RowContent" v-show="tabIndex === '停用客户信息列表'">
        <search-table
          api="getCustomer"
          name="CustomerTyxxlbTable"
          ref="Ty"
          :params="{ ty: 1 }"
          :columns.sync="columnsTy"
          @row-click="rowClickXx"
          @row-dblclick="rowDblclick"
        />
      </div>
      <Band
        append-to-body
        :visible.sync="dialogPpVisible"
        :params="{ khbh: currentRow && currentRow.khbh }"
        @row-dblclick="ppDblclick"
        @selectEnd="selectEndPp"
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
      editTab: '客户信息',
      tabIndex: '客户信息',
      // 操作
      addApi: {
        api: 'addCustomer',
        prop: 'khbh'
      },
      delApi: {
        api: 'delCustomer',
        prop: 'khbh'
      },
      updateApi: {
        api: 'updateCustomer',
        prop: 'khbh'
      },
      // 弹窗显示
      dialogPpVisible: false,
      dialogMemorandumVisible: false,
      // 操作禁用
      disabled_header: false,
      // 当前客户的品牌列表
      currentRowPpList: [],
      // 选中的客户品牌
      selectKhPpRows: [],
      // 列信息
      columnsXx,
      columnsRight,
      columnsLb,
      columnsTy,
      columnsPp,
      // 表单项
      formItems,
      excelApi: 'getCustomer',
      subRecords: [
        {
          prop: 'lx',
          visible: false,
          component: 'CustomerType'
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
    // 品牌相关---------------------------------------------
    selectKhPp (rows) {
      this.selectKhPpRows = rows
    },
    // 表格弹窗 -品牌相关---------------------------------------------
    selectEndPp (rows) {
      this.dialogPpVisible = false
      if (rows.length < 1) return
      this.addKhPp(rows)
    },
    addAction () {
      this.currentRowPpList = []
    },
    addsaveAction (res) {
      res.khpp = this.currentRowPpList
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
        (data) => {
          this.currentRowPpList = data.res
        },
        (e) => {}
      )
    },
    ppDblclick (row) {
      this.dialogPpVisible = false
      this.addKhPp([row])
    },
    delKhPp () {
      this.currentRowPpList = this.currentRowPpList.filter(it => {
        return !this.selectKhPpRows.some(i => it.pp === i.pp)
      })
    },
    // 表格相关---------------------------------------------
    initPpList (flag) {
      this.currentRowPpList = flag ? this.$format.copy(this.currentRow.khpp) : []
    },
    rowClickXxAction () {
      this.initPpList(true)
    },
    // 顶部编辑按钮相关---------------------------------------------
    addcancelAction () {
      this.initPpList()
    },
    updatecancelAction () {
      this.initPpList(true)
    },
    updatesave (fn) {
      this.$refs.autoForm.submitForm().then((option) => {
        const { bwl, id, index, rownumber, blank_1, blank_2, ...res } = option
        const khpp = this.currentRowPpList
        const r = { ...res, khpp }
        const opt = { ...option, khpp }
        if (parseFloat(res.ljqk) > 0 && res.sftykh) {
          this.$confirm('此客户有累计欠款, 是否停用?', '提示', {
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
