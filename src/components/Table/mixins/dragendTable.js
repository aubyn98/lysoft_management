export default {
  props: {
    name: {
      required: true,
      type: String
    },
    columns: {
      type: Array,
      required: true
    },
    attachColumns: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      // 选中显示的列
      checkedList: []
    }
  },
  created () {
    this.localforage.getItem(this.name).then(columns => {
      if (columns) {
        this.$emit('update:columns', columns)
        this.$emit('columns-change', columns)
      }
    })
    this.localforage.getItem(this.name + 'CheackList').then(checkedList => {
      this.initCheckList(this.columns, checkedList)
      this.initMsg()
    })
  },
  updated () {
    this.$nextTick(() => {
      const children = this.$refs.Table.$el.querySelector('.el-table__header-wrapper > table > thead > tr').children
      children.forEach((c, i) => {
        this.setDragEvent(c, i)
      })
    })
  },
  methods: {
    // 列拖拽
    dataset (list, i) {
      list.forEach(ch => {
        ch.dataset.index = i
        ch.children && this.dataset(ch.children, i)
      })
    },
    setDragEvent (c, i) {
      c.setAttribute('draggable', true)
      c.dataset.index = i
      this.dataset(c.children, i)
      c.ondragstart = (e) => {
        e.dataTransfer.setData('index', i)
      }
      c.ondragover = (e) => {
        e.preventDefault()
      }
      c.ondrop = (ev) => {
        const num = (this.hideNum ? 0 : 1) + (this.selection ? 1 : 0)
        const stemp = this.autoColumns[ev.dataTransfer.getData('index') - num]
        const etemp = this.autoColumns[ev.target.dataset.index - num]
        const start = stemp.index
        const end = etemp.index
        const columns = [...this.columns]
        columns[end] = stemp
        columns[start] = etemp
        this.columnsHandle(columns)
        this.initCheckList(null, this.columns.filter(c => this.checkedList.includes(c.label)).map(c => c.label))
        this.doLayout()
      }
    },
    columnsHandle (columns) {
      this.$emit('update:columns', columns)
      this.$emit('columns-change', columns)
      this.localforage.setItem(this.name, columns)
    },
    // 宽度拖拽
    dragend (newWidth, oldWidth, column) {
      const columns = this.$format.copy(this.columns)
      columns.some((c) => {
        if (c.prop === column.property) {
          c.width = newWidth
        }
      })
      this.columnsHandle(columns)
      this.doLayout()
    },
    doLayout () {
      this.$nextTick(() => {
        this.$refs.Table.doLayout()
      })
    },
    initCheckList (c, list) {
      this.checkedList = list || c.filter(c => {
        // eslint-disable-next-line no-prototype-builtins
        const hasShow = c.hasOwnProperty('show')
        return ((hasShow && c.show) || !hasShow) && !c.dynamic
      }).map((c) => c.label)
    }
  },
  watch: {
    checkedList: {
      handler (val) {
        this.localforage.setItem(this.name + 'CheackList', val)
        this.setSums && this.setSums(this.sumsData)
      },
      deep: true
    }
  },
  computed: {
    autoColumns () {
      this.$nextTick(() => {
        this.doLayout()
      })
      return this.columns.map((item, i) => {
        item.index = i
        return item
      }).filter((item) => {
        return this.checkedList.some((v) => v === item.label) || item.dynamic
      }).concat(this.attachColumns)
    },
    autoCheckC () {
      return this.columns.filter((item) => {
        return !item.dynamic
      })
    }
  }
}
