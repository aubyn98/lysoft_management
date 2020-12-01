<template>
  <div class="page">
    <header-btn
      border
      @change="editChange"
      :activeIndex="activeIndex"
      :defaultTab.sync="tabIndex"
      :hide-change="currentRow && currentRow.jd"
      :hide-edit="!$permission([{ mc: '物料采购', xg: true }])"
      :tabs="['添加列表', '查询列表']"
    >
    <el-button type="info" v-if="$permission([{ mc: '物料采购_结单', xg: true }])" size="mini" :disabled="!disabled" @click="handleStatement">{{currentRow && currentRow.jd ? '反结单':'结单'}}</el-button>
    <el-button type="primary" size="mini" :disabled="!disabled" @click="copyOrder">复制此单</el-button>
    </header-btn>
    <div class="billTitle" v-show="tabIndex === '添加列表'">
      <div class="billTitle-left">
        <auto-form
          ref="autoForm"
          :disabled="disabled"
          style="width: 100%"
          :formItems="formItems"
          @icon-click="fromIconClick"
        />
      </div>
      <div class="billTitle-right" style="left: 800px">
        <div class="billTitle-right-table">
          <edit-table
            hide-num
            hide-sums
            hide-context
            header-bg
            ref="editTable2"
            name="MaterialPurchaseTitle"
            :columns.sync="columnsTitle"
            :disabled="disabled"
          />
        </div>
      </div>
    </div>
    <edit-table
      v-show="tabIndex === '添加列表'"
      ref="editTable"
      name="MaterialPurchase"
      :columns.sync="columnsLeft"
      :disabled="disabled"
      @data-change="dataChange"
    />
    <div class="billList">
      <search-table
      v-if="tabIndex === '查询列表'"
      hide-sums
      ref="List"
      api="getMaterialPurchase"
      name="MaterialPurchaseList"
      :columns.sync="columnsList"
      @row-click="rowClickXx"
      @row-dblclick="rowDblclick"
    ></search-table>
    </div>
    <div v-for="item in subRecords" :key="item.prop">
        <component
          append-to-body
          :sub="item.prop === 'ghsmc' ? ['ghsmc','ghsbh'] : []"
          :is="item.component"
          :visible.sync="item.visible"
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
  </div>
</template>

<script type="text/javascript">
import { bill, formIconClick, materialSubmit } from '@/common/mixins'
import { columnsLeft, columnsTitle, columnsList } from './columns'
import formItems from './formItems'
export default {
  mixins: [bill, formIconClick, materialSubmit],
  data () {
    return {
      formItems,
      columnsLeft,
      columnsTitle,
      columnsList,
      api: {
        add: 'addMaterialPurchase',
        update: 'updateMaterialPurchase',
        getByDh: 'getMaterialPurchaseByDh',
        del: 'delMaterialPurchase',
        statement: 'statementMaterialPurchase'
      },
      subRecords: [
        {
          prop: 'ghsmc',
          visible: false,
          component: 'Vendor'
        }
      ]
    }
  },
  methods: {
    copyOrder () {
      if (!this.currentRow) {
        return this.$message.info('请选择要复制的单据！')
      }
      this.$api.copyMaterialPurchase({ dh: this.currentRow.dh }).then(data => {
        this.$refs.List && this.$refs.List.request()
        const { tableData, ...msg } = data.res[0]
        this.currentRow = { tableData, ...msg, jd: !!this.currentRow.jd }
        this.initData(msg, [msg], tableData, false)
      })
    },
    submitEnd ({ tableData, ...msg }, type) {
      this.currentRow = { tableData, ...msg, jd: type === 'add' ? false : !this.currentRow ? false : !!this.currentRow.jd }
      this.initData(msg, [msg], tableData, false)
    },
    dataChange (tableData) {
      this.$refs.autoForm.setFieldsValue({
        kdje: tableData.reduce((t, r) => {
          t = this.$math.add(this.$math.multiply(parseFloat(r.sl || 0), parseFloat(r.dj || 0)), t)
          return t
        }, 0)
      })
    }/* ,
    handleSubmit (msg) {
      msg.tableData = msg.tableData.filter((it) => it.wlbh && it.wlmc)
      if (
        msg.tableData.some((it, index) => {
          if (
            (it.wlmc !== '' || it.wlbh !== '') &&
            parseFloat(it.sl || 0) === 0
          ) {
            this.$message.info(`第${index + 1}行数量为空！`)
            return true
          }
        })
      ) {
        return false
      }
      return true
    } */
  }
}
</script>
<style lang="scss">
</style>
