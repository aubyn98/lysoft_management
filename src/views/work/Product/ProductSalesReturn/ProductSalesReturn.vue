<template>
<div class="page">
    <header-btn
        border
        @change="editChange"
        :hide-edit="!$permission([{ mc: '销售退货', xg: true }])"
        :hide-change="currentRow && currentRow.sh"
        :activeIndex="activeIndex"
        :defaultTab.sync="tabIndex"
        :tabs="['添加列表', '查询列表']">
        <el-button type="info" size="mini" :disabled="!disabled || !currentRow || currentRow.sh" @click="handleExamine(currentRow)" v-if="$permission([{ mc: '销售退货审核与作废', xg: true }])">审核</el-button>
        <el-button type="info" size="mini" :disabled="!disabled || !currentRow || currentRow.ch || !currentRow.sh" @click="handleNullify(currentRow)" v-if="$permission([{ mc: '销售退货审核与作废', xg: true }])">作废</el-button>
        <el-button type="success" size="mini" :disabled="disabled" @click="PVisible = true">多码多价录入</el-button>
        <!-- <el-button type="success" size="mini" :disabled="disabled" @click="PVisible2 = true">库存比较录入</el-button> -->
        <el-button type="info" size="mini" :disabled="disabled" @click="quoteDh" v-if="$permission([{ mc: '销售退货', xg: true }])">引用单号</el-button>
        <el-button type="success" size="mini" @click="refresh" v-show="tabIndex === '查询列表'">刷新</el-button>
    </header-btn>
    <div class="billTitle" v-show="tabIndex === '添加列表'">
        <div class="billTitle-left">
            <auto-form
                ref="autoForm"
                :disabled="disabled"
                style="width: 100%"
                :formItems="formItems"
                @autocomplete-select="autocompleteSelect"
                @icon-click="fromIconClick" />
        </div>
        <div class="billTitle-right" style="left: 880px">
            <div class="billTitle-right-table" style="width:542px;">
                <edit-table
                    hide-num
                    hide-sums
                    hide-context
                    header-bg
                    ref="editTable2"
                    name="ProductSalesReturnTitle"
                    :columns.sync="columnsTitle"
                    :disabled="disabled" />
            </div>
        </div>
    </div>
    <content-table ref="contentTable" :columns.sync="contentColumn" name="ProductSalesReturnContentTable" v-show="tabIndex === '添加列表'">
        <template #a>
            <edit-table
                ref="editTable"
                name="ProductSalesReturnLeft"
                :columns.sync="columnsLeft"
                :disabled="disabled"
                :includeKeys="['msC','mx']"
                @autocomplete-select="editAutocompleteSelect"
                @data-change="dataChange"
                @row-click="rowClick_edit_left" />
        </template>
        <template #b>
            <edit-table
                ref="editTable3"
                name="ProductSalesReturnRight"
                :columns="[]"
                :attach-columns="columnsRight"
                :disabled="disabled || !currentRow_Jl"
                @data-change="dataChangeMx" />
        </template>
    </content-table>
    <div class="billList" v-show="tabIndex === '查询列表'">
        <search-table
            hide-sums
            ref="List"
            api="getProductSalesReturn"
            name="ProductSalesReturnList"
            :columns.sync="columnsList"
            @row-click="rowClickXx"
            @row-dblclick="rowDblclick"></search-table>
    </div>
    <MultipleSizeMultiplePrices :visible.sync="PVisible" @confirm="multipleConfirm" />
    <CompareInventory :visible.sync="PVisible2" @confirm="multipleConfirm" />
    <QuoteProductCheckEnter :visible.sync="visible" @select-end="quoteSelectEnd" :params="params" :attachColumnsFn="attachColumnsFn" />
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
        " />
    </div>
</div>
</template>

<script type="text/javascript">
import {
  columnsLeft,
  // columnsRight,
  columnsTitle,
  columnsList
} from './columns'
import formItems from './formItems'
import { bill, billMx, productBill, formIconClick, product_customer, productQuote } from '@/common/mixins'
export default {
  mixins: [bill, billMx, productBill, formIconClick, product_customer, productQuote],
  data () {
    return {
      formItems,
      columnsLeft,
      columnsRight: [],
      columnsTitle,
      columnsList,
      api: {
        add: 'addProductSalesReturn',
        update: 'updateProductSalesReturn',
        getByDh: 'getProductSalesReturnByDh',
        del: 'delProductSalesReturn',
        nullify: 'nullifyProductSalesReturn',
        examine: 'examineProductSalesReturn'
      },
      /* autocompleteApi: {
        khmc: 'getSalesCustomer'
      }, */
      params: {
        khbh: ''
      },
      PVisible2: false
    }
  },
  created () {
  },
  methods: {

  }
}
</script>

<style lang="scss">
</style>
