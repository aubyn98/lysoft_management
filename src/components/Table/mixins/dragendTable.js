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
    this.localforage.getItem(this.name).then(columns => {
      if (columns) {
        this.$emit('update:columns', columns)
        this.$emit('columns-change', columns)
      }
    })
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
      this.$emit('columns-change', columns)
      this.localforage.setItem(this.name, columns)
      this.doLayout()
    },
    doLayout () {
      this.$nextTick(() => {
        this.$refs.searchTable.doLayout()
      })
    }
  }
}
