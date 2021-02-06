<template>
<div class="InventoryMsg">
    <search-table
        small
        span-method
        hide-search
        ref="searchTable"
        name="InventoryMsgTable"
        :sourceData="tableData"
        :columns.sync="columns"
        :sourceCount="count"
        :attach-columns.sync="attachColumns" />
</div>
</template>

<script type="text/javascript">
export default {
  data () {
    return {
      timer: null,
      tableData: [],
      columns: [{
        label: '库存信息',
        prop: 'khxx',
        width: 100,
        show: true,
        children: [{
          label: '款号',
          prop: 'kh',
          width: 100,
          show: true
        }, {
          label: '商标',
          prop: 'sb',
          width: 100,
          show: true
        }, {
          label: '颜色',
          prop: 'ysmc',
          width: 100,
          show: true
        }, {
          label: '款式类型',
          prop: 'kslx',
          width: 100,
          show: true
        }, {
          label: '库存量',
          prop: 'zsl',
          sumProp: 'zsl',
          width: 100,
          show: true
        }, {
          label: '单位',
          prop: 'dw',
          width: 100,
          show: true
        }]
      }],
      attachColumns: [],
      count: 0
    }
  },
  props: {
    kh: {
      type: String,
      default: ''
    }
  },
  watch: {
    kh: {
      handler (val) {
        if (this.timer) clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.request(val)
        }, 300)
      },
      deep: true
    }
  },
  computed: {
    excludeKeys () {
      return this.columns[0].children.map(item => item.prop)
    }
  },
  methods: {
    request (kh) {
      this.$api.getInventoryMsg({ kh }).then(({ res }) => {
        if (res.length) {
          const ms = Object.keys(res[0]).filter(k => this.excludeKeys.indexOf(k) === -1)
          this.attachColumns = [{
            label: '尺码',
            prop: 'cm',
            width: 100,
            show: true,
            children: ms.map(m => ({
              label: m,
              prop: m,
              sumProp: m,
              width: 100,
              show: true
            }))
          }]
        } else {
          this.attachColumns = []
        }
        this.tableData = res
      })
    }
  }
}
</script>

<style lang="scss">
.InventoryContentBox {
    display: flex;
    flex: 1;
    height: 0;
}

.InventoryContent {
    height: 100%;
    flex: 1;
    width: 0;
    display: flex;
}

.InventoryMsg {
    height: 100%;
    min-width: 400px;
    width: 400px;
    flex-shrink: 0;
}
</style>
