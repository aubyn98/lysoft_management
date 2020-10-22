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
            hideNum
            hideSum
            hide-context
            headerBg
            ref="editTable2"
            name="MaterielPurchaseTitle"
            :columns.sync="columnsTitle"
            :disabled="disabled"
          />
        </div>
      </div>
    </div>
    <content-table
      :columns.sync="contentColumn"
      name="MaterielEnterStoreContentTable"
    >
      <template #a>
        <edit-table
          ref="editTable"
          name="MaterielEnterStoreLeft"
          :columns.sync="columnsLeft"
          :disabled="disabled"
        />
      </template>
      <template #b>
        <edit-table
          ref="editTable"
          name="MaterielEnterStoreRight"
          :columns.sync="columnsLeft"
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
      contentColumn: [
        { prop: 'a', width: 900 },
        { prop: 'b', width: 400 }
      ],
      countXx: {
        sums: [],
        total: 100
      },
      disabled: false,
      tableDataXx: [{ khmc: 'aa' }],
      tableDataTitle: [{ kddh: '', kdrq: '2020-10-10', lsdh: '', zdr: '' }]
    }
  },
  mounted () {},
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
