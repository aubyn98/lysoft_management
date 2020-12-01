<template>
  <div class="page">
    <header-btn
      border
      @change="editChange"
      :hide-edit="!$permission([{ mc: '物料销售退货', xg: true }])"
      :hide-change="currentRow && currentRow.sh"
      :activeIndex="activeIndex"
      :defaultTab.sync="tabIndex"
      :tabs="['添加列表', '查询列表']"
    >
      <el-button
        type="info"
        size="mini"
         v-if="$permission([{ mc: '物料销售退货审核与作废', xg: true }])"
        :disabled="!disabled || !currentRow || currentRow.sh"
        @click="handleExamine"
        >审核</el-button
      >
      <el-button
        type="info"
        size="mini"
        v-if="$permission([{ mc: '物料销售退货审核与作废', xg: true }])"
        :disabled="!disabled || !currentRow || currentRow.ch || !currentRow.sh"
        @click="handleNullify"
        >作废</el-button
      >
    </header-btn>
    <div class="billTitle" v-show="tabIndex === '添加列表'">
      <div class="billTitle-left">
        <auto-form
          ref="autoForm"
          :disabled="disabled"
          style="width: 100%"
          :formItems="formItems"
          @autocomplete-select="autocompleteSelect"
          @icon-click="fromIconClick"
        />
      </div>
      <div class="billTitle-right" style="left: 700px">
        <div class="billTitle-right-table">
          <edit-table
            hide-num
            hide-sums
            hide-context
            header-bg
            ref="editTable2"
            name="MaterialSalesReturnTitle"
            :columns.sync="columnsTitle"
            :disabled="disabled"
          />
        </div>
      </div>
    </div>
    <content-table
      ref="contentTable"
      :columns.sync="contentColumn"
      name="MaterialSalesReturnContentTable"
      v-show="tabIndex === '添加列表'"
    >
      <template #a>
        <edit-table
          ref="editTable"
          name="MaterialSalesReturnLeft"
          :columns.sync="columnsLeft"
          :disabled="disabled"
          @data-change="dataChange"
          @row-click="rowClick_edit_left"
        />
      </template>
      <template #b>
        <edit-table
          ref="editTable3"
          name="MaterialSalesReturnRight"
          :columns.sync="columnsRight"
          :disabled="disabled || !currentRow_Jl"
          @data-change="dataChangeMx"
        />
      </template>
    </content-table>
    <div class="billList" v-show="tabIndex === '查询列表'">
      <search-table
        hide-sums
        ref="List"
        api="getMaterialSalesReturn"
        name="MaterialSalesReturnList"
        :columns.sync="columnsList"
        @row-click="rowClickXx"
        @row-dblclick="rowDblclick"
      ></search-table>
    </div>
    <div v-for="item in subRecords" :key="item.prop">
      <component
        append-to-body
        :sub="item.prop === 'khmc' ? ['khmc', 'khbh'] : []"
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
import {
  columnsLeft,
  columnsRight,
  columnsTitle,
  columnsList
} from './columns'
import formItems from './formItems'
import { bill, billMx, materialSales, formIconClick, material_customer } from '@/common/mixins'
export default {
  mixins: [bill, billMx, materialSales, formIconClick, material_customer],
  data () {
    return {
      formItems,
      columnsLeft,
      columnsRight,
      columnsTitle,
      columnsList,
      api: {
        add: 'addMaterialSalesReturn',
        update: 'updateMaterialSalesReturn',
        getByDh: 'getMaterialSalesReturnByDh',
        del: 'delMaterialSalesReturn',
        nullify: 'nullifyMaterialSalesReturn',
        examine: 'examineMaterialSalesReturn'
      },
      autocompleteApi: {
        khmc: 'getMaterialSalesReturnCustomer'
      }
    }
  },
  methods: {

  }
}
</script>
<style lang="scss">
</style>
