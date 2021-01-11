<template>
  <div class="page">
    <header-btn
      border
      :hide-edit="!$permission([{ mc: '公司开支', xg: true }])"
      :hide-change="currentRow && currentRow.sh"
      @change="editChange"
      :activeIndex="activeIndex"
      :defaultTab.sync="tabIndex"
      :tabs="['添加列表', '查询列表', '开支明细']"
    >
      <el-button
        type="info"
        size="mini"
        v-if="$permission([{ mc: '公司开支审核与作废', xg: true }])"
        :disabled="!disabled || !currentRow || currentRow.sh"
        @click="handleExamine"
        >审核</el-button
      >
      <el-button
        type="info"
        size="mini"
        v-if="$permission([{ mc: '公司开支审核与作废', xg: true }])"
        :disabled="!disabled || !currentRow || currentRow.ch || !currentRow.sh"
        @click="handleNullify"
        >作废</el-button
      >
      <el-button type="success" size="mini" @click="request">刷新</el-button>
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
    <div class="billTitle">
      <div class="billTitle-left">
        <auto-form
          ref="autoForm"
          :disabled="disabled"
          style="width: 100%"
          :formItems="formItems"
          @icon-click="fromIconClick"
        />
      </div>
      <div class="billTitle-right" style="left: 580px">
        <div class="billTitle-right-table" style="width: 540px">
          <edit-table
            hideNum
            hide-sums
            hideContext
            headerBg
            ref="editTable2"
            name="CompanyExpensesTitle"
            :columns.sync="columnsTitle"
            :disabled="disabled"
          />
        </div>
      </div>
    </div>
    <div style="flex: 1; height: 0">
      <edit-table
        v-show="tabIndex === '添加列表'"
        ref="editTable"
        name="CompanyExpenses"
        :columns.sync="columnsXx"
        :disabled="disabled"
      />
      <CompanyExpensesList
        v-show="tabIndex === '查询列表'"
        ref="List"
        @row-click="rowClickXx"
        @row-dblclick="rowDblclick"
      />
      <CompanyExpensesListMx
        v-show="tabIndex === '开支明细'"
        ref="ListMx"
        @row-click="rowClickXx"
        @row-dblclick="rowDblclick"
      />
    </div>
    <div v-for="item in subRecords" :key="item.prop">
      <component
        append-to-body
        :sub="sub(item.prop)"
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
import { bill, excel, formIconClick } from '@/common/mixins'
import { columnsXx, columnsTitle, columnsListMx, columnsList } from './columns'
import { formItems } from './formItems'
export default {
  mixins: [bill, formIconClick, excel],
  data () {
    return {
      formItems,
      columnsXx,
      columnsTitle,
      api: {
        add: 'addCompanyExpenses',
        update: 'updateCompanyExpenses',
        getByDh: 'getCompanyExpensesByDh',
        del: 'delCompanyExpenses',
        nullify: 'nullifyCompanyExpenses',
        examine: 'examineCompanyExpenses'
      },
      subRecords: [
        {
          prop: 'xmmc',
          visible: false,
          component: 'AmountType'
        }, {
          prop: 'yhzh',
          visible: false,
          component: 'Bank'
        }
      ]
    }
  },
  created () {
    this.excelFormat = this.c2eFormat(columnsListMx)
  },
  watch: {
    tabIndex (val) {
      this.excelFormat = this.c2eFormat(val === '查询列表' ? columnsList : columnsListMx)
    }
  },
  computed: {
    excelApi () {
      return this.tabIndex === '查询列表' ? 'getCompanyExpensesList' : 'getCompanyExpensesListDetail'
    }
  },
  methods: {
    sub (prop) {
      return prop === 'yhzh' ? ['ghsmc', 'ghsbh'] : []
    },
    request () {
      this.$refs.List && this.$refs.List.request()
      this.$refs.ListMx && this.$refs.ListMx.request()
    },
    submitEnd ({ tableData, ...msg }, type) {
      this.currentRow = {
        tableData,
        ...msg,
        sh: type === 'add' ? false : !this.currentRow ? false : !!this.currentRow.sh,
        ch: type === 'add' ? false : !this.currentRow ? false : !!this.currentRow.ch
      }
      this.initData(msg, [msg], tableData, false)
    },
    rowClickXx (row) {
      this.currentRow = row
      this.getDataByDh(false)
    },
    handleSubmit (msg) {
      if (!msg.xmmc) {
        this.$message.info('项目名称不能为空！')
        return false
      }
      if (parseFloat(msg.je || 0) === 0) {
        this.$message.info('金额不能为零！')
        return false
      }
      msg.tableData = msg.tableData.filter((it) => it.mc)
      if (
        msg.tableData.some((it, index) => {
          if (it.mc !== '' && parseFloat(it.sl || 0) === 0) {
            this.$message.info(`第${index + 1}行数量为空！`)
            return true
          }
        })
      ) {
        return false
      }
      return true
    }
  }
}
</script>
<style lang="scss">
</style>
