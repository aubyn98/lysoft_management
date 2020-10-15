<template>
  <el-table
    class="contentTable"
    ref="searchTable"
    :data="[{}]"
    border
    @header-dragend="dragend"
    cell-class-name="cell-class-name-content"
    row-class-name="row-class-name-content"
  >
    <el-table-column :width="c.width" v-for="c in columns" :key="c.prop" :prop="c.prop">
        <slot :name="c.prop"></slot>
    </el-table-column>
  </el-table>
</template>

<script type="text/javascript">
import { dragendTable } from '@/common/mixins'
export default {
  mixins: [dragendTable],
  data () {
    return {}
  },
  props: {
    columns: {
      type: Array,
      required: true
    }
  },
  mounted () {
    this.$nextTick(() => {
      const elTable = this.$refs.searchTable.$el
      const wrapper = elTable.children[2]
      elTable.children[1].classList.add('table-content-header')
      wrapper.style.height = 'calc(100% - 10px)'
      wrapper.children[0].classList.add('table-content-table')
      document
        .getElementsByClassName('cell-class-name-content')
        .forEach((td) => {
          td.classList.add('table-content-td')
          td.children[0].classList.add('table-content-cell')
        })
    })
  }
}
</script>
<style lang="scss">
.contentTable {
  .table-content-header {
    height: 10px;
  }
  .table-content-table {
    height: 100%;
  }
  .table-content-td {
    padding: 0 !important;
  }
  .table-content-cell {
    height: 100%;
    padding: 0 2px !important;
  }
  .cell-class-name-content {
    height: 100%;
    padding: 0;
  }
  .row-class-name-content {
    height: 100%;
  }
}
</style>
