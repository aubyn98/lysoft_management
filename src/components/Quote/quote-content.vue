<template>
<div>
    <auto-form ref="autoForm" :formItems="formItems" @btn-click="formBtnClick" />
    <div class="page-RowContent" style="height: 500px;flex-wrap:wrap;">
        <search-table
            small
            selection
            hide-search
            hide-pagination
            ref="searchTable"
            :name="name"
            :sourceData="tableData"
            :columns="columns"
            :attach-columns.sync="attachC"
            @columns-change="changeColumns"
            @row-dblclick="rowDblclick"
            @select="select"
            @select-all="selectAll"
            @selection-change="selectionChange" />
        <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="100" layout="prev, pager, next, jumper" :total="1000">
        </el-pagination>
    </div>
</div>
</template>

<script type="text/javascript">
import { statistics } from '@/common/mixins'
export default {
  mixins: [statistics],
  props: {
    name: {
      type: String,
      required: true
    },
    api: {
      type: String,
      required: true
    },
    columns: {
      type: Array,
      required: true
    },
    attachColumnsFn: {
      type: Function
    },
    formItems: {
      type: Array,
      required: true
    },
    params: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      selection: [],
      attachC: [],
      currentPage: 1
    }
  },
  created () {
    this.selection = []
  },
  computed: {
    columnKeys () {
      return this.columns.map(c => c.prop)
    }
  },
  methods: {
    handleCurrentChange () {},
    request (flag = true) {
      flag && this.clearTableHeader(flag)
      this.getSearchMsg().then(() => {
        const msg = { ...this.searchMsg, columns: { ...this.searchMsg.columns } }
        this.searchMsgHandle(msg)
        this.initAllTableData && this.initAllTableData()
        this.$api[this.api]({ ...msg, ...this.params })
          .then((data) => {
            this.mergeColumns && this.countMerge(data.res)
            this.count = data.count
            this.requestHandle && this.requestHandle(data)
            this.$refs.searchTable.setSums(data)
            if (this.attachColumnsFn && data.res.length) {
              this.attachC = this.attachColumnsFn(data, this.columnKeys)
            }
            this.tableData = data.res
          }).catch(e => {
            console.log(e)
            this.count = 0
            this.tableData = []
            this.attachC = []
          })
      })
    },
    changeColumns (val) {
      this.$emit('update:columns', val)
    },
    formBtnClick (prop) {
      switch (prop) {
        case 'blank_submit':
          this.request()
          break
        case 'blank_select':
          this.selectEnd()
          break
      }
    },
    selectEnd () {
      this.$emit('select-end', this.selection, this.columnKeys)
      this.$emit('update:visible', false)
    },
    selectionChange (selection) {
      this.selection = selection
    },
    select (selection) {
      this.selection = selection
    },
    selectAll (selection) {
      this.selection = selection
    },
    rowDblclick (row) {
      this.tableData.filter(r => {
        return r.yydh === row.yydh
      }).forEach(r => {
        this.$refs.searchTable.toggleRowSelection(r)
      })
    },
    searchMsgHandle () {},
    getSearchMsg () {
      return new Promise((resolve) => {
        this.$refs.autoForm.submitForm().then((res) => {
          this.searchMsg = {
            ...res,
            ...(this.$attrs.params ? this.$attrs.params : {})
          }
          resolve(this.searchMsg)
        })
      })
    }
  },
  destroyed () {
    this.selection = []
  }
}
</script>
