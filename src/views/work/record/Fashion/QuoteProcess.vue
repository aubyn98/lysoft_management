<template>
  <el-dialog
    title="引用工序"
    :visible="visible"
    :append-to-body="appendToBody"
    @close="closeDialog"
    center
  >
    <auto-form
      :formItems="formItems"
      @autocomplete-select="autocompleteSelect"
      @btn-click="btnClick"
    />
    <div style="height: 400px">
      <search-table
        small
        ref="Xx"
        hide-sums
        hide-search
        name="QuoteProcess"
        :sourceData="tableData"
        :columns.sync="columnsProcess"
      />
    </div>
  </el-dialog>
</template>

<script type="text/javascript">
import { columnsProcess } from './columns'
export default {
  props: {
    appendToBody: {
      type: Boolean,
      default: false
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      columnsProcess,
      formItems: [
        {
          label: '款号',
          prop: 'kh',
          placeholder: '请输入选择款号',
          elType: 'autocomplete',
          api: 'getFashion',
          labelWidth: '40px',
          style: { width: '220px' }
        },
        {
          label: '',
          prop: 'btn',
          elType: 'button',
          elText: '确定',
          labelWidth: '10px',
          style: { width: '220px' }
        }
      ],
      tableData: []
    }
  },
  methods: {
    btnClick () {
      this.$emit('select-end', this.tableData)
      this.$emit('update:visible', false)
    },
    autocompleteSelect ({ v }) {
      this.tableData = v.ksgx
    },
    closeDialog () {
      this.$emit('update:visible', false)
    }
  }
}
</script>
