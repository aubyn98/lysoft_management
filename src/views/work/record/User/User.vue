<template>
  <div class="page">
    <header-btn
      border
      :hide-edit="!$permission([{ mc: '客户档案', xg: true }])"
      @change="editChange"
      :activeIndex="xxDataIndex"
      :disabled="disabled_header"
      :defaultTab.sync="tabIndex"
    >
    </header-btn>
    <div class="page-RowContent">
      <div class="page-RowContent-item" style="width: 200px">
        <search-table
          small
          hideSearch
          hideLoading
          name="UserTable"
          ref="Xx"
          api="getUser"
          :columns.sync="columnsXx"
          @row-click="rowClickXx"
          @reqStart="disabled_header = true"
          @reqEnd="disabled_header = false"
        />
      </div>
      <div class="page-RowContent-item" style="width: 250px">
        <auto-form
          ref="autoForm"
          :disabled="disabled"
          style="width: 100%"
          :formItems="formItems"
          @btn-click="fromBtnClick"
          @icon-click="fromIconClick"
        />
      </div>
      <div class="page-RowContent-item" data-right>
        <el-tabs v-model="editableTabsValue" type="card" data-home>
          <el-tab-pane
            v-for="item in editableTabs"
            :key="item.prop"
            :label="item.label"
            :name="item.prop"
          >
            <edit-table
              hideNum
              hide-sums
              hide-add-menu
              hide-del-menu
              :context-menus="contextMenus"
              @context-click="contextClick($event, 'editTable_' + item.prop)"
              :ref="'editTable_' + item.prop"
              name="UserEditTable"
              :columns.sync="columnsEdit"
              :disabled="disabled"
            />
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import { record } from '@/common/mixins'
import formItems from './formItems'
import { columnsXx, columnsEdit } from './columns'
export default {
  props: {
    visible: {}
  },
  mixins: [record],
  data () {
    return {
      // 选择的tab
      editTab: '客户信息',
      tabIndex: '客户信息',
      // 操作
      delApi: {
        api: 'delUser',
        prop: 'id'
      },
      // 弹窗显示
      dialogKhLxVisible: false,
      dialogMemorandumVisible: false,
      // 操作禁用
      disabled_header: false,
      // 列信息
      columnsXx,
      columnsEdit,
      // 表单项
      formItems,
      authDict: {},
      authList: [],
      editableTabsValue: 'JBSZ',
      editableTabs: [],
      contextMenus: [
        /* { label: '全选', prop: 'all' },
        { label: '反选', prop: 'contrary' }, */
        { label: '浏览全选', prop: 'all_ll' },
        { label: '浏览反选', prop: 'contrary_ll' },
        { label: '修改全选', prop: 'all_xg' },
        { label: '修改反选', prop: 'contrary_xg' }
      ]
    }
  },
  created () {},
  mounted () {
    this.$api.getAllAuth().then(({ res }) => {
      const editableTabs = []
      const authDict = res.reduce((t, it) => {
        if (it.bt === '鐢熶骇' || it.bt === '会员') {
          return t
        }
        // eslint-disable-next-line
        (it.ll = it.ll == 1), (it.xg = it.xg == 1);
        const camelChars = this.$str.py.getCamelChars(it.bt)
        if (t[camelChars]) {
          t[camelChars].push(it)
        } else {
          editableTabs.push({ label: it.bt, prop: camelChars })
          t[camelChars] = [it]
        }
        return t
      }, {})
      this.authDict = authDict
      this.authList = this.$format.copy(authDict)
      this.editableTabs = editableTabs
      this.$nextTick(() => {
        this.initTable()
      })
    })
  },
  methods: {
    contextClick (prop, name) {
      const data = this.$refs[name][0].submitTable()
      data.forEach(it => {
        if (prop === 'all_ll') { it.ll = true; return }
        if (prop === 'contrary_ll') { it.ll = !it.ll; return }
        if (prop === 'all_xg') { it.ll = it.xg = true; return }
        if (prop === 'contrary_xg') { it.ll = it.xg = !it.xg }
      })
      this.$refs[name][0].initTableData(data, false)
    },
    initTable () {
      this.editableTabs.forEach(t => {
        this.$refs['editTable_' + t.prop][0].initTableData(
          this.authList[t.prop],
          false
        )
      })
    },
    // 表单相关---------------------------------------------
    fromBtnClick (prop) {
      if (!this.currentRow) return
      this.dialogMemorandumVisible = true
    },
    fromIconClick (prop) {
      if (prop === 'lx') this.dialogKhLxVisible = true
    },
    // 表格弹窗 -客户类型相关---------------------------------------------
    selectEndKhLx (rows) {
      if (!rows[0]) return this.$message.info('请至少选择一项！')
      const { id, index, ...row } = rows[0]
      this.$refs.autoForm.setFieldsValue(row)
      this.dialogKhLxVisible = false
    },
    addAction () {
      this.authList = this.$format.copy(this.authDict)
      this.initTable()
    },
    updatecancelAction () {
      this.initTable()
    },
    // 表格相关---------------------------------------------
    rowClickXx (row) {
      if (!this.disabled) {
        return
      }
      this.initForm(row)
      this.xxDataIndex = 0
      this.currentRow = this.$format.copy(row)
      this.rowClickXxAction && this.rowClickXxAction(row)
      this.$api.getAuthByUser({ user: row.user }).then(({ res }) => {
        Object.keys(this.authDict).forEach(k => {
          this.authList[k].forEach(auth => {
            if (
              !res.some(it => {
                if (it.mc === auth.mc) {
                  // eslint-disable-next-line
                  (auth.ll = it.ll == 1), (auth.xg = it.xg == 1);
                  return true
                }
              })
            ) {
              auth.ll = false
              auth.xg = false
            }
          })
        })
        this.initTable()
      })
    },
    rowDblclick () {},
    rowClickXxAction () {},
    // 顶部编辑按钮相关---------------------------------------------
    getSendData () {
      return new Promise(resolve => {
        this.$refs.autoForm.submitForm().then(form => {
          let list = []
          this.editableTabs.forEach(t => {
            list.push(...this.$refs['editTable_' + t.prop][0].submitTable())
          })
          list = list.filter(it => {
            return it.ll || it.xg
          })
          resolve({ ...form, list })
        })
      })
    },
    addOrUpdate (api, fn) {
      this.getSendData().then(data => {
        if (data.password !== data.qrmm) {
          return this.$message.info('2次密码不一致')
        }
        this.$api[api](data).then(({ id }) => {
          const { list, ...result } = data
          id && (result.id = id)
          this.currentRow = result
          this.initForm(result)
          this.disabled = true
          this.xxDataIndex = 0
          this.refresh()
          fn()
        })
      })
    },
    addsave (fn) {
      this.addOrUpdate('addUser', fn)
    },
    updatesave (fn) {
      this.addOrUpdate('updateUser', fn)
    }
  }
}
</script>
