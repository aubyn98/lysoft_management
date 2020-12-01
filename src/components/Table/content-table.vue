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
        <!-- <div style="height:100%;width:100%"> -->
          <slot :name="c.prop"></slot>
        <!-- </div> -->
    </el-table-column>
  </el-table>
</template>

<script type="text/javascript">
export default {
  props: {
    columns: {
      type: Array,
      required: true
    },
    name: {
      required: true,
      type: String
    }
  },
  mounted () {
    const columns = JSON.parse(localStorage.getItem(this.name))
    if (columns) {
      this.$emit('update:columns', columns)
      this.$emit('columns-change', columns)
    } else {
      this.setFullScreen()
      window.addEventListener('resize', this.setFullScreen)
    }
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
  },
  destroyed () {
    window.removeEventListener('resize', this.setFullScreen)
  },
  methods: {
    setFullScreen () {
      const width = this.$refs.searchTable.$el.clientWidth
      const newcolumns = this.columns.map((it, i) => {
        const t = { ...it }
        if (i === this.columns.length - 1) {
          t.width = width - this.columns[i - 1].width
        }
        return t
      })
      this.$emit('update:columns', newcolumns)
      this.$emit('columns-change', newcolumns)
    },
    dragend (newWidth, oldWidth, column) {
      const columns = this.$format.copy(this.columns)
      columns.some((c) => {
        if (c.prop === column.property) {
          c.width = newWidth
        }
      })
      this.$emit('update:columns', columns)
      this.$emit('columns-change', columns)
      localStorage.setItem(this.name, JSON.stringify(columns))
      this.doLayout()
    },
    doLayout () {
      this.$nextTick(() => {
        this.$refs.searchTable.doLayout()
      })
    }
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
    height: 100%;
    padding: 0 !important;
     overflow: auto;
  }
  .table-content-cell {
    height:calc(100% - 1px);
    padding: 0 2px !important;
    overflow: auto;
  }
  .cell-class-name-content {
    height: 100%;
    padding: 0;
    height: 200px;
  }
  .row-class-name-content {
    height: 100%;
  }
}
</style>
