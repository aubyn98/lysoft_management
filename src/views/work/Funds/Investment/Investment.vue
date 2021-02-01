<template>
  <div class="page">
    <header-btn
      border
      :hide-edit="!$permission([{ mc: '支款登记', xg: true }])"
      :hide-change="currentRow && currentRow.zt === '结算'"
      @change="editChange"
      :activeIndex="activeIndex"
    >
      <!-- <el-button type="success" size="mini" @click="request">刷新</el-button> -->
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
          :includeKeys="['id']"
        />
      </div>
      <div class="billTitle-right" style="left: 1050px;">
        <div class="billTitle-right-table" style="width: 240px">
          <edit-table
            hideNum
            hide-sums
            hideContext
            headerBg
            ref="editTable2"
            name="InvestmentTitle"
            :columns.sync="columnsTitle"
            :disabled="disabled"
          />
        </div>
      </div>
    </div>
    <div style="flex: 1; height: 0">
      <innerStatistic
        name="InvestmentList"
        api="getInvestment"
        ref="statistic"
        @row-click="rowclick"
        :columns.sync="columnsList"
        :formItems="formItemsList"
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
import { bill, billOnlyForm, excel, formIconClick } from '@/common/mixins'
import { columnsTitle, columnsList } from './columns'
import { formItems, formItemsList } from './formItems'
export default {
  mixins: [bill, billOnlyForm, formIconClick, excel],
  data () {
    return {
      formItems,
      columnsTitle,
      formItemsList,
      columnsList,
      api: {
        add: 'addInvestment',
        update: 'updateInvestment',
        getByDh: 'getInvestmentByDh',
        del: 'delInvestment'
      },
      subRecords: [
        {
          prop: 'yggh',
          visible: false,
          component: 'Staff'
        },
        {
          prop: 'ygmc',
          visible: false,
          component: 'Staff'
        }
      ],
      excelApi: 'getInvestment'
    }
  }
}
</script>
<style lang="scss">
</style>
