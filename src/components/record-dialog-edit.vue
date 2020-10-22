<template>
  <el-dialog
    :visible="visible"
    :title="title"
    @close="$emit('update:visible', false)"
  >
    <header-btn hideEdit>
      <el-button
        :type="edit ? 'success' : 'primary'"
        size="mini"
        @click="edit ? save() : (edit = !edit)"
        >{{ edit ? "保存" : "修改" }}</el-button
      >
      <el-button type="warning" size="mini" @click="cancel" v-if="edit"
        >撤销</el-button
      >
    </header-btn>
    <div class="page-RowContent" :style="{ height: '500px', width: '100%' }">
      <edit-table
        hideSum
        hideAddMenu
        ref="editTable"
        :name="name"
        :columns.sync="columns"
        :disabled="!edit"
      ></edit-table>
    </div>
  </el-dialog>
</template>

<script type="text/javascript">
import { dialogRecord } from '@/common/mixins'
export default {
  data () {
    return {
      edit: false,
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
    formItems: {
      type: Array,
      required: true
    },
    api: {
      type: Object,
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
  mounted () {
    this.request()
  },
  methods: {
    request () {
      this.$api[this.api.get](this.params)
        .then((data) => {
          this.tableData = data.res
          this.$refs.editTable.initTableData(this.tableData)
        })
        .catch((res) => {
          this.tableData = []
          this.$refs.editTable.initTableData([])
        })
    },
    save () {
      const newTableData = this.$refs.editTable.submitTable()
      this.$api[this.api.update]({ tableData: newTableData }).then((res) => {
        this.tableData = newTableData
        this.edit = false
      })
    },
    cancel () {
      this.edit = !this.edit
      this.$refs.editTable.initTableData(this.tableData)
    }
  },
  mixins: [dialogRecord]
}
</script>
