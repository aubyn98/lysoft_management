<template>
  <div>
    <auto-form
      ref="autoForm"
      :formItems="formItems"
      @btn-click="formBtnClick"
    />
    <div class="page-RowContent" style="height: 500px">
      <search-table
        small
        selection
        hide-search
        hide-pagination
        ref="searchTable"
        :name="name"
        :sourceData="tableData"
        :columns.sync="columns"
        @row-dblclick="rowDblclick"
        @select="select"
        @select-all="selectAll"
        @selection-change="selectionChange"
      />
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
    formItems: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      selection: []
    }
  },
  created () {
    this.selection = []
  },
  methods: {
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
      this.$emit('select-end', this.selection)
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
