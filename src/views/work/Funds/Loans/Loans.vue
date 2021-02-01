<template>
<div class="page">
    <header-btn border :hide-edit="!$permission([{ mc: '支款登记', xg: true }])" :hide-change="currentRow && currentRow.zt === '结算'" @change="editChange" :activeIndex="activeIndex">
        <!-- <el-button type="success" size="mini" @click="request">刷新</el-button> -->
        <el-button type="primary" size="mini" @click="exportExcel">导出</el-button>
        <exportExcel ref="exportExcel" :msg="excelData" :format="excelFormat" style="display: none" />
    </header-btn>
    <div class="billTitle">
        <div class="billTitle-left">
            <auto-form
                ref="autoForm"
                :disabled="disabled"
                style="width: 100%"
                :formItems="formItems"
                @icon-click="fromIconClick"
                :includeKeys="['id']" />
        </div>
        <div class="billTitle-right" style="left: 1050px;">
            <div class="billTitle-right-table" style="width: 240px">
                <edit-table
                    hideNum
                    hide-sums
                    hideContext
                    headerBg
                    ref="editTable2"
                    name="LoansTitle"
                    :columns.sync="columnsTitle"
                    :disabled="disabled" />
            </div>
        </div>
    </div>
    <div style="flex: 1; height: 0">
        <innerStatistic
            name="LoansList"
            api="getLoans"
            ref="statistic"
            @row-click="rowclick"
            :columns.sync="columnsList"
            :formItems="formItemsList" />
    </div>
    <el-dialog :visible="visible" title="添加利息明细" @close="visible = false" :close-on-click-modal="false">
        <header-btn hideEdit>
            <el-button :type="editDetail ? 'success' : 'primary'" size="mini" @click="editDetail ? saveDetail() : (editDetail = !editDetail)">{{ editDetail ? "保存" : "修改" }}</el-button>
            <el-button type="warning" size="mini" @click="cancelDetail" v-if="editDetail">撤销</el-button>
        </header-btn>
        <div style="height:500px">
            <edit-table hide-sums :disabled="!editDetail" ref="editTableDetail" name="LoansDetail" :columns.sync="columnsDetail" />
        </div>
    </el-dialog>
</div>
</template>

<script type="text/javascript">
import { bill, billOnlyForm, excel, formIconClick } from '@/common/mixins'
import { columnsTitle, columnsList, columnsDetail } from './columns'
import { formItems, formItemsList } from './formItems'
export default {
  mixins: [bill, billOnlyForm, formIconClick, excel],
  data () {
    return {
      formItems,
      columnsTitle,
      formItemsList,
      columnsDetail,
      columnsList,
      api: {
        add: 'addLoans',
        update: 'updateLoans',
        getByDh: 'getLoansByDh',
        del: 'delLoans'
      },
      excelApi: 'getLoans',
      visible: false,
      editDetail: false
    }
  },
  methods: {
    getData () {
      return new Promise(resolve => {
        this.$refs.autoForm.submitForm().then(res => {
          const titleTableData = this.$refs.editTable2.submitTable()[0]
          const sendData = { ...res, ...titleTableData, tableData: this.currentRow.tableData }
          resolve(sendData)
        })
      })
    },
    saveDetail () {
      this.editDetail = false
      this.currentRow.tableData = this.$refs.editTableDetail.submitTable()
    },
    cancelDetail () {
      this.editDetail = false
      this.$refs.editTableDetail.initTableData(this.sendList, null)
    },
    submitEnd (msg, type) {
      this.currentRow = msg
      this.$refs.autoForm.initForm(msg)
      this.request()
    },
    fromIconClick (prop) {
      if (this.disabled) return
      if (prop === 'lx') {
        this.visible = true
        this.$nextTick(() => {
          this.$refs.editTableDetail.initTableData(this.sendList, null)
        })
      }
    }
  },
  computed: {
    sendList () {
      return this.currentRow && this.currentRow.tableData ? this.currentRow.tableData.filter(r => r.rq && r.xmmc) : []
    }
  }
}
</script>

<style lang="scss">
</style>
