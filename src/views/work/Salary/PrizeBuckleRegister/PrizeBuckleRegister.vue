<template>
  <div class="page">
    <header-btn
      border
      :hide-change="currentRow && currentRow.zt === '结算'"
      :hide-edit="!$permission([{ mc: '奖扣登记', xg: true }])"
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
    <div class="treeContent">
      <div class="treeContentLeft" style="position:relative">
        <div>
          <DepartmentTree ref="tree" @check="treeCheck" :disabled="disabled"/>
        </div>
        <div style="position:absolute;top:0;left:0;height:100%;width:100%;z-index:1" v-show="disabled"></div>
      </div>
      <div class="treeContentRight">
        <div class="billTitle">
          <div class="billTitle-left">
            <auto-form
              ref="autoForm"
              :disabled="disabled"
              style="width: 100%"
              :formItems="formItems"
              @icon-click="fromIconClick"
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
                name="PrizeBuckleRegisterTitle"
                :columns.sync="columnsTitle"
                :disabled="disabled"
              />
            </div>
          </div>
        </div>
        <div style="flex: 1; height: 0">
          <innerStatistic
            name="PrizeBuckleRegisterList"
            api="getPrizeBuckleRegister"
            ref="statistic"
            @row-click="rowclick"
            :columns.sync="columnsList"
            :formItems="formItemsList"
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
        add: 'addPrizeBuckleRegister',
        update: 'updatePrizeBuckleRegister',
        getByDh: 'getPrizeBuckleRegisterByDh',
        del: 'delPrizeBuckleRegister'
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
      excelApi: 'getPrizeBuckleRegister'
    }
  },
  methods: {
    getData () {
      return new Promise(resolve => {
        this.$refs.autoForm.submitForm().then(res => {
          const titleTableData = this.$refs.editTable2.submitTable()[0]
          const checkedNodes = this.$refs.tree.getCheckedNodes()
          const sendData = { ...titleTableData, ...checkedNodes, ...res }
          resolve(sendData)
        })
      })
    },
    treeCheck () {
      const { departments, staffs } = this.$refs.tree.getCheckedNodes()
      const v = departments.length || staffs.length > 1 ? '多位员工' : ''
      const onlyOne = staffs.length === 1 && departments.length === 0
      this.$refs.autoForm.setFieldsValue({
        ygmc: onlyOne ? staffs[0].ygmc : v,
        yggh: onlyOne ? staffs[0].yggh : v
      })
    }
  }
}
</script>
<style lang="scss">
</style>
