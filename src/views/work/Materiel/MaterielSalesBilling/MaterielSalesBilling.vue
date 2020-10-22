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
      <div class="billTitle-right" style="left:880px">
        <div class="billTitle-right-table">
          <edit-table
            hideNum
            hideSum
            hideContext
            headerBg
            ref="editTable2"
            name="MaterielSalesBillingTitle"
            :sourceData="tableDataTitle"
            :columns.sync="columnsTitle"
            :disabled="disabled"
          />
        </div>
      </div>
    </div>
    <content-table :columns.sync="contentColumn" name="MaterielSalesBillingContentTable">
      <template #a>
        <edit-table
          ref="editTable"
          name="MaterielSalesBillingLeft"
          :sourceData="tableDataXx"
          :columns.sync="columnsLeft"
          :sums="countXx.sums"
          :disabled="disabled"
        />
      </template>
      <template #b>
        <edit-table
          ref="editTable"
          name="MaterielSalesBillingRight"
          :sourceData="tableDataXx"
          :columns.sync="columnsRight"
          :sums="countXx.sums"
          :disabled="disabled"
        />
      </template>
    </content-table>
  </div>
</template>

<script type="text/javascript">
import { columnsLeft, columnsRight, columnsTitle } from './columns'
import formItems from './formItems'
export default {
  data () {
    return {
      formItems,
      columnsLeft,
      columnsRight,
      columnsTitle,
      contentColumn: [{ prop: 'a', width: 800 }, { prop: 'b', width: 400 }],
      countXx: {
        sums: [],
        total: 100
      },
      disabled: false,
      tableDataXx: [{ khmc: 'aa' }],
      tableDataTitle: [{ kddh: '', kdrq: '2020-10-10', lsdh: '', zdr: '' }]
    }
  },
  mounted () {

  },
  methods: {
    editChange () {
      this.$refs.autoForm.submitForm().then((res) => {
        console.log(res)
      })
    },
    rowClickXx () {},
    rowDblclick () {},
    sendTableData ({ i, row }) {
      return this.$refs.editTable.sendTableData()
    }
  }
}
</script>
<style lang="scss">

</style>
