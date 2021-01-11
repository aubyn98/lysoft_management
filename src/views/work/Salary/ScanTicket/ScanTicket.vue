<template>
  <div class="page">
    <div class="page-RowContent">
      <div
        class="page-RowContent-item"
        data-left
        v-show="tabIndex === '交货登记'"
      >
        <div style="height: 100%">
          <search-table
            small
            hide-search
            key="jhdjTable"
            ref="searchTable2"
            name="ScanTicketTableTopDj"
            :sourceData="tableData2"
            :columns.sync="columnsDjTop"
            :sourceCount="count2"
            @send-change="sendChange2"
          />
        </div>
        <!-- <div style="height: 50%">
          <search-table
            small
            key="jhdjForm"
            ref="searchTableBottom"
            name="ScanTicketTableBottomJg"
            :sourceData="tableDataMx"
            :columns.sync="columnsJgBottom"
            @row-dblclick="rowDblclickMx"
            @send-change="sendChangeMx"
          />
        </div> -->
      </div>
      <div
        class="page-RowContent-item"
        data-left
        v-show="tabIndex === '交货查询'"
      >
        <div style="height: 100%">
          <search-table
            small
            key="jhcxTable"
            ref="searchTable"
            name="ScanTicketTableTopCx"
            :sourceData="tableData"
            :columns.sync="columnsXx"
            :sourceCount="count"
            @row-dblclick="rowDblclick"
            @send-change="sendChange"
          />
        </div>
        <!-- <div style="height: 50%">
          <search-table
            small
            key="jhcxForm"
            ref="searchTableBottom"
            name="ScanTicketTableBottomCg"
            :sourceData="tableDataMx"
            :columns.sync="columnsCgBottom"
            @row-dblclick="rowDblclickMx"
            @send-change="sendChangeMx"
          />
        </div> -->
      </div>
      <div class="page-RowContent-item" data-search data-hover>
        <tabs-mini :tabIndex.sync="tabIndex" :tabs="['交货登记', '交货查询']" />
        <auto-form
          v-show="tabIndex === '交货登记'"
          key="jhdj"
          class="searchForm-column"
          ref="autoForm2"
          :formItems="formItemsDj"
          :includeKeys="['ygmc']"
          label-position="top"
          @date-change="dateChange"
        />
        <auto-form
          v-show="tabIndex === '交货查询'"
          key="jhcx"
          class="searchForm-column"
          ref="autoForm"
          :formItems="formItemsCx"
          label-position="top"
        />
        <div v-show="tabIndex === '交货查询'">
          <div class="StatisticRightSearchCheckBox">
            <el-checkbox v-model="attach.lhjl" style="margin-right: 0"
              >查询领货记录</el-checkbox
            >
            <el-checkbox v-model="attach.rksj">仅查询入库数据</el-checkbox>
          </div>
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
        <div v-show="tabIndex === '交货登记'">
          <!-- <el-button
            type="primary"
            size="mini"
            class="search-form-btn"
            @click="request2"
            >查询</el-button
          > -->
          <el-button
            type="primary"
            size="mini"
            class="search-form-btn"
            @click="request"
            >打印权限卡</el-button
          >
          <el-button
            type="primary"
            size="mini"
            class="search-form-btn"
            @click="request2"
            >保存</el-button
          >
          <el-button type="primary" size="mini" class="search-form-btn" @click="clearHandle"
            >清空</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import { statistics, excel_statistics } from '@/common/mixins'
import { columnsDjTop, columnsCxTop as columnsXx } from './columns'
import { formItemsDj, formItemsCx } from './formItems'
export default {
  mixins: [statistics, excel_statistics, statistics],
  data () {
    return {
      columnsDjTop,
      formItemsDj,
      columnsXx,
      formItemsCx,
      tabIndex: '交货登记',
      api: 'getScanTicketQuery',
      count2: 0,
      tableData2: [],
      attach: {
        lhjl: false,
        rksj: false
      },
      hideMount: true
    }
  },
  /*   watch: {
    tabIndex (val) {
      if (val === '交货查询') {
        this.api = 'getScanTicketRegister'
        this.initAllTableData()
      } else if (val === '交货登记') {
        this.api = 'getScanTicketQuery'
        this.initAllTableData()
      }
      this.$nextTick(() => {
        this.initSearchMsg().then(() => {
          this.request()
        })
      })
    }
  }, */
  methods: {
    clearHandle () {
      this.$refs.autoForm2.initForm()
      this.tableData2 = []
    },
    dateChange () {
      this.$prompt('请输入密码', '验证', {
        inputType: 'password',
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /.+/,
        inputErrorMessage: '请输入密码',
        closeOnClickModal: false
      }).then(({ value }) => {
        this.$api.validateAuth({ mm: value }).then(res => {

        }).catch(e => {
          this.$refs.autoForm2.setFieldsValue({ jhrq: this.$format.getDate(new Date()) })
        })
      }).catch(e => {

      })
    },
    initAllTableData () {},
    save () {},
    request2 () {
      this.$refs.autoForm2.submitForm().then(form => {
        if (!form.yggh) return this.$alert('请输入员工工号！')
        if (!form.tmbh) return this.$alert('请输入卡号！')
        this.$api
          .scanTicket({
            ...form/* ,
            columns: this.$refs.searchTable2.getMsg() */
          })
          .then(data => {
            this.count2 = data.count
            this.tableData2 = data.res
            this.$refs.searchTable2.setSums(data)
          })
      })
    },
    sendChange2 () {
      this.request2()
    }
  }
}
</script>
<style lang="scss">
</style>
