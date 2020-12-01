<template>
  <el-dialog
    :visible="visible"
    title="公司档案"
    @close="
      () => {
        $emit('update:visible', false);
        this.$emit('close');
      }
    "
  >
    <header-btn hideEdit>
      <el-button
        v-if="$permission([{mc:'公司档案',xg:true}])"
        :type="edit ? 'success' : 'primary'"
        size="mini"
        @click="edit ? save() : (edit = !edit)"
        >{{ edit ? "保存" : "修改" }}</el-button
      >
      <el-button type="warning" size="mini" @click="cancel" v-if="edit && $permission([{mc:'公司档案',xg:true}])"
        >撤销</el-button
      >
    </header-btn>
    <div>
      <el-tabs v-model="editableTabsValue" type="card" data-home>
        <el-tab-pane
          v-for="item in editableTabs"
          :key="item.name"
          :label="item.label"
          :name="item.name"
        >
          <component :is="item.component" :formItems="item.formItems" :disabled="!edit" ref="autoForm" @btn-click="fromBtnClick"></component>
        </el-tab-pane>
      </el-tabs>
    </div>
    <Bank :visible.sync="bankVisible"  :append-to-body="true"/>
  </el-dialog>
</template>

<script type="text/javascript">
import * as formItems from './formItems'
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  created () {
    this.editableTabs.forEach(t => {
      t.formItems = formItems[t.name]
    })
  },
  mounted () {
    this.$nextTick(() => {
      this.get()
    })
  },
  data () {
    return {
      edit: false,
      editableTabsValue: 'CompanyInfo',
      editableTabs: [
        { label: '公司信息', name: 'CompanyInfo', component: 'auto-form', formItems: [] },
        { label: '系统设置', name: 'SystemSettings', component: 'CompanyTab', formItems: [] },
        // { label: '产品设置', name: 'ProductSettings', component: 'auto-form', formItems: [] },
        { label: '物料设置', name: 'MaterialSettings', component: 'auto-form', formItems: [] }/* , */
        // { label: '生产设置', name: 'ProductionSettings', component: 'auto-form', formItems: [] },
        // { label: '工资设置', name: 'WageSettings', component: 'CompanyTab', formItems: [] },
        // { label: '外发设置', name: 'OutgoingSettings', component: 'auto-form', formItems: [] },
        // { label: '财务设置', name: 'FinancialSettings', component: 'auto-form', formItems: [] },
        // { label: '通讯设置', name: 'CommSettings', component: 'auto-form', formItems: [] },
        // { label: '密码设置', name: 'PasswordSettings', component: 'auto-form', formItems: [] }
      ],
      form: {},
      bankVisible: false
    }
  },
  watch: {
    visible (val) {
      if (val) {
        this.get()
      }
    }
  },
  methods: {
    fromBtnClick () {
      this.bankVisible = true
    },
    initForm (value) {
      this.$refs.autoForm.forEach(p => {
        p.initForm(value, true)
      })
    },
    get () {
      this.$api.getCompany().then(({ res }) => {
        this.form = res
        this.initForm(res)
        this.$store.commit('changeCompany', res)
      })
    },
    async save () {
      const arr = []
      const data = await this.$refs.autoForm.reduce(async (t, p) => {
        const data = await t
        data && arr.push(data)
        return p.submitForm()
      }, Promise.resolve())
      arr.push(data)
      const newForm = arr.reduce((t, p) => ({ ...t, ...p }), {})
      this.$api.updateCompany(newForm).then(res => {
        this.edit = false
        this.$store.commit('changeCompany', newForm)
        this.form = newForm
      })
    },
    cancel () {
      this.initForm(this.form)
      this.edit = !this.edit
    }
  }
}
</script>
