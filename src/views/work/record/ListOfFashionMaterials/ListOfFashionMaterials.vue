<template>
  <el-dialog
    title="款式用料清单"
    class="record_dialog"
    :visible="visible"
    :append-to-body="appendToBody"
    @close="closeDialog"
  >
    <div class="page ListOfFashionMaterials">
      <header-btn
        border
        :hide-edit="!$permission([{ mc: '工序档案', xg: true }])"
        @change="editChange"
        :activeIndex="dataIndex"
      >
      </header-btn>
      <content-table
        ref="contentTable"
        :columns.sync="contentColumn"
        name="ListOfFashionMaterialsContentTable"
      >
        <template #a>
          <edit-table
            ref="editTable"
            name="ListOfFashionMaterialsAddLeft"
            :columns.sync="columnsLeft"
            :disabled="disabled"
            @row-click="rowClick_left"
          />
        </template>
        <template #b>
          <div style="margin-bottom:2px">
            <el-tag size="mini" style="margin-right:5px">款式用料清单</el-tag>
            <el-checkbox>同步更新到其它码</el-checkbox>
          </div>
          <edit-table
            key="editTable2"
            ref="editTable2"
            :disabled="disabled"
            name="ListOfFashionMaterialsRight"
            :columns.sync="columnsRight"
          />
        </template>
      </content-table>
    </div>
  </el-dialog>
</template>

<script type="text/javascript">
import { columnsLeft, columnsRight } from './columns'
export default {
  props: {
    appendToBody: {
      type: Boolean,
      default: false
    },
    visible: {
      type: Boolean,
      required: true,
      default: true
    }
  },
  data () {
    return {
      columnsLeft,
      columnsRight,
      disabled: true,
      dataIndex: -1,
      attach: {
        ksrq: '',
        jsrq: ''
      },
      contentColumn: [
        { prop: 'a', width: 450 },
        { prop: 'b', width: 300 }
      ]
    }
  },
  methods: {
    rowClick_left () {},
    closeDialog () {
      this.$emit('update:visible', false)
      this.$emit('close')
    },
    editChange ({ action, edit, cb }) {
      if (action === 'del') {
        this.disabled = true
      } else if (!cb) {
        this.disabled = edit === 'save'
      }
      this[action](cb)
    },
    add () {},
    addsave (fn) {},
    addcancel () {},
    update () {},
    updatesave (fn) {},
    updatecancel () {}
  }
}
</script>
<style lang="scss">
.ListOfFashionMaterials {
  .contentTable .table-content-cell{
    display: flex;
    flex-direction: column;
  }
  .page-header--btn {
    position: relative;
  }
  .header_dateBox {
    position: absolute;
    top: 0;
    right: 0;
    button {
      margin-left: 10px;
    }
    > span {
      + * {
        width: 150px;
      }
      margin: 0 5px 0 10px;
    }
  }
}
</style>
