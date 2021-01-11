<template>
  <div class="page">
    <div class="treeContent">
      <div class="treeContentLeft treeContentLeft-shadow">
        <DepartmentTree ref="tree" />
      </div>
      <div class="page page-nop">
        <div class="page-RowContent">
          <div class="page-RowContent-item" data-left>
            <search-table
              v-if="!flag"
              small
              span-method
              key="table1"
              ref="searchTable"
              name="WagesAnalysisStatisticsTable"
              :sourceData="tableData"
              :columns.sync="columnsXx"
              :sourceCount="count"
              @row-dblclick="rowDblclick"
              @send-change="sendChange"
            />
            <search-table
              v-if="flag"
              small
              span-method
              key="table2"
              ref="searchTable"
              name="WagesAnalysisStatisticsTable2"
              :sourceData="tableData"
              :columns.sync="columnsXx2"
              :sourceCount="count"
              @row-dblclick="rowDblclick"
              @send-change="sendChange"
            />
          </div>
          <div
            class="page-RowContent-item"
            data-search
            data-hover
          >
            <auto-form
              class="searchForm-column"
              ref="autoForm"
              :formItems="formItems"
              @date-change="dateChange"
              label-position="top"
            />
            <MonthRange @change="monthRangeHandle" ref="MonthRange" :default-month="1"/>
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
    </div>
  </div>
</template>

<script type="text/javascript">
import { columnsXx, columnsXx2 } from './columns'
import { formItems } from './formItems'
import {
  statistics,
  excel_statistics,
  statistics_salary
} from '@/common/mixins'
export default {
  mixins: [statistics, excel_statistics, statistics_salary],
  data () {
    return {
      columnsXx,
      columnsXx2,
      formItems,
      api: 'getWagesAnalysis',
      attach: {
        range: {}
      },
      flag: false,
      /* groupKey: ['ygmc', 'yggh'],
      mergeColumns: ['ygmc', 'yggh'], */
      hideMount: true
    }
  },
  watch: {
    flag () {
      this.request()
    }
  },
  methods: {
    monthRangeHandle (r) {
      this.attach.range = r
      if (r.s === 1 && r.e === 12) {
        this.flag = true
      } else {
        this.columnsXx.forEach(c => {
          if (c.prop === 'sygz') {
            c.label = r.s + '月工资'
          } else if (c.prop === 'bygz') {
            c.label = r.e + '月工资'
          }
        })
        this.flag = false
      }
    }
  }
}
</script>
<style lang="scss">
</style>
