<template>
  <div class="page">
    <header-btn
      border
      @change="editChange"
      :activeIndex="xxDataIndex"
      :defaultTab.sync="tabIndex"
      :tabs="['供货商信息', '供货商信息列表', '停用供货商信息列表']"
    >
    </header-btn>
    <div v-show="tabIndex === '供货商信息'" class="page-RowContent">
      <div class="page-RowContent-item" data-left>
        <search-table
          small
          hideLoading
          name="VendorTable"
          ref="VendorTableXx"
          api="getVendor"
          :pageSize="30"
          :params="{ ty: 0 }"
          :columns.sync="columnsXx"
          @row-click="rowClickXx"
        />
      </div>
      <div class="page-RowContent-item" data-main>
        <auto-form
          :formItems="formItems"
          style="width: 100%"
          ref="autoForm"
          :disabled="disabled"
        />
      </div>
    </div>
    <div class="page-RowContent" v-show="tabIndex === '供货商信息列表'">
      <search-table
        small
        api="getVendor"
        ref="VendorTableLb"
        name="VendorXxlbTable"
        :pageSize="30"
        :params="{ ty: 0 }"
        :columns.sync="columnsLb"
        @row-dblclick="rowDblclick"
      />
    </div>
    <div class="page-RowContent" v-show="tabIndex === '停用供货商信息列表'">
      <search-table
        small
        api="getVendor"
        ref="VendorTableTy"
        name="VendorXxlbTable"
        :pageSize="30"
        :params="{ ty: 1 }"
        :columns.sync="columnsTy"
        @row-dblclick="rowDblclick"
      />
    </div>
  </div>
</template>

<script type="text/javascript">
import formItems from './formItems'
import { columnsXx, columnsLb, columnsTy } from './columns'
import { record } from '@/common/mixins'
export default {
  mixins: [record],
  data () {
    return {
      // 选择的tab
      tabIndex: '供货商信息',
      columnsXx,
      columnsLb,
      columnsTy,
      formItems
    }
  },
  methods: {
    // 表单相关---------------------------------------------

    // 表格相关---------------------------------------------
    rowClickXx (row) {
      this.rowClickXxCommon(row)
    },
    rowDblclick (row, c, e) {
      this.rowDblclickCommon(row)
      this.tabIndex = '供货商信息'
      this.$refs.VendorTableXx.setCurrentRow()
    },
    refresh () {
      this.$refs.VendorTableXx.request(true)
      this.$refs.VendorTableLb.request(true)
      this.$refs.VendorTableTy.request(true)
    },
    // 顶部编辑按钮相关---------------------------------------------
    add () {
      this.addCommon()
      this.tabIndex = '供货商信息'
      this.$refs.VendorTableXx.setCurrentRow()
    },
    addsave (fn) {
      this.$refs.autoForm.submitForm().then(({ ...res }) => {
        this.$api.addVendor(res).then(
          (r) => {
            const result = { ...res, id: r.res, ghsbh: r.ghsbh }
            this.addsaveCommon(result, fn)
          },
          (e) => {}
        )
      })
    },
    addcancel () {
      this.addcancelCommon()
    },
    update () {},
    updatesave (fn) {
      this.$refs.autoForm.submitForm().then((option) => {
        const { bwl, id, index, rownumber, ...res } = option
        if (parseFloat(res.ljqk) > 0 && res.sftyghs) {
          this.$confirm('此供货商档案有欠款情况, 是否停用?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.updatesaveCommon('updateVendor', fn, res, option)
          })
        } else {
          this.updatesaveCommon('updateVendor', fn, res, option)
        }
      })
    },
    del () {}
  },
  components: {}
}
</script>
