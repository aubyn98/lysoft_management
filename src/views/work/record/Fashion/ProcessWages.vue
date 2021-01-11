<template>
  <el-dialog
    title="工价设置"
    :visible="visible"
    :append-to-body="appendToBody"
    @close="closeDialog"
    class="dialog-row ProcessWages"
  >
    <div class="dialog-content">
      <search-table
        small
        api="getFashion"
        ref="Xx"
        name="ProcessWages"
        selection
        @selection-change="selectionChange"
        :columns.sync="columnsPW"
        style="width: 300px"
      />

      <el-radio-group v-model="radio" class="dialog-content-right">
        <div class="processWage-item" v-for="l in list" :key="l.label">
          <div class="processWage-item-label">
            <el-radio :label="l.label">{{ l.text }}</el-radio>
          </div>
          <auto-form
            :ref="`autoForm_${l.label}`"
            :formItems="l.formItems"
            :disabled="radio !== l.label"
          ></auto-form>
        </div>
        <el-button size="mini" type="primary" style="margin-top:5px" @click="update">更新工序工价</el-button>
      </el-radio-group>
    </div>
  </el-dialog>
</template>

<script type="text/javascript">
import { columnsPW } from './columns'
import { p_formItems, p_formItems2, p_formItems3 } from './formItems'
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
  beforeCreate () {
    let startDate = this.$format.getDate(new Date(new Date().getTime() - 2592000000))
    let endDate = this.$format.getDate(new Date())
    const company = this.$store.state.company
    if (company) {
      const dateDict = this.$format.dateDict[company.rqlx]
      startDate = dateDict.startDate
      endDate = dateDict.endDate
    }
    p_formItems.forEach(p => {
      p.prop === 'ksrq' && (p.defaultVal = startDate)
      p.prop === 'jsrq' && (p.defaultVal = endDate)
    })
  },
  data () {
    return {
      columnsPW,
      selectRows: [],
      list: [
        {
          label: 1,
          text: '更新时间内已扫的工票工价（已结算不更新）',
          formItems: p_formItems
        },
        {
          label: 2,
          text: '更新时间内生成的工票工价（已结算不更新）',
          formItems: p_formItems
        },
        {
          label: 3,
          text: '更新时间内所生成且未交的工票工价',
          formItems: p_formItems
        },
        {
          label: 4,
          text: '更新以下裁床表流水号涉及的工票工价',
          formItems: p_formItems3
        },
        {
          label: 5,
          text: '产量登记',
          formItems: p_formItems
        },
        {
          label: 6,
          text: '修改所有款的工序工价',
          formItems: p_formItems2
        }
      ],
      radio: 1
    }
  },
  methods: {
    update () {
      if (!this.selectRows.length) return this.$alert('请至少选择一个款号！')
      this.$refs[`autoForm_${this.radio}`][0].submitForm().then(res => {
        this.$api.updateProcessWages({ ...res, kh: this.selectRows.map(({ kh, kslx }) => ({ kh, kslx })), mode: this.radio }).then(r => {

        })
      })
    },
    selectionChange (rows) {
      this.selectRows = rows
    },
    closeDialog () {
      this.$emit('update:visible', false)
    }
  }
}
</script>
<style lang="scss">
.ProcessWages {
  .el-dialog {
    width: 800px;
  }
  .el-dialog__header{
      text-align: center;
  }
  .dialog-content-right {
    width: 500px;
    text-align: center;
    flex: none !important;
  }
  .processWage-item {
    width: 450px;
    margin-left: 25px;
    text-align: left;
    border-radius: 4px;
    border: 1px solid var(--border-gray);
    position: relative;
    &:nth-of-type(n + 2) {
      margin-top: 15px;
    }
    &:nth-of-type(4) {
      .auto-form {
        justify-content: flex-start;
      }
    }
  }
  .processWage-item-label {
    margin-left: 50px;
    top: -8px;
    left: 0;
    background-color: var(--bg-white);
    padding: 0 5px;
    position: absolute;
  }
  .auto-form {
    margin-top: 10px;
    justify-content: space-between;
  }
}
</style>
