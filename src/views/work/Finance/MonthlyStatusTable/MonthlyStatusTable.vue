<template>
  <div class="page">
    <div class="page-RowContent">
      <div class="page-RowContent-item" data-left>
        <search-table
          v-show="tabIndex === '客户'"
          small
          key="kh"
          span-method
          ref="searchTable1"
          name="MonthlyStatusTableKh"
          :sourceData="tableData1"
          :columns.sync="columnsKh"
          :sourceCount="count1"
          :merge-columns="mergeColumns"
          @row-dblclick="rowDblclick"
          @send-change="sendChange"
          @cell-dblclick="cellDblclick"
        />
        <search-table
          v-show="tabIndex === '加工商'"
          small
          key="jgs"
          span-method
          ref="searchTable2"
          name="MonthlyStatusTableJgs"
          :sourceData="tableData2"
          :columns.sync="columnsJgs"
          :sourceCount="count2"
          :merge-columns="mergeColumns"
          @row-dblclick="rowDblclick"
          @send-change="sendChange"
        />
        <search-table
          v-show="tabIndex === '供货商'"
          small
          key="ghs"
          span-method
          ref="searchTable3"
          name="MonthlyStatusTableGhs"
          :sourceData="tableData3"
          :columns.sync="columnsGhs"
          :sourceCount="count3"
          :merge-columns="mergeColumns"
          @row-dblclick="rowDblclick"
          @send-change="sendChange"
        />
      </div>
      <div
        class="page-RowContent-item"
        style="width: 150px; align-items: center"
        data-hover
      >
        <tabs-mini :tabIndex.sync="tabIndex" :tabs="tabs" @change="tabChange" />
        <auto-form
          class="searchForm"
          ref="autoForm1"
          key="khForm"
          style="width: 100%; justify-content: center; padding-left: 6px"
          :formItems="formItemsKh"
          v-show="tabIndex === '客户'"
          label-position="top"
        />
        <auto-form
          class="searchForm"
          ref="autoForm3"
          key="ghsForm"
          style="width: 100%; justify-content: center; padding-left: 6px"
          :formItems="formItemsGhs"
          v-show="tabIndex === '供货商'"
          label-position="top"
        />
        <auto-form
          class="searchForm"
          ref="autoForm2"
          key="jgsForm"
          style="width: 100%; justify-content: center; padding-left: 6px"
          :formItems="formItemsJgs"
          v-show="tabIndex === '加工商'"
          label-position="top"
        />
        <el-checkbox v-model="attach.ycjq">隐藏本月结欠等于0</el-checkbox>
        <el-button
          type="primary"
          size="mini"
          class="search-form-btn"
          @click="request"
          >查询</el-button
        >
        <el-button type="primary" size="mini" class="search-form-btn"
          >打印</el-button
        >
        <el-button
          type="primary"
          size="mini"
          class="search-form-btn"
          @click="exportExcel"
          >导出</el-button
        >
        <exportExcel
          ref="exportExcel"
          :msg="excelData"
          :format="excelFormat"
          style="display: none"
        />
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import { statistics } from '@/common/mixins'
import { columnsKh, columnsGhs, columnsJgs } from './columns'
import { formItemsKh, formItemsJgs, formItemsGhs } from './formItems'
export default {
  mixins: [statistics],
  data () {
    return {
      columnsKh,
      columnsGhs,
      columnsJgs,
      formItemsKh,
      formItemsJgs,
      formItemsGhs,
      tabIndex: '客户',
      count1: 0,
      count2: 0,
      count3: 0,
      tableData1: [],
      tableData2: [],
      tableData3: [],
      api: 'getMonthlyStatusTable',
      attach: {
        ycjq: false,
        lx: '客户'
      },
      groupKey: ['dh', 'khmc'],
      mergeColumns: ['khmc', 'rq', 'dh', 'lsdh', 'wlbh', 'wlmc', 'lx', 'dw'],
      tabs: [],
      // excel 表格导出相关
      excelData: []
    }
  },
  created () {
    this.$permission([{ mc: '月状况表_客户', ll: true }]) && this.tabs.push('客户')
    this.$permission([{ mc: '月状况表_供货商', ll: true }]) && this.tabs.push('供货商')
    this.$permission([{ mc: '月状况表_加工商', ll: true }]) && this.tabs.push('加工商')
  },
  computed: {
    excelFormat () {
      if (this.tabIndex === '客户') return this.c2eFormat(columnsKh)
      if (this.tabIndex === '供货商') return this.c2eFormat(columnsGhs)
      if (this.tabIndex === '加工商') return this.c2eFormat(columnsJgs)
      return this.c2eFormat(columnsKh)
    },
    refIndex () {
      return this.tabIndex === '客户' ? 1 : this.tabIndex === '加工商' ? 2 : 3
    }
  },
  methods: {
    exportExcel () {
      this.$refs['autoForm' + this.refIndex].submitForm().then(form => {
        this.$api.getMonthlyStatusTable({ ...form, ...this.attach }).then(({ res }) => {
          this.excelData = res
          this.$nextTick(() => {
            this.$refs.exportExcel.exportData()
          })
        })
      })
    },
    cellDblclick (row, { property }) {
      console.log(row, property)
    },
    rowDblclick (r, c, e) {
    },
    request (flag = true) {
      flag && this.clearTableHeader(flag)
      this.getSearchMsg().then(() => {
        const msg = { ...this.searchMsg, columns: { ...this.searchMsg.columns } }
        this.searchMsgHandle(msg)
        this.$api[this.api](msg)
          .then((data) => {
            this.groupKey && this.countMerge(data.res)
            this['count' + this.refIndex] = data.count
            this.requestHandle && this.requestHandle(data)
            this['tableData' + this.refIndex] = data.res
            this.$refs['searchTable' + this.refIndex].setSums(data)
          })
      })
    },
    getSearchMsg () {
      return new Promise((resolve) => {
        this.$refs['autoForm' + this.refIndex].submitForm().then((res) => {
          this.searchMsg = {
            ...res,
            ...this.attach,
            columns: this.$refs['searchTable' + this.refIndex].getMsg(),
            ...this.$refs['searchTable' + this.refIndex].getSort()
          }
          resolve(this.searchMsg)
        })
      })
    },
    clearTableHeader (flag) {
      this.$refs.searchTable1.initMsg(flag)
      this.$refs.searchTable2.initMsg(flag)
      this.$refs.searchTable3.initMsg(flag)
    },
    // 初始化搜索条件
    initSearchMsg () {
      return new Promise(resolve => {
        this.clearTableHeader()
        this.getSearchMsg().then((res) => {
          this.searchMsg.ksrq = this.$format.getDate(
            new Date(new Date().getTime() - 2592000000)
          )
          this.searchMsg.jsrq = this.$format.getDate(new Date())
          this.$refs.autoForm1.initForm(this.searchMsg)
          this.$refs.autoForm2.initForm(this.searchMsg)
          this.$refs.autoForm3.initForm(this.searchMsg)
          resolve(this.searchMsg)
        })
      })
    },
    tabChange (tab) {
      this.attach.lx = tab
    },
    searchMsgHandle () {
      this.searchMsg.lx === '客户' && (this.searchMsg.mc = this.searchMsg.khmc)
      this.searchMsg.lx === '加工商' && (this.searchMsg.mc = this.searchMsg.jgs)
      this.searchMsg.lx === '供货商' && (this.searchMsg.mc = this.searchMsg.ghs)
    }
  }
}
</script>
<style lang="scss">
.searchForm {
  .el-form-item {
    height: 56px;
    margin-bottom: 0px;
  }
  .el-form-item__label {
    padding: 0;
  }
}
</style>
