<template>
  <div class="page">
    <div class="treeContent">
      <div class="treeContentLeft treeContentLeft-shadow">
          <DepartmentTree ref="tree" :params="{  gzlx: '计件工资' }"/>
      </div>
      <div class="page page-nop">
        <div class="page-RowContent">
          <div class="page-RowContent-item" data-left>
            <search-table
              small
              span-method
              ref="searchTable"
              name="PieceWageStatisticsTable"
              :sourceData="tableData"
              :columns.sync="columnsXx"
              :sourceCount="count"
              :merge-columns="mergeColumns"
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
            <PressureMode v-model="attach.pressure" ref="PressureMode"/>
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
import { columnsXx } from './columns'
import { formItems } from './formItems'
import { statistics, excel_statistics, statistics_salary } from '@/common/mixins'
export default {
  mixins: [statistics, excel_statistics, statistics_salary],
  data () {
    return {
      columnsXx,
      formItems,
      api: 'getPieceWage',
      attach: {
        pressure: '默认'
      },
      groupKey: ['ygmc', 'yggh'],
      mergeColumns: ['ygmc', 'yggh']
    }
  },
  computed: {
  },
  methods: {
    searchMsgHandle () {}
  }
}
</script>
<style lang="scss">
</style>
