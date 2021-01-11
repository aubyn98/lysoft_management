<template>
  <div class="page">
    <div class="treeContent">
      <transition name="zoom">
        <div class="treeContentLeft treeContentLeft-shadow" v-show="treeFlag">
          <DepartmentTree
            ref="tree"
            :params="{ sfzz: '是', gzlx: '计月工资' }"
          />
        </div>
      </transition>
      <div class="page page-nop">
        <div class="page-RowContent">
          <div class="page-RowContent-item" data-left>
            <search-table
              small
              span-method
              ref="searchTable"
              name="MonthlyHistoryStatisticsTable"
              :sourceData="tableData"
              :columns.sync="columnsXx"
              :sourceCount="count"
              @row-dblclick="rowDblclick"
              @send-change="sendChange"
            />
              <!-- :merge-columns="mergeColumns" -->
          </div>
          <div class="page-RowContent-item" data-search data-hover>
            <auto-form
              class="searchForm-column"
              ref="autoForm"
              :formItems="formItems"
              label-position="top"
              @checkbox-change="checkboxchange"
            />
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
import { statistics, excel_statistics, statistics_salary } from '@/common/mixins'
import { columnsXx } from './columns'
import formItems from './formItems'
export default {
  mixins: [statistics, excel_statistics, statistics_salary],
  data () {
    return {
      columnsXx,
      formItems,
      jumpTab: 'MonthlyHistory',
      api: 'getMonthlyHistory',
      attach: {} /* ,
      groupKey: ['dh', 'ghsmc', 'rq', 'wlbh', 'wlmc'],
      mergeColumns: [
        'dh',
        'ghsmc',
        'rq',
        'wlbh',
        'wlmc',
        'tmbh',
        'dw',
        'lb',
        'lx',
        'wlbm'
      ] */
    }
  },
  methods: {}
}
</script>
<style lang="scss"></style>
