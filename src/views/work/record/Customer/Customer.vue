<template>
  <div class="page">
    <header-btn
      border
      @change="editChange"
      :activeIndex="xxDataIndex"
      :disabled="disabled_header"
      :defaultTab.sync="tabIndex"
      :tabs="['客户信息', '客户信息列表', '停用客户信息列表']"
    >
    </header-btn>
    <div v-show="tabIndex === '客户信息'" class="page-RowContent">
      <div class="page-RowContent-item" data-left>
        <search-table
          small
          hideLoading
          name="CustomerTable"
          ref="CustomerTableXx"
          api="getCustomer"
          :pageSize="30"
          :columns.sync="columnsXx"
          @row-click="rowClickXx"
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
        ref="CustomerTableLb"
        :pageSize="30"
        :params="{ ty: 0 }"
        :columns.sync="columnsLb"
        @row-dblclick="rowDblclick"
      />
    </div>
    <div class="page-RowContent" v-show="tabIndex === '停用客户信息列表'">
      <search-table
        api="getCustomer"
        name="CustomerTyxxlbTable"
        ref="CustomerTableTy"
        :params="{ ty: 1 }"
        :pageSize="30"
        :columns.sync="columnsTy"
        @row-dblclick="rowDblclick"
      />
    </div>
    <Band
      :visible.sync="dialogPpVisible"
      :params="{ khbh: currentRow && currentRow.khbh }"
      @row-dblclick="ppDblclick"
      @selectEnd="selectEndPp"
    />
    <CustomerType
      :visible.sync="dialogKhLxVisible"
      @row-dblclick="khLxDblclick"
      @selectEnd="selectEndKhLx"
    />
    <Memorandum
      :visible.sync="dialogMemorandumVisible"
      :params="{ khbh: currentRow && currentRow.khbh }"
    />
  </div>
</template>

<script type="text/javascript">
import { record } from '@/common/mixins'
import formItems from './formItems'
import {
  columnsXx,
  columnsRight,
  columnsLb,
  columnsTy,
  columnsPp
} from './columns'
export default {
  mixins: [record],
  data () {
    return {
      // 弹窗显示
      dialogPpVisible: false,
      dialogKhLxVisible: false,
      dialogMemorandumVisible: false,
      // 操作禁用
      disabled_header: false,
      // 当前客户的品牌列表
      currentRowPpList: [],
      // 选中的客户品牌
      selectKhPpRows: [],
      // 选择的tab
      tabIndex: '客户信息',
      // 列信息
      columnsXx,
      columnsRight,
      columnsLb,
      columnsTy,
      columnsPp,
      // 表单项
      formItems
    }
  },
  methods: {
    // 表单相关---------------------------------------------
    fromBtnClick (prop) {
      if (!this.currentRow) return
      this.dialogMemorandumVisible = true
    },
    fromIconClick (prop) {
      if (prop === 'lx') this.dialogKhLxVisible = true
    },
    // 表格弹窗 -客户类型相关---------------------------------------------
    selectEndKhLx (rows) {
      if (!rows[0]) return this.$message.info('请至少选择一项！')
      const { id, index, ...row } = rows[0]
      this.$refs.autoForm.setFieldsValue(row)
      this.dialogKhLxVisible = false
    },
    khLxDblclick ({ id, index, ...row }) {
      this.dialogKhLxVisible = false
      console.log(row)
      this.$refs.autoForm.setFieldsValue(row)
      this.dialogKhLxVisible = false
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
    addKhPp (rows) {
      this.$api.addKhPp({ pp: rows, khbh: this.currentRow.khbh }).then(
        (res) => {
          this.getKhPp()
        },
        (e) => {}
      )
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
      this.$api.delKhPp({ id: this.selectKhPpRows.map((it) => it.id) }).then(
        (r) => {
          this.getKhPp()
          this.selectKhPpRows = []
          this.$refs.CustomerTablePp.setCurrentRow()
        },
        (e) => {}
      )
    },
    // 表格相关---------------------------------------------
    refresh () {
      this.$refs.CustomerTableXx.request(true)
      this.$refs.CustomerTableLb.request(true)
      this.$refs.CustomerTableTy.request(true)
    },
    rowClickXx (row) {
      this.rowClickXxCommon(row)
      this.getKhPp()
    },
    rowDblclick (row, c, e) {
      this.rowDblclickCommon(row)
      this.tabIndex = '客户信息'
      this.$refs.CustomerTableXx.setCurrentRow()
    },
    // 顶部编辑按钮相关---------------------------------------------
    add () {
      this.addCommon()
      this.currentRowPpList = []
      this.tabIndex = '客户信息'
      this.$refs.CustomerTableXx.setCurrentRow()
    },
    addsave (fn) {
      this.$refs.autoForm
        .submitForm()
        .then(({ bwl, blank_1, blank_2, ...res }) => {
          this.$api.addCustomer(res).then(
            (r) => {
              const result = { ...res, id: r.res, khbh: r.khbh }
              this.addsaveCommon(result, fn)
            },
            (e) => {}
          )
        })
    },
    addcancel () {
      this.addcancelCommon()
      this.currentRowPpList = []
    },
    update () {},
    updatesave (fn) {
      this.$refs.autoForm.submitForm().then((option) => {
        const { bwl, id, index, rownumber, blank_1, blank_2, ...res } = option
        if (parseFloat(res.ljqk) > 0 && res.sftykh) {
          this.$confirm('此客户有累计欠款, 是否停用?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.updatesaveCommon('updateCustomer', fn, res, option)
          })
        } else {
          this.updatesaveCommon('updateCustomer', fn, res, option)
        }
      })
    },
    del () {
      this.$api.delCustomer({ khbh: this.currentRow.khbh }).then((res) => {
        this.$refs.CustomerTableXx.setCurrentRow()
        this.refresh()
      })
    }
  }
}
</script>
