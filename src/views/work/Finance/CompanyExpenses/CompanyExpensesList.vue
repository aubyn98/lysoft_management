<template>
  <div class="page" style="padding:0">
    <div class="page-RowContent">
      <div class="page-RowContent-item" data-left>
        <search-table
          small
          span-method
          ref="searchTable"
          name="CompanyExpensesList"
          :sourceData="tableData"
          :columns.sync="columnsXx"
          :sourceCount="count"
          @row-click="rowClick"
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
          label-position="top"
        />
        <el-checkbox v-model="attach.zf">不显示作废</el-checkbox>
        <el-button
          type="primary"
          size="mini"
          class="search-form-btn"
          @click="request"
          >查询</el-button
        >
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import { statistics } from '@/common/mixins'
import { columnsList as columnsXx } from './columns'
import { formItemsList as formItems } from './formItems'
export default {
  mixins: [statistics],
  data () {
    return {
      columnsXx,
      api: 'getCompanyExpensesList',
      attach: {
        zf: false
      },
      tableData: [],
      formItems
    }
  },
  created () {
  },
  methods: {
    searchMsgHandle () {},
    rowDblclick (...agrv) {
      this.$emit('row-dblclick', ...agrv)
    },
    rowClick (...agrv) {
      this.$emit('row-click', ...agrv)
    }
  }
}
</script>
<style lang="scss">

</style>
