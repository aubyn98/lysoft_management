<template>
<div class="page">
    <header-btn border @change="editChange" hide-edit :activeIndex="activeIndex">
        <div>
            <el-button size="mini" @click="add" type="primary">添加</el-button>
            <el-button size="mini" @click="update" type="warning">修改</el-button>
            <el-button size="mini" @click="visible = true" type="warning">修改报价</el-button>
            <el-button size="mini" @click="del" type="danger">删除款式</el-button>
            <el-button size="mini" @click="get" type="success">刷新</el-button>
        </div>
    </header-btn>
    <el-tabs v-model="tabsIndex" type="card" class="innerTab">
        <el-tab-pane v-for="item in editableTabs" :key="item.key" :label="item.label" :name="item.key">
            <div class="page-RowContent" style="padding:0;height:100%;">
                <div style="width:240px">
                    <search-table
                        small
                        span-method
                        :selection="item.selection"
                        :ref="'searchTable_'+item.key"
                        :name="'ProductOfferLeft_'+item.key"
                        :api="item.api"
                        :columns.sync="columns['columnsLeft_'+item.key]"
                        @row-click="rowClick(item.key,$event)"
                        @reqEnd="reqEnd(item.key,$event)" />
                </div>
                <search-table
                    small
                    span-method
                    :selection="item.selection"
                    :ref="'searchTable2_'+item.key"
                    :name="'ProductOfferRight_'+item.key"
                    :sourceData="tableDict[item.key].tableData"
                    :columns.sync="columns['columnsRight_'+item.key]"
                    :sourceCount="tableDict[item.key].count"
                    @row-click="rowClick_r(item.key,$event)" />
                <!--  @send-change="sendChange(item.key,$event)" -->
            </div>
            <el-dialog :visible="tableDict[item.key].visible" :title="item.label" @close="closeHandle" class="record_dialog">
                <auto-form :formItems="formItems[item.key]" :ref="'autoForm_' + item.key" v-if="tableDict[item.key].visible" @autocomplete-select="autocompleteSelect"></auto-form>
                <div style="display:flex;">
                    <div style="height:500px;width:50%">
                        <search-table
                            small
                            span-method
                            selection
                            hide-search
                            :ref="'searchTable3_'+item.key"
                            :name="'ProductOfferRight_'+item.key"
                            :sourceData="tableDict[item.key].tableData3"
                            :columns.sync="columns['columnsDialog_'+item.key]"
                            :sourceCount="tableDict[item.key].count3"
                            @selection-change="selectionChange3"
                            @row-click="rowClick_r(item.key,$event)" />
                    </div>
                    <div style="height:500px;width:50%">
                        <edit-table
                            v-if="tableDict[item.key].visible"
                            small
                            span-method
                            hide-sums
                            :includeKeys="['id']"
                            :ref="'editTable_'+item.key"
                            :name="'ProductOfferDialog_'+item.key"
                            :columns.sync="columns['columnsDialog_'+item.key]"
                            :disabled="false"
                            @row-dblclick="rowDblclick(item.key,$event)" />
                    </div>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="closeHandle">取 消</el-button>
                    <el-button type="primary" @click="changeConfirm">确 定</el-button>
                </span>
            </el-dialog>
        </el-tab-pane>
    </el-tabs>
    <el-dialog :visible="visible" title="修改报价" @close="visible = false">
        <p style="color:var(--text-red);">根据所选客户类型，在原有价格增加价格，需要最高权限密码</p>
        <auto-form :formItems="formItems.offer" ref="autoForm" v-if="visible"></auto-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="visible = false">取 消</el-button>
            <el-button type="primary" @click="changeOffer">确 定</el-button>
        </span>
    </el-dialog>
</div>
</template>

<script type="text/javascript">
import * as columns from './columns'
import * as formItems from './formItems'
export default {
  data () {
    return {
      formItems,
      columns,
      edit: 'add',
      tabsIndex: 'xsbj',
      editableTabs: [{
        label: '销售报价',
        key: 'xsbj',
        selection: false,
        api: 'getProductOffer_xsbjkh'
      }, {
        label: '采购报价',
        key: 'cgbj',
        selection: false,
        api: 'getProductOffer_cgbjghs'
      }, {
        label: '加工报价',
        key: 'jgbj',
        selection: false,
        api: 'getProductOffer_jgbjjgs'
      }, {
        label: '未发销售报价',
        key: 'wfxsbj',
        selection: false,
        api: 'getProductOffer_wfxsbjjgs'
      }],
      tableDict: {
        xsbj: { tableData: [], count: 0, attachColumns: [], currentRow: null, currentRow_r: null, visible: false, selection: [], count3: 0, tableData3: [] },
        cgbj: { tableData: [], count: 0, attachColumns: [], currentRow: null, currentRow_r: null, visible: false, selection: [], count3: 0, tableData3: [] },
        jgbj: { tableData: [], count: 0, attachColumns: [], currentRow: null, currentRow_r: null, visible: false, selection: [], count3: 0, tableData3: [] },
        wfxsbj: { tableData: [], count: 0, attachColumns: [], currentRow: null, currentRow_r: null, visible: false, selection: [], count3: 0, tableData3: [] }
      },
      visible: false
    }
  },
  computed: {
    activeIndex () {
      return this.tableDict[this.tabsIndex].currentRow ? 1 : -1
    }

  },
  created () {
  },
  mounted () {

  },
  methods: {
    changeOffer () {
      this.$refs.autoForm.submitForm().then(res => {
        this.$api.updateOffer(res).then(() => {
          this.visible = false
        })
      })
    },
    selectionChange3 (rs) {
      this.$refs['editTable_' + this.tabsIndex][0].initTableData(rs, null)
    },
    del () {
      const currentData = this.tableDict[this.tabsIndex]
      if (!currentData.currentRow || !currentData.currentRow_r) return this.$alert('请先选择要删除的款式！')
      const data = { ...currentData.currentRow, ...currentData.currentRow_r }
      this.$confirm(`是否删除${data.khmc || data.jgsmc || data.ghsmc}的${data.kh}的报价`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api['delProductOffer_' + this.tabsIndex](data).then(res => {
          this.get2()
        })
      })
    },
    reqEnd (key, res) {
      if (res.length && key === this.tabsIndex) {
        const currentData = this.tableDict[this.tabsIndex]
        currentData.currentRow = res[0]
        this.get2()
      }
    },
    get () {
      this.$refs['searchTable_' + this.tabsIndex][0].request().then(({ res }) => {
        if (res.length) {
          const currentData = this.tableDict[this.tabsIndex]
          currentData.currentRow = res[0]
          this.get2()
        }
      })
    },
    get2 () {
      const sendMsg = this.$refs['searchTable2_' + this.tabsIndex][0].getMsg()
      const currentData = this.tableDict[this.tabsIndex]
      this.$api['getProductOffer_' + this.tabsIndex]({ ...currentData.currentRow, ...sendMsg }).then(({ res }) => {
        currentData.tableData = res
        currentData.currentRow_r = null
      }).catch(e => {
        currentData.tableData = []
      })
    },
    closeHandle () {
      this.tableDict[this.tabsIndex].visible = false
    },
    changeConfirm () {
      this.$refs['autoForm_' + this.tabsIndex][0].submitForm().then(res => {
        const tableData = this.$refs['editTable_' + this.tabsIndex][0].submitTable()
        if (!tableData.length) return this.$alert('数据不能为空！')
        this.$api[this.edit + 'ProductOffer_' + this.tabsIndex]({ ...res, tableData }).then(r => {
          this.tableDict[this.tabsIndex].visible = false
        })
      })
    },
    add () {
      this.edit = 'add'
      const currentData = this.tableDict[this.tabsIndex]
      currentData.visible = true
    },
    update () {
      this.edit = 'update'
      const currentData = this.tableDict[this.tabsIndex]
      if (!currentData.currentRow) return this.$alert('请先选择要修改的款式！')
      currentData.visible = true
      this.$nextTick(() => {
        this.$refs['autoForm_' + this.tabsIndex][0].initForm(currentData.currentRow)
        this.tableDict[this.tabsIndex].tableData3 = currentData.tableData
      })
    },
    editChange ({ action, edit, cb }) {
      this[action]()
    },
    rowClick (key, row) {
      const currentData = this.tableDict[this.tabsIndex]
      currentData.currentRow = row
      this.get2()
    },
    rowClick_r (key, row) {
      this.tableDict[this.tabsIndex].currentRow_r = row
    },
    autocompleteSelect ({ form }) {
      if (this.edit === 'update') return
      this.$api['getProductOffer_' + this.tabsIndex + '_kh'](form).then(({ res }) => {
        this.tableDict[this.tabsIndex].tableData3 = res
      })
    }
  }
}
</script>

<style lang="scss">
</style>
