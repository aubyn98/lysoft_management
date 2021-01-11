<template>
  <div class="page" style="padding: 0">
    <div class="page-RowContent">
      <div class="page-RowContent-item" data-left data-search>
        <search-table
          small
          span-method
          ref="searchTable"
          :name="name"
          :sourceData="tableData"
          :columns="columns"
          :sourceCount="count"
          :selection="selection"
          @row-click="rowClick"
          @row-dblclick="rowDblclick"
          @send-change="sendChange"
          @columns-change="$emit('update:columns', $event)"
          @selection-change="$emit('selection-change',$event)"
        />
      </div>
      <div class="page-RowContent-item" data-search data-hover>
        <auto-form
          class="searchForm-column"
          ref="autoForm"
          :formItems="formItems"
          label-position="top"
        />
        <el-button
          type="primary"
          size="mini"
          class="search-form-btn"
          @click="request"
          >查询</el-button
        >
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import { statistics } from '@/common/mixins'
export default {
  mixins: [statistics],
  props: {
    columns: {
      type: Array,
      required: true
    },
    selection: {
      type: Boolean,
      default: false
    },
    formItems: {
      type: Array,
      required: true
    },
    params: {
      type: Object,
      default: () => ({})
    },
    api: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      /* attach: {
        zf: false
      }, */
      tableData: []
    }
  },
  created () {},
  methods: {
    getSearchMsg () {
      return new Promise(resolve => {
        this.$refs.autoForm.submitForm().then(res => {
          this.searchMsg = {
            ...res,
            // ...this.attach,
            ...this.params,
            columns: this.$refs.searchTable.getMsg(),
            ...this.$refs.searchTable.getSort()
          }
          resolve(this.searchMsg)
        })
      })
    },
    searchMsgHandle () {},
    rowDblclick (...agrv) {
      this.$emit('row-dblclick', ...agrv)
    },
    rowClick (...agrv) {
      this.$emit('row-click', ...agrv)
    }
  }
}
</script>
<style lang="scss">
</style>
