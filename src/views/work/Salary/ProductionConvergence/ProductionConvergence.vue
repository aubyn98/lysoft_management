<template>
  <div class="page">
    <header-btn
      border
      @change="editChange"
      :activeIndex="activeIndex"
      :defaultTab.sync="tabIndex"
      :hide-change="!currentRow"
      :hide-edit="!$permission([{ mc: '产量汇合', xg: true }])"
      :tabs="['添加列表', '查询列表']"
    >
    </header-btn>
    <auto-form
      v-show="tabIndex === '添加列表'"
      ref="autoForm"
      :disabled="disabled"
      style="width: 100%"
      :formItems="formItems"
      @icon-click="fromIconClick"
      @autocomplete-select="completeSelect"
      @btn-click="btnClick"
    />
    <content-table
      v-show="tabIndex === '添加列表'"
      ref="contentTable"
      :columns.sync="contentColumn"
      name="WorkshopScheduleContentTable"
    >
      <template #a>
        <search-table
          small
          ref="searchTable"
          name="ProductionConvergenceDetail"
          :sourceData="tableData"
          :columns.sync="columnsDetail"
          :attach-columns="attachColumns"
          :sourceCount="count"
        />
      </template>
      <template #b>
        <search-table
          small
          selection
          ref="searchTable"
          name="ProductionConvergenceFashion"
          :columns.sync="columnsFashion"
          @selection-change="selectChange"
          api="getFashion"
        />
      </template>
    </content-table>
    <search-table
      small
      v-show="tabIndex === '查询列表'"
      ref="searchTable2"
      name="ProductionConvergenceList"
      api="getProductionConvergence"
      :columns.sync="columnsList"
      @row-click="listRowClick"
      @row-dblclick="listDblclick"
    />
    <div v-for="item in subRecords" :key="item.prop">
      <component
        append-to-body
        sub
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
import { columnsDetail, columnsList, columnsFashion } from './columns'
import { formItems } from './formItems'
import { formIconClick } from '@/common/mixins'
export default {
  mixins: [formIconClick],
  data () {
    return {
      formItems,
      columnsFashion,
      columnsDetail,
      columnsList,
      count: 0,
      tableData: [],
      disabled: true,
      currentRow: null,
      activeIndex: -1,
      tabIndex: '添加列表',
      contentColumn: [
        { prop: 'a', width: 1200 },
        { prop: 'b', width: 270 }
      ],
      selectedFashions: [],
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
      api: {
        get: 'getProductionConvergence2',
        add: 'addProductionConvergence',
        update: 'updateProductionConvergence'
      }
    }
  },
  mounted () {
    this.initData()
  },
  computed: {
    attachColumns () {
      const ruleForm = this.$refs.autoForm.ruleForm
      const flag = ruleForm.hzms === '员工'
      switch (true) {
        case flag && !ruleForm.gxmc:
          return [
            {
              label: '员工名称',
              prop: 'ygmc',
              width: 100
            },
            {
              label: '员工工号',
              prop: 'yggh',
              width: 100
            }
          ]
        case !flag && !ruleForm.gxmc:
          return [
            {
              label: '颜色',
              prop: 'ysmc',
              width: 100
            }
          ]
        default:
          return []
      }
    }
  },
  methods: {
    initData () {
      const autoForm = this.$refs.autoForm
      autoForm.initForm()
      let jhrq
      let startDate = this.$format.getDate(
        new Date(new Date().getTime() - 2592000000)
      )
      let endDate = (jhrq = this.$format.getDate(new Date()))
      const company = this.$store.state.company
      if (company) {
        const dateDict = this.$format.dateDict[company.rqlx]
        startDate = dateDict.startDate
        endDate = dateDict.endDate
      }
      autoForm.setFieldsValue({
        ksrq: startDate,
        jsrq: endDate,
        jhrq
      })
      this.tableData = []
    },
    get () {
      if (!this.selectedFashions.length) {
        return this.$alert('请至少选择一个款号！')
      }
      return new Promise((resolve) => {
        this.$refs.autoForm.submitForm().then((res) => {
          this.$api[this.api.get]({
            ...res,
            list: this.selectedFashions.map((r) => r.kh)
          }).then((data) => {
            this.tableData = data.res
            resolve(data.res)
          })
        })
      })
    },
    submit (action, cb) {
      this.get().then((l) => {
        if (l.length) {
          this.$refs.autoForm.submitForm().then((res) => {
            const text =
              res.yggh === ''
                ? '员工工号不能为空！'
                : res.ygmc === ''
                  ? '员工名称不能为空！'
                  : res.gxmc === ''
                    ? '工序名称不能为空'
                    : null
            if (text) return this.$alert(text)
            this.$api[this.api[action]]({
              ...res,
              list: this.tableData
            })
              .then((data) => {
                this.currentRow &&
                  this.listDblclick({ dh: this.currentRow.dh })
                cb()
                this.disabled = true
              })
              .catch(() => {})
          })
        } else {
          return this.$alert('暂无记录，无法保存！')
        }
      })
    },
    btnClick () {
      this.get()
    },
    completeSelect ({ prop, v }) {
      if (prop === 'hzms') {
        const flag = v === '员工'
        const item = this.formItems[this.formItems.length - 2]
        item.label = flag ? '多位员工' : '多种颜色'
        item.prop = flag ? 'yggh2' : 'dzys'
        item.sendKey = flag ? 'ygmc' : 'ysmc'
        item.api = flag ? 'getStaff' : 'getColor'
      }
      // this.submit('get')
    },
    listRowClick (r) {
      this.currentRow = r
      this.activeIndex = r.dh
    },
    listDblclick (row) {
      this.tabIndex = '添加列表'
      this.$api.getProductionConvergenceByDh({ dh: row.dh }).then((data) => {
        if (data.res.length) {
          this.currentRow = data.res[0]
          this.currentRow.yggh2 &&
            (this.currentRow.yggh2 = this.currentRow.yggh2.split(','))
          this.$refs.autoForm.initForm(this.currentRow)
          this.tableData = data.res
        }
      })
    },
    selectChange (rows) {
      this.selectedFashions = rows
    },
    update () {
      if (this.currentRow == null) return this.$alert('请选择要修改的数据！')
      this.listDblclick(this.currentRow)
    },
    updatesave (cb) {
      this.submit('update', cb)
    },
    updatecancel () {
      this.$refs.autoForm.initForm(this.currentRow)
      this.tableData = [this.currentRow]
    },
    add () {
      this.initData()
    },
    addsave (cb) {
      this.submit('add', cb)
    },
    addcancel () {
      this.$refs.autoForm.initForm(this.currentRow)
      this.tableData = [this.currentRow]
    },
    del () {
      if (!this.activeIndex) { return this.$message.info('请先选择要删除的数据！') }
      this.$api
        .delProductionConvergence({ dh: this.activeIndex })
        .then((res) => {
          this.currentRow = null
          this.activeIndex = -1
          this.$refs.searchTable2.request()
        })
    },
    editChange ({ action, edit, cb }) {
      if (action === 'del') {
        this.disabled = true
      } else if (!cb) {
        this.disabled = edit === 'save'
      }
      this[action](cb)
    }
  }
}
</script>
