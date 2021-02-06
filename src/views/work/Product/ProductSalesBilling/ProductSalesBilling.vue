<template>
<div class="page">
    <header-btn
        border
        @change="editChange"
        :hide-edit="!$permission([{ mc: '销售开单', xg: true }])"
        :hide-change="currentRow && currentRow.sh"
        :activeIndex="activeIndex"
        :defaultTab.sync="tabIndex"
        :tabs="['添加列表', '查询列表']">
        <el-button type="info" size="mini" :disabled="!disabled || !currentRow || currentRow.sh" @click="handleExamine(currentRow)" v-if="$permission([{ mc: '销售开单审核与作废', xg: true }])">审核</el-button>
        <el-button type="info" size="mini" :disabled="!disabled || !currentRow || currentRow.ch || !currentRow.sh" @click="handleNullify(currentRow)" v-if="$permission([{ mc: '销售开单审核与作废', xg: true }])">作废</el-button>
        <el-button type="success" size="mini" :disabled="disabled" @click="PVisible = true">多码多价录入</el-button>
        <el-dropdown v-if="$permission([{ mc: '产品盘点', xg: true }])" style="margin:0 15px;">
            <el-button type="primary" size="mini" :disabled="disabled">
                引用单据<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="quoteDh('order')" size="mini">销售订单</el-dropdown-item>
                <el-dropdown-item @click.native="quoteDh('shipments')" size="mini">销售发货</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <el-button type="success" size="mini" @click="showInventory = !showInventory">{{showInventory?'隐藏':'显示'}}库存信息</el-button>
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
                    name="ProductSalesBillingTitle"
                    :columns.sync="columnsTitle"
                    :disabled="disabled" />
            </div>
        </div>
    </div>
    <div class="InventoryContentBox">
        <div class="InventoryContent">
            <content-table ref="contentTable" :columns.sync="contentColumn" name="ProductSalesBillingContentTable" v-show="tabIndex === '添加列表'">
                <template #a>
                    <edit-table
                        ref="editTable"
                        name="ProductSalesBillingLeft"
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
                        name="ProductSalesBillingRight"
                        :columns="[]"
                        :attach-columns="columnsRight"
                        :disabled="disabled || !currentRow_Jl"
                        @data-change="dataChangeMx" />
                </template>
            </content-table>
        </div>
        <InventoryMsg :kh="currentRow_Jl ? currentRow_Jl.kh : ''" v-show="showInventory" />
    </div>
    <div class="billList" v-show="tabIndex === '查询列表'">
        <search-table
            hide-sums
            ref="List"
            api="getProductSalesBilling"
            name="ProductSalesBillingList"
            :columns.sync="columnsList"
            @row-click="rowClickXx"
            @row-dblclick="rowDblclick"></search-table>
    </div>
    <MultipleSizeMultiplePrices :visible.sync="PVisible" @confirm="multipleConfirm" />
    <QuoteProductOrder :visible.sync="visibleQuote.order" @select-end="quoteSelectEnd" :params="params" :attachColumnsFn="attachColumnsFn" />
    <QuoteProductShipments :visible.sync="visibleQuote.shipments" @select-end="quoteSelectEnd" :params="params" :attachColumnsFn="attachColumnsFn" />
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
        add: 'addProductSalesBilling',
        update: 'updateProductSalesBilling',
        getByDh: 'getProductSalesBillingByDh',
        del: 'delProductSalesBilling',
        nullify: 'nullifyProductSalesBilling',
        examine: 'examineProductSalesBilling'
      },
      params: {
        khbh: ''
      },
      visibleQuote: {
        order: false,
        shipments: false
      },
      showInventory: false
    }
  },
  created () {
  },
  methods: {
    quoteDh (key) {
      this.$refs.autoForm.submitForm().then((res) => {
        if ('ghsbh' in res) this.params.ghsbh = res.ghsbh
        if ('khbh' in res) this.params.khbh = res.khbh
        this.params.ids = this.$refs.editTable
          .submitTable()
          .filter((it) => it.yyid)
          .map((it) => it.yyid)
          .join(',')
        this.visibleQuote[key] = true
      })
    }
  }
}
</script>

<style lang="scss">
</style>
