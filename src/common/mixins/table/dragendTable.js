export default {
  props: {
    name: {
      required: true,
      type: String
    },
    columns: {
      type: Array,
      required: true
    }
  },
  created () {
    const columns = JSON.parse(localStorage.getItem(this.name))
    columns && this.$emit('update:columns', columns) && this.$emit('columnsChange', columns)
  },
  methods: {
    dragend (newWidth, oldWidth, column) {
      const columns = this.$format.copy(this.columns)
      columns.some((c) => {
        if (c.prop === column.property) {
          c.width = newWidth
        }
      })
      this.$emit('update:columns', columns)
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
