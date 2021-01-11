<template>
  <div class="page">
    <header-btn
      border
      :hide-edit="!$permission([{ mc: '请假登记', xg: true }])"
      :hide-change="currentRow && currentRow.zt === '结算'"
      @change="editChange"
      :activeIndex="activeIndex"
    >
      <!-- <el-button type="success" size="mini" @click="request">刷新</el-button> -->
      <el-button type="primary" size="mini" @click="exportExcel"
        >导出</el-button
      >
      <exportExcel
        ref="exportExcel"
        :msg="excelData"
        :format="excelFormat"
        style="display: none"
      />
    </header-btn>
    <div class="billTitle">
      <div class="billTitle-left">
        <auto-form
          ref="autoForm"
          :disabled="disabled"
          style="width: 100%"
          :formItems="formItems"
          @icon-click="fromIconClick"
          @date-change="dateChange"
          :includeKeys="['id']"
        />
      </div>
      <div class="billTitle-right" style="left: 840px">
        <div class="billTitle-right-table" style="width: 240px">
          <edit-table
            hideNum
            hide-sums
            hideContext
            headerBg
            ref="editTable2"
            name="LeaveRegisterTitle"
            :columns.sync="columnsTitle"
            :disabled="disabled"
          />
        </div>
      </div>
    </div>
    <div style="flex: 1; height: 0">
      <innerStatistic
        name="LeaveRegisterList"
        api="getLeaveRegister"
        ref="statistic"
        :columns.sync="columnsList"
        @row-click="rowclick"
        :formItems="formItemsList"
        :params="{ params: 1 }"
      />
    </div>
    <div v-for="item in subRecords" :key="item.prop">
      <component
        append-to-body
        :sub="sub(item.prop)"
        :is="item.component"
        :visible.sync="item.visible"
        @row-dblclick="
          (...argv) => {
            subDblclick(item.prop, ...argv);
          }
        "
        @selectEnd="
          (...argv) => {
            subSelectEnd(item.prop, ...argv);
          }
        "
      />
    </div>
  </div>
</template>

<script type="text/javascript">
import { bill, billOnlyForm, excel, formIconClick } from '@/common/mixins'
import { columnsTitle, columnsList } from './columns'
import { formItems, formItemsList } from './formItems'
export default {
  mixins: [bill, billOnlyForm, formIconClick, excel],
  data () {
    return {
      formItems,
      columnsTitle,
      formItemsList,
      columnsList,
      api: {
        add: 'addLeaveRegister',
        update: 'updateLeaveRegister',
        getByDh: 'getLeaveRegisterByDh',
        del: 'delLeaveRegister'
      },
      subRecords: [
        {
          prop: 'yggh',
          visible: false,
          component: 'Staff'
        },
        {
          prop: 'ygmc',
          visible: false,
          component: 'Staff'
        }
      ],
      excelApi: 'getLeaveRegister'
    }
  },
  methods: {
    dateChange () {
      const autoForm = this.$refs.autoForm
      const { qjrq, fcrq } = autoForm.ruleForm
      const result = {
        ts: '',
        ss: '',
        fs: ''
      }
      if (qjrq && fcrq) {
        const s = new Date(qjrq)
        const e = new Date(fcrq)
        const stime = s.getTime()
        const etime = e.getTime()
        if (stime > etime) {
          this.$alert('错误，返厂日期小于请假日期！')
          return autoForm.setFieldsValue({ fcrq: '' })
        }
        const differ = etime - stime
        const minute = Math.floor(differ / 60000)
        const hours = Math.floor(minute / 60)
        const days = Math.floor(hours / 24)
        result.ts = days
        result.ss = hours % 24
        result.fs = minute % 60
      }
      autoForm.setFieldsValue(result)
    }
  }
}
</script>
<style lang="scss">
</style>
