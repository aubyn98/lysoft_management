<template>
  <el-dialog
    title="供货商档案"
    class="record_dialog"
    :visible="visible"
    :append-to-body="appendToBody"
    @close="closeDialog"
  >
    <div class="page">
      <header-btn
        border
        :hide-edit="!$permission([{ mc: '供货商档案', xg: true }])"
        @change="editChange"
        :activeIndex="xxDataIndex"
        :defaultTab.sync="tabIndex"
        :tabs="['供货商信息', '供货商信息列表', '停用供货商信息列表']"
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
      <div v-show="tabIndex === '供货商信息'" class="page-RowContent">
        <div class="page-RowContent-item" data-left>
          <search-table
            small
            hideLoading
            name="VendorTable"
            ref="Xx"
            api="getVendor"
            :params="{ ty: 0 }"
            :columns.sync="columnsXx"
            @row-click="rowClickXx"
            @row-dblclick="rowDblclick"
          />
        </div>
        <div class="page-RowContent-item" data-main>
          <auto-form
            ref="autoForm"
            style="width: 100%"
            :disabled="disabled"
            :formItems="formItems"
          />
        </div>
      </div>
      <div class="page-RowContent" v-show="tabIndex === '供货商信息列表'">
        <search-table
          small
          api="getVendor"
          ref="Lb"
          name="VendorXxlbTable"
          :params="{ ty: 0 }"
          :columns.sync="columnsLb"
          @row-click="rowClickXx"
          @row-dblclick="rowDblclick"
        />
      </div>
      <div class="page-RowContent" v-show="tabIndex === '停用供货商信息列表'">
        <search-table
          small
          api="getVendor"
          ref="Ty"
          name="VendorXxlbTable"
          :params="{ ty: 1 }"
          :columns.sync="columnsTy"
          @row-click="rowClickXx"
          @row-dblclick="rowDblclick"
        />
      </div>
    </div>
  </el-dialog>
</template>

<script type="text/javascript">
import formItems from './formItems'
import { columnsXx, columnsLb, columnsTy } from './columns'
import { record, excel } from '@/common/mixins'
export default {
  mixins: [record, excel],
  data () {
    return {
      // 选择的tab
      editTab: '供货商信息',
      tabIndex: '供货商信息',
      // 操作
      updateApi: {
        api: 'updateVendor'
      },
      addApi: {
        api: 'addVendor',
        prop: 'ghsbh'
      },
      delApi: {
        api: 'delVendor',
        prop: 'ghsbh'
      },
      columnsXx,
      columnsLb,
      columnsTy,
      formItems,
      excelApi: 'getVendor'
    }
  },
  created () {
    this.excelFormat = this.c2eFormat(this.columnsLb)
  },
  methods: {
    // 表单相关---------------------------------------------

    // 表格相关---------------------------------------------

    // 顶部编辑按钮相关---------------------------------------------
    updatesave (fn) {
      this.$refs.autoForm.submitForm().then((option) => {
        const { bwl, id, index, rownumber, ...res } = option
        if (parseFloat(res.ljqk) > 0 && res.sftyghs) {
          this.$confirm('此供货商档案有欠款情况, 是否停用?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.updatesaveCommon(fn, res, option)
          })
        } else {
          this.updatesaveCommon(fn, res, option)
        }
      })
    }
  },
  components: {}
}
</script>
<style lang="scss">
</style>
