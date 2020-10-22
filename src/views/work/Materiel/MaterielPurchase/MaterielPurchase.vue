<template>
  <div class="page">
    <header-btn border @change="editChange"> </header-btn>
    <div class="billTitle">
      <div class="billTitle-left">
        <auto-form
          ref="autoForm"
          :disabled="disabled"
          style="width: 100%"
          :formItems="formItems"
        />
      </div>
      <div class="billTitle-right" style="left: 800px">
        <div class="billTitle-right-table">
          <edit-table
            hide-num
            hide-sum
            hide-context
            header-bg
            ref="editTable2"
            name="MaterielPurchaseTitle"
            :columns.sync="columnsTitle"
            :disabled="disabled"
          />
        </div>
      </div>
    </div>
    <edit-table
      ref="editTable"
      name="MaterielPurchase"
      :columns.sync="columnsLeft"
      :disabled="disabled"
    />
  </div>
</template>

<script type="text/javascript">
import { bill } from '@/common/mixins'
import { columnsLeft, columnsTitle } from './columns'
import formItems from './formItems'
export default {
  mixins: [bill],
  data () {
    return {
      formItems,
      columnsLeft,
      columnsTitle,
      countXx: {
        sums: [],
        total: 100
      },
      sendData: {},
      disabled: false,
      tableData: [],
      tableDataTitle: []
    }
  },
  mounted () {
    this.initData()
    this.getData().then(res => {
      console.log(res)
    })
  },
  methods: {
    editChange ({ action, edit, cb }) {
      this.$refs.autoForm.submitForm().then((res) => {
        console.log(res)
      })
    }
  }
}
</script>
<style lang="scss">
</style>
