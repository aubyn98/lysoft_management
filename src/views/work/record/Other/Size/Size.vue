<template>
<el-dialog :visible="$attrs['visible']" title="尺码档案" :center="true" :append-to-body="$attrs['append-to-body']" @close="() => { $emit('update:visible'); $emit('close') }">
    <header-btn border hideEdit>
        <div v-if="$permission([{ mc: '尺码档案', xg: true }])">
            <el-button :type="disabled ? 'warning' : 'success'" size="mini" @click="disabled ? update() : save()">{{disabled ? '修改' : '保存'}}</el-button>
            <el-button type="warning" size="mini" v-show="!disabled" @click="cancel">撤销</el-button>
            <el-button type="success" size="mini" v-if="selection" @click=" () => { listeners.selectEnd(rows == false ? [currentRow] : rows) }">选择完毕</el-button>
        </div>
    </header-btn>
    <div class="page-RowContent" style="height:500px;">
        <!-- <search-table
            v-if="$attrs['visible']"
            small
            ref="searchTable"
            :api="api.get"
            :selection="selection"
            v-bind="__props"
            :columns.sync="columns"
            v-on="listeners"
            name="Size"
            @select="select"
            @select-all="select"
            @row-click="rowClick"
            @check-change="rowCheckChange"
            @send-change="sendChange"
            @columns-change="columnsChange" /> -->

        <edit-table
            small
            hide-sums
            ref="editTable"
            :selection="selection"
            v-bind="__props"
            :disabled="disabled"
            :columns.sync="columns"
            v-on="listeners"
            name="Size"
            stop-key-event
            @send-change="request"
            @select="select"
            @select-all="select"
            @blur="ProcessBlur"
            @check-change="rowCheckChange"
            @columns-change="columnsChange" />
    </div>
</el-dialog>
<!-- <record-dialog
    name="Size"
    title="尺码档案"
    :api=""
    :columns="columns"
    :formItems="formItems"
    v-on="listeners"
    v-bind="$attrs"
  /> -->
</template>

<script type="text/javascript">
import { columnsPp as columns } from './columns'
import formItems from './formItems'
import { dialogRecord } from '@/common/mixins'
export default {
  mixins: [dialogRecord],
  props: {
    selection: {
      type: Boolean,
      defalut: false
    }
  },
  data () {
    return {
      columns,
      formItems,
      api: {
        get: 'getSize',
        del: 'delSize',
        update: 'updateSize',
        add: 'addSize'
      },
      rows: [],
      currentRow: null,
      currentRowIndex: -1,
      disabled: true,
      tableData: []
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.request()
    })
  },
  methods: {
    sortPx (arr, type = 'copy') {
      // 是否复制原数组
      if (type === 'copy') arr = arr.map((c) => ({ ...c }))
      // 收集去重后的数据
      const filterArr = []
      arr.forEach(
        (g) => filterArr.indexOf(g.ms) === -1 && filterArr.push(g.ms)
      )
      arr.forEach((g) => {
        // 根据去重后的数据顺序排序
        const index = filterArr.indexOf(g.ms)
        g.px = index + 1
      })
      // 对数组进行排序
      arr.sort((a, b) => a.px - b.px)
      return arr
    },
    ProcessBlur (row, prop, arr) {
      !row.px && (row.px = row.index + 1)
      if (prop === 'px') {
        // 原px数字的拥有者
        const filterArr = arr.filter((a) => {
          if (a.px !== row.px && a.ms === row.ms) {
            a.px = row.px
          }
          // eslint-disable-next-line eqeqeq
          return a.px == row.px && a.ms !== row.ms
        })
        if (filterArr.length) {
          // 旧排序
          const oldSort = this.sortPx(arr)
          // 所更改工序的旧排序
          const oldPx = oldSort
            .filter((a) => a.ms === row.ms)
            .map((a) => a.px)
            .pop()
          filterArr.forEach((f) => {
            f.px = oldPx
          })
        }
        arr.sort((a, b) => a.px - b.px)
        this.sortPx(arr, 'source')
      }
    },
    save () {
      this.$api.updateSize(this.$refs.editTable.submitTable()).then(res => {
        this.disabled = true
      })
    },
    update () {
      this.disabled = false
    },
    cancel () {
      this.$refs.editTable.initTableData(this.tableData, false)
      this.disabled = true
    },
    request () {
      const editTable = this.$refs.editTable
      this.$api.getSize({ ...editTable.getMsg() }).then(({ res }) => {
        res = res.sort((a, b) => a.px - b.px)
        editTable.initTableData(res, false)
        this.tableData = res
      })
    },
    columnsChange (c) {
      this.$emit('update:columns', c)
    },
    rowCheckChange ({ index, ...row }) {
      this.$api[this.api.update](row).then(res => {
        this.$refs.searchTable.request(true)
      })
    },
    select (rows) {
      this.rows = rows
    }
  },
  computed: {
    __props () {
      const { visible, title, ...props } = this.$attrs
      return props
    }
  }
}
</script>
