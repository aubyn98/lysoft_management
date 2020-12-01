<template>
  <div class="page">
    <header-btn
      border
      @change="editChange"
      :hide-change="currentRow && currentRow.sh"
      :hide-edit="!$permission([{ mc: '物料入库', xg: true }])"
      :activeIndex="activeIndex"
      :defaultTab.sync="tabIndex"
      :tabs="['添加列表', '查询列表']"
    >
      <el-button
        type="info"
        size="mini"
        :disabled="!disabled || !currentRow || currentRow.sh"
        @click="handleExamine"
        v-if="$permission([{ mc: '物料入库审核与作废', xg: true }])"
        >审核</el-button
      >
      <el-button
        type="info"
        size="mini"
        :disabled="!disabled || !currentRow || currentRow.ch || !currentRow.sh"
        @click="handleNullify"
        v-if="$permission([{ mc: '物料入库审核与作废', xg: true }])"
        >作废</el-button
      >
      <el-button
        type="info"
        size="mini"
        :disabled="disabled"
        @click="quoteDh"
        v-if="$permission([{ mc: '物料入库', xg: true }])"
        >引用单号</el-button
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
      <div class="billTitle-right" style="left: 800px">
        <div class="billTitle-right-table">
          <edit-table
            hide-num
            hide-sums
            hide-context
            header-bg
            ref="editTable2"
            name="MaterialEnterStoreTitle"
            :columns.sync="columnsTitle"
            :disabled="disabled"
          />
        </div>
      </div>
    </div>
    <edit-table
      v-show="tabIndex === '添加列表'"
      ref="editTable"
      selection
      name="MaterialEnterStoreLeft"
      :columns.sync="columnsLeft"
      :disabled="disabled"
      :includeKeys="['id', 'yyid']"
      @data-change="dataChange"
    />
    <div class="billList">
      <search-table
        v-if="tabIndex === '查询列表'"
        hide-sums
        ref="List"
        api="getMaterialEnterStore"
        name="MaterialEnterStoreList"
        :columns.sync="columnsList"
        @row-click="rowClickXx"
        @row-dblclick="rowDblclick"
      ></search-table>
    </div>
    <QuoteMaterialPurchase
      :visible.sync="visible"
      @select-end="quoteSelectEnd"
      :params="params"
    />
    <div v-for="item in subRecords" :key="item.prop">
      <component
        append-to-body
        :sub="item.prop === 'ghsmc' ? ['ghsmc', 'ghsbh'] : []"
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
    <!-- <content-table
      :columns.sync="contentColumn"
      name="MaterialEnterStoreContentTable"
    >
      <template #a>
        <edit-table
          ref="editTable"
          name="MaterialEnterStoreLeft"
          :columns.sync="columnsLeft"
          :disabled="disabled"
        />
      </template>
      <template #b>
        <edit-table
          ref="editTable"
          name="MaterialEnterStoreRight"
          :columns.sync="columnsLeft"
          :disabled="disabled"
        />
      </template>
    </content-table> -->
  </div>
</template>

<script type="text/javascript">
import { bill, formIconClick, material_vendor, materialSubmit } from '@/common/mixins'
import {
  columnsLeft,
  columnsRight,
  columnsTitle,
  columnsList
} from './columns'
import formItems from './formItems'
export default {
  mixins: [bill, formIconClick, material_vendor, materialSubmit],
  data () {
    return {
      formItems,
      columnsLeft,
      columnsRight,
      columnsTitle,
      columnsList,
      visible: false,
      api: {
        add: 'addMaterialEnterStore',
        update: 'updateMaterialEnterStore',
        getByDh: 'getMaterialEnterStoreByDh',
        del: 'delMaterialEnterStore',
        nullify: 'nullifyMaterialEnterStore',
        examine: 'examineMaterialEnterStore'
      },
      autocompleteApi: {
        ghsmc: 'getMaterialEnterStoreVendor'
      },
      selection: [],
      params: {
        ghsbh: ''
      }
    }
  },
  methods: {
    quoteDh () {
      this.$refs.autoForm.submitForm().then((res) => {
        if (!res.ghsbh) {
          this.$message.info('请选择供货商！')
        } else {
          this.params.ghsbh = res.ghsbh
          this.params.ids = this.$refs.editTable
            .submitTable()
            .filter((it) => it.yyid)
            .map((it) => it.yyid)
            .join(',')
          this.visible = true
        }
      })
    },
    quoteSelectEnd (selection) {
      this.$refs.editTable.pushRow(
        selection.map((s) => {
          const it = { ...s }
          it.yyid = it.id || ''
          delete it.id
          it.sl = it.wfsl
          return it
        }),
        'unshift'
      )
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
    dataChange (tableData) {
      this.$refs.autoForm.setFieldsValue({
        kdje: tableData.reduce((t, r) => {
          t = this.$math.add(
            this.$math.multiply(parseFloat(r.sl || 0), parseFloat(r.dj || 0)),
            t
          )
          return t
        }, 0)
      })
    }

  }
}
</script>
<style lang="scss">
</style>
