<template>
<el-dialog :visible="visible" :title="title" class="edit_dialog" @close="$emit('update:visible', false)">
    <header-btn hideEdit>
        <el-button :type="edit ? 'success' : 'primary'" size="mini" @click="edit ? save() : (edit = !edit)">{{ edit ? "保存" : "修改" }}</el-button>
        <el-button type="warning" size="mini" @click="cancel" v-if="edit">撤销</el-button>
        <el-button type="success" size="mini" icon="el-icon-bottom" @click="insert('down')" :disabled="!edit">向下插入工序</el-button>
        <el-button type="success" size="mini" icon="el-icon-top" @click="insert('up')" :disabled="!edit">向上插入工序</el-button>
        <el-tag style="margin-left:10px">Tip：点击鼠标右键进行删除</el-tag>
    </header-btn>
    <div class="page-RowContent" :style="{ height: '500px', width: '78vw' }">
        <edit-table
            hide-sums
            hideAddMenu
            hideDelMenu
            :contextMenus="[{label:'删除',prop:'del'}]"
            ref="editTable"
            :name="name"
            :columns.sync="columns"
            :disabled="!edit"
            @blur="ProcessBlur"
            @row-click="rowClick"
            @context-click="contextClick"></edit-table>
    </div>
    <Process
        append-to-body
        :visible.sync="Process"
        v-if="Process"
        selection
        @row-dblclick="(row) => {
              attachSelectEnd(c.prop, [row]);
        }"
        @selectEnd="attachSelectEnd" />
</el-dialog>
</template>

<script type="text/javascript">
export default {
  data () {
    return {
      edit: false,
      Process: false,
      currentRow: null,
      action: 'down',
      tableData: []
    }
  },
  props: {
    title: {
      type: String
    },
    name: {
      type: String,
      required: true
    },
    columns: {
      type: Array,
      required: true
    },
    visible: {
      type: Boolean,
      required: true
    },
    params: {
      type: Object,
      defualt: () => ({})
    }
  },
  watch: {
    visible (val) {
      if (val) {
        this.get()
      }
    }
  },
  mounted () {},
  methods: {
    get () {
      this.$api.getProcessByTicket(this.params).then((data) => {
        this.$refs.editTable.initTableData(data.res, false)
        this.tableData = data.res
      })
    },
    insert (action) {
      this.action = action
      this.Process = true
    },
    save () {
      const tableData = this.$refs.editTable.submitTable()
      this.$api
        .updateProcessByTicket({ ...this.params, tableData })
        .then((res) => {
          this.$emit('update:visible', false)
          this.edit = false
        })
    },
    cancel () {
      this.edit = !this.edit
      this.$refs.editTable.initTableData(this.tableData, false)
    },
    contextClick () {
      if (!this.currentRow) return this.$alert('请点击选择要删除的工序！')
      if (this.currentRow.jhrq) return this.$alert(`${this.currentRow.gxmc}已有交货交货，不能删除！`)
      this.$refs.editTable.delRow()
      this.currentRow = null
    },
    rowClick (row) {
      this.currentRow = row
    },
    attachSelectEnd (rows) {
      // 码数列表
      /* const msList =  this.$refs.FashionmsTable[0].submitTable()  */
      // 工序列表
      let gxList = this.$refs.editTable.submitTable()
      // 当前行索引
      /* if (this.$refs.autoForm.ruleForm.gxdmdj && msList.length) {
        const arr = []
        rows.forEach((r) => {
          msList.forEach((m) => {
            arr.push({ ...r, dmms: m.ms, qhqr: true })
          })
        })
        rows = arr
      } else {
        rows = rows.map((r) => {
          return { ...r, qhqr: true }
        })
      } */
      rows = rows.map((r) => {
        return { ...r, qhqr: true }
      })
      // 当前行索引 this.currentAttachRow[prop].row.index
      const idx = this.currentRow ? this.currentRow.index + (this.action === 'down' ? 1 : 0) : gxList.length
      gxList.splice(
        idx > 0 ? idx : 0,
        0,
        ...rows
      )
      gxList = this.sortPx(gxList)
      this.$refs.editTable.initTableData(gxList, false)
      this.Process = false
    },
    sortPx (arr, type = 'copy') {
      // 是否复制原数组
      if (type === 'copy') arr = arr.map((c) => ({ ...c }))
      // 收集去重后的数据
      const filterArr = []
      arr.forEach(
        (g) => filterArr.indexOf(g.gxmc) === -1 && filterArr.push(g.gxmc)
      )
      arr.forEach((g) => {
        // 根据去重后的数据顺序排序
        const index = filterArr.indexOf(g.gxmc)
        g.px = index + 1
      })
      // 对数组进行排序
      arr.sort((a, b) => a.px - b.px)
      return arr
    },
    ProcessBlur (row, prop, arr) {
      if (prop === 'px') {
        // 原px数字的拥有者
        const filterArr = arr.filter((a) => {
          if (a.px !== row.px && a.gxmc === row.gxmc) {
            a.px = row.px
          }
          // eslint-disable-next-line eqeqeq
          return a.px == row.px && a.gxmc !== row.gxmc
        })
        if (filterArr.length) {
          // 旧排序
          const oldSort = this.sortPx(arr)
          // 所更改工序的旧排序
          const oldPx = oldSort
            .filter((a) => a.gxmc === row.gxmc)
            .map((a) => a.px)
            .pop()
          filterArr.forEach((f) => {
            f.px = oldPx
          })
        }
        arr.sort((a, b) => a.px - b.px)
        this.sortPx(arr, 'source')
      }
    }
  }
}
</script>

<style lang="scss">
.edit_dialog {
    box-sizing: border-box;

    .el-dialog {
        width: 80vw;
        height: 620px;
        margin-top: 10vh !important;
        display: flex;
        box-sizing: border-box;
        flex-direction: column;

        .el-dialog__body {
            flex: 1;
            height: 0;
        }
    }
}
</style>
