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
      <div class="billTitle-right" style="left:700px">
        <div class="billTitle-right-table">
          <edit-table
            hideNum
            hideSum
            hideContext
            headerBg
            ref="editTable2"
            name="MaterielReturnTitle"
            :sourceData="tableDataTitle"
            :columns.sync="columnsTitle"
            :disabled="disabled"
          />
        </div>
      </div>
    </div>
    <edit-table
      ref="editTable"
      name="MaterielReturn"
      :sourceData="tableDataXx"
      :columns.sync="columnsXx"
      :sums="countXx.sums"
      :disabled="disabled"
    />
  </div>
</template>

<script type="text/javascript">
import { columnsXx, columnsTitle } from './columns'
import formItems from './formItems'
export default {
  data () {
    return {
      formItems,
      columnsXx,
      columnsTitle,
      contentColumn: [
        { prop: 'a', width: 400 },
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
