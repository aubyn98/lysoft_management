<template>
  <div class="page">
    <header-btn
      border
      :hide-edit="!$permission([{ mc: '物料盘点', xg: true }])"
      :hide-change="currentRow && currentRow.sh"
      @change="editChange"
      :activeIndex="activeIndex"
      :defaultTab.sync="tabIndex"
      :tabs="['添加列表', '查询列表']"
    >
      <el-button
        type="info"
        size="mini"
        :disabled="!disabled"
        @click="handleExamine"
        v-if="$permission([{ mc: '物料盘点_反审核', xg: true }])"
        >{{ currentRow && currentRow.sh ? "反审核" : "审核" }}</el-button
      >
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
        <div class="billTitle-right-table" style="width: 340px">
          <edit-table
            hideNum
            hide-sums
            hideContext
            headerBg
            ref="editTable2"
            name="MaterialCheckTitle"
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
      name="MaterialCheck"
      :columns.sync="columnsXx"
      :disabled="disabled"
    />
    <div class="billList">
      <search-table
        v-if="tabIndex === '查询列表'"
        hide-sums
        ref="List"
        api="getMaterialCheck"
        name="MaterialCheckList"
        :columns.sync="columnsList"
        @row-click="rowClickXx"
        @row-dblclick="rowDblclick"
      ></search-table>
    </div>
    <div v-for="item in subRecords" :key="item.prop">
      <component
        append-to-body
        :sub="item.prop === 'ckmc' ? ['ckmc'] : []"
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
import { bill, formIconClick } from '@/common/mixins'
import { columnsXx, columnsTitle, columnsList } from './columns'
import formItems from './formItems'
export default {
  mixins: [bill, formIconClick],
  data () {
    return {
      formItems,
      columnsXx,
      columnsTitle,
      columnsList,
      api: {
        add: 'addMaterialCheck',
        update: 'updateMaterialCheck',
        getByDh: 'getMaterialCheckByDh',
        del: 'delMaterialCheck',
        examine: 'examineMaterialCheck'
      },
      subRecords: [
        {
          prop: 'ckmc',
          visible: false,
          component: 'Store'
        }
      ]
    }
  },
  methods: {
    submitEnd ({ tableData, ...msg }, type) {
      this.currentRow = {
        tableData,
        ...msg,
        sh: type === 'add' ? false : !this.currentRow ? false : !!this.currentRow.sh
      }
      this.initData(msg, [msg], tableData, false)
    },
    handleSubmit (msg) {
      if (!msg.ckmc) {
        this.$message.info('仓库名称不能为空！')
        return false
      }
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
    }
  }
}
</script>
<style lang="scss">
</style>
