<template>
  <div class="page">
    <header-btn
      border
      @change="editChange"
      :hide-change="currentRow && currentRow.sh"
      :hide-edit="!$permission([{ mc: '物料退货', xg: true }])"
      :activeIndex="activeIndex"
      :defaultTab.sync="tabIndex"
      :tabs="['添加列表', '查询列表']"
    >
      <el-button
        type="info"
        size="mini"
        v-if="$permission([{ mc: '物料退货审核与作废', xg: true }])"
        :disabled="!disabled || !currentRow || currentRow.sh"
        @click="handleExamine"
        >审核</el-button
      >
      <el-button
        type="info"
        size="mini"
        v-if="$permission([{ mc: '物料退货审核与作废', xg: true }])"
        :disabled="!disabled || !currentRow || currentRow.ch || !currentRow.sh"
        @click="handleNullify"
        >作废</el-button
      >
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
      <div class="billTitle-right" style="left: 700px">
        <div class="billTitle-right-table">
          <edit-table
            hide-num
            hide-sums
            hide-context
            header-bg
            ref="editTable2"
            name="MaterialReturnTitle"
            :columns.sync="columnsTitle"
            :disabled="disabled"
          />
        </div>
      </div>
    </div>
    <edit-table
      v-show="tabIndex === '添加列表'"
      ref="editTable"
      name="MaterialReturn"
      :columns.sync="columnsXx"
      :disabled="disabled"
      @data-change="dataChange"
    />
    <div class="billList">
      <search-table
        v-if="tabIndex === '查询列表'"
        hide-sums
        ref="List"
        api="getMaterialReturn"
        name="MaterialReturnList"
        :columns.sync="columnsList"
        @row-click="rowClickXx"
        @row-dblclick="rowDblclick"
      ></search-table>
    </div>
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
  </div>
</template>

<script type="text/javascript">
import { bill, formIconClick, material_vendor, materialSubmit } from '@/common/mixins'
import { columnsXx, columnsTitle, columnsList } from './columns'
import formItems from './formItems'
export default {
  mixins: [bill, formIconClick, material_vendor, materialSubmit],
  data () {
    return {
      formItems,
      columnsXx,
      columnsTitle,
      columnsList,
      api: {
        add: 'addMaterialReturn',
        update: 'updateMaterialReturn',
        getByDh: 'getMaterialReturnByDh',
        del: 'delMaterialReturn',
        nullify: 'nullifyMaterialReturn',
        examine: 'examineMaterialReturn'
      },
      autocompleteApi: {
        ghsmc: 'getMaterialEnterStoreVendor'
      }
    }
  },
  mounted () {},
  methods: {
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
