<template>
  <div class="page">
    <header-btn
      border
      @change="editChange"
      :hide-edit="!$permission([{ mc: '产品调拨', xg: true }])"
      :hide-change="currentRow && currentRow.sh"
      :activeIndex="activeIndex"
      :defaultTab.sync="tabIndex"
      :tabs="['添加列表', '查询列表']"
    >
      <el-button type="info" size="mini" :disabled="!disabled || !currentRow" @click="handleExamine(currentRow)" v-if="$permission([{ mc: '产品调拨', xg: true }])">{{currentRow && currentRow.sh ? '反审核' : '审核'}}</el-button>
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
          @icon-click="fromIconClick"
        />
      </div>
      <div class="billTitle-right" style="left: 880px">
        <div class="billTitle-right-table" style="width:340px">
          <edit-table
            hide-num
            hide-sums
            hide-context
            header-bg
            ref="editTable2"
            name="ProductAllotTitle"
            :columns.sync="columnsTitle"
            :disabled="disabled"
          />
        </div>
      </div>
    </div>
    <content-table
      ref="contentTable"
      :columns.sync="contentColumn"
      name="ProductAllotContentTable"
      v-show="tabIndex === '添加列表'"
    >
      <template #a>
        <edit-table
          ref="editTable"
          name="ProductAllotLeft"
          :columns.sync="columnsLeft"
          :disabled="disabled"
          :includeKeys="['msC','mx']"
          @autocomplete-select="editAutocompleteSelect"
          @data-change="dataChange"
          @row-click="rowClick_edit_left"
        />
      </template>
      <template #b>
        <edit-table
          ref="editTable3"
          name="ProductAllotRight"
          :columns="[]"
          :attach-columns="columnsRight"
          :disabled="disabled || !currentRow_Jl"
          @data-change="dataChangeMx"
        />
      </template>
    </content-table>
    <div class="billList" v-show="tabIndex === '查询列表'">
      <search-table
        hide-sums
        ref="List"
        api="getProductAllot"
        name="ProductAllotList"
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
  // columnsRight,
  columnsTitle,
  columnsList
} from './columns'
import formItems from './formItems'
import { bill, billMx, productBill, formIconClick, product_vendor } from '@/common/mixins'
export default {
  mixins: [bill, billMx, productBill, formIconClick, product_vendor],
  data () {
    return {
      formItems,
      columnsLeft,
      columnsRight: [],
      columnsTitle,
      columnsList,
      api: {
        add: 'addProductAllot',
        update: 'updateProductAllot',
        getByDh: 'getProductAllotByDh',
        del: 'delProductAllot',
        examine: 'examineProductAllot'
      },
      autocompleteApi: {
        ghsmc: 'getProductAllotCustomer'
      }
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
