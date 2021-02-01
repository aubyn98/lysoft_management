<template>
<el-form
    class="auto-form"
    :model="ruleForm"
    :rules="rules"
    ref="ruleForm"
    size="mini"
    :label-position="labelPosition">
    <el-form-item
        :label="item.label"
        :prop="item.prop"
        :style="item.style"
        v-for="item in formItems"
        :key="item.prop"
        :label-width="item.labelWidth || '90px'">
        <el-input
            v-if="!item.elType"
            v-model="ruleForm[item.prop]"
            :placeholder="item.placeholder"
            :disabled="disabled"
            :readonly="item.readonly"
            @input="input($event, item.prop)"
            @keypress.native.enter="$emit('enter', item.prop,ruleForm)"
            :type="item.type || 'text'"><i v-if="item.icon" class="el-icon-more-outline el-input__icon" slot="suffix" @click="$emit('icon-click', item.prop)"></i></el-input>
        <el-button v-else-if="item.elType === 'button'" type="primary" :disabled="disabled" @click="$emit('btn-click', item.prop)">{{ item.elText }}</el-button>
        <el-button v-else-if="item.elType === 'ndbutton'" type="primary" @click="$emit('btn-click', item.prop)">{{ item.elText }}</el-button>
        <el-input
            v-else-if="item.elType === 'textarea'"
            type="textarea"
            autosize
            placeholder="请输入内容"
            :disabled="disabled"
            :readonly="item.readonly"
            @keypress.native.enter="$emit('enter', item.prop)"
            v-model="ruleForm[item.prop]"></el-input>
        <el-autocomplete
            style="width: 100%"
            v-else-if="item.elType === 'autocomplete'"
            v-model="ruleForm[item.prop]"
            :fetch-suggestions="(q, cb) => querySearchAsync(q, cb, item)"
            placeholder="请输入内容"
            :disabled="disabled"
            :value-key="item.sendKey || item.prop"
            :trigger-on-focus="true"
            highlight-first-item
            clearable
            @keypress.native.enter="$emit('enter', item.prop)"
            @select="autocompleteSelect($event, item)">
            <i v-if="item.icon" class="el-icon-more-outline el-input__icon" slot="suffix" @click="$emit('icon-click', item.prop)"></i>
        </el-autocomplete>
        <au-area
            ref="auArea"
            @change="areaChange"
            @keypress.native.enter="$emit('enter', item.prop)"
            :disabled="disabled"
            :defaultArea="ruleForm"
            v-else-if="item.elType === 'area'"
            style="width: 100%" />
        <el-select
            style="width: 100%"
            v-model="ruleForm[item.prop]"
            filterable
            :multiple="item.multiple"
            :collapse-tags="item.collapseTags"
            :clearable="!item.hideClearable"
            :disabled="disabled"
            placeholder="请选择"
            v-else-if="item.elType === 'select'"
            :value-key="item.sendKey || item.prop"
            remote
            :remote-method="
          (q) => {
            item.api && remoteMethod(item, q);
          }
        "
            @keypress.native.enter="$emit('enter', item.prop)"
            @change="autocompleteSelect($event, item)"
            @focus="item.api && remoteMethod(item)">
            <el-option v-for="it in item.listData" :key="item.objVal ? (it.key || it[item.sendKey || item.prop]) : it" :label="item.objVal ? it[item.sendKey || item.prop] : it" :value="item.objVal ? (it.key || it[item.sendKey || item.prop]) : it"></el-option>
        </el-select>
        <el-checkbox :disabled="disabled" v-else-if="item.elType === 'checkbox'" v-model="ruleForm[item.prop]" @change="checkboxChange($event, item)">{{ item.elText }}</el-checkbox>
        <el-date-picker
            style="width: 100%"
            :disabled="disabled"
            :picker-options="pickerOptions(item.prop)"
            :clearable="!item.hideClearable"
            v-else-if="item.elType === 'date'"
            v-model="ruleForm[item.prop]"
            :type="item.type || 'date'"
            :readonly="item.readonly"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
            @change="(v)=>{$emit('date-change', v, item.prop);input(v, item.prop)}"></el-date-picker>
        <div v-else-if="item.elType === 'blank'">{{ item.elText }}</div>
    </el-form-item>
</el-form>
</template>

<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    tab: {
      type: Boolean,
      default: true
    },
    formItems: {
      type: Array,
      required: true,
      default: () => []
    },
    labelPosition: {
      type: String,
      default: 'right'
    },
    includeKeys: {
      type: Array,
      default: () => []
    }
  },
  created () {
    const rules = {}
    this.formItems.forEach((it) => {
      if (it.rules) {
        rules[it.prop] = it.rules
      }
      if (it.CamelChars) {
        this.$watch(`ruleForm.${it.prop}`, (val) => {
          if (typeof it.CamelChars === 'string') {
            this.ruleForm[it.CamelChars] = this.$str.py.getCamelChars(val)
          } else if (it.CamelChars instanceof Array) {
            it.CamelChars.forEach((k) => {
              this.ruleForm[k] = this.$str.py
                .getCamelChars(val)
                .replace(/ /g, '')
            })
          }
        })
      }
    })
    this.rules = rules
  },
  beforeDestroy () {
    this.$refs.ruleForm.$el.forEach((it, i) => {
      it.removeEventListener('keypress', this.kf[i])
    })
  },
  mounted () {
    this.initForm()
    if (this.tab) {
      const $el = this.$refs.ruleForm.$el
      $el.forEach((it, i) => {
        it.addEventListener(
          'keypress',
          (this.kf[i] = (e) => {
            if (e.key === 'Enter' && e.keyCode === 13) {
              e.preventDefault()
              const $next = $el[i + 1]
              $next && $next.focus()
            }
          })
        )
      })
    }
  },
  data () {
    return {
      kf: [],
      initArea: {
        sfmc: '',
        sqmc: '',
        xqmc: ''
      },
      ruleForm: {},
      rules: {},
      rqDict: {},
      monthDict: {}
    }
  },
  /* watch: {
    ruleForm: {
      handler (val) {
        this.$emit('change', this.$format.copy(val))
      },
      deep: true
    }
  }, */
  computed: {},
  methods: {
    checkboxChange ($event, item) {
      item.excludeKeys &&
        item.excludeKeys.forEach((k) => {
          this.ruleForm[k] = false
        })
      this.$emit('checkbox-change', $event, item.prop)
    },
    pickerOptions (prop) {
      const shortcuts = [
        ...this.shortcuts(prop),
        ...this.getMonthShortcuts(prop)
      ]
      if (prop.startsWith('ksrq')) return { shortcuts }
      if (prop.startsWith('jsrq')) {
        const ksrq = this.ruleForm['ksrq' + prop.substring(4)]
        return {
          ...(
            ksrq
              ? {
                disabledDate: (time) => {
                  return time.getTime() < new Date(ksrq).getTime() - 28800000
                }
              }
              : { disabledDate: () => true }
          ),
          shortcuts
        }
      }
      /* if (prop === 'ksrq') return { shortcuts }
      if (prop === 'jsrq') {
        const ksrq = this.ruleForm.ksrq
        return {
          ...(ksrq
            ? {
              disabledDate: (time) => {
                return time.getTime() < new Date(ksrq).getTime() - 28800000
              }
            }
            : { disabledDate: () => true }
          ),
          shortcuts
        }
      } */
      return {}
    },
    getMonthShortcuts (prop) {
      const year = new Date().getFullYear()
      const list = []
      for (let month = 1; month < 13; month++) {
        if (!this.monthDict[month]) {
          let startDate = new Date(year, month - 1, 1)
          let endDate = new Date(year, month, 0)
          startDate.setTime(
            startDate.getTime() - startDate.getTimezoneOffset() * 60000
          )
          endDate.setTime(
            endDate.getTime() - endDate.getTimezoneOffset() * 60000
          )
          startDate = startDate.toISOString().substring(0, 10)
          endDate = endDate.toISOString().substring(0, 10)
          this.monthDict[month] = { startDate, endDate }
        }
        list.push({
          text: (month < 10 ? '0' + month : month) + ' 月',
          onClick: (picker) => {
            const { startDate, endDate } = this.monthDict[month]
            const str = prop.substring(4)
            this.ruleForm['ksrq' + str] = startDate
            this.ruleForm['jsrq' + str] = endDate
            picker.$emit('pick', prop.startsWith('ksrq') ? startDate : endDate)
            /* this.ruleForm.ksrq = startDate
            this.ruleForm.jsrq = endDate
            picker.$emit('pick', prop === 'ksrq' ? startDate : endDate) */
          }
        })
      }
      return list
    },
    shortcuts (prop) {
      return Object.keys(this.$format.dateDict).map((k) => {
        return {
          text: k,
          onClick: (picker) => {
            const { startDate, endDate } = this.$format.dateDict[k]
            const str = prop.substring(4)
            this.ruleForm['ksrq' + str] = startDate
            this.ruleForm['jsrq' + str] = endDate
            picker.$emit('pick', prop.startsWith('ksrq') ? startDate : endDate)
            /* this.ruleForm.ksrq = startDate
            this.ruleForm.jsrq = endDate
            picker.$emit('pick', prop === 'ksrq' ? startDate : endDate) */
          }
        }
      })
    },
    enter () {
      this.$els.some((it, i) => {
        if (it === document.activeElement) {
          const $next = this.$els[i + 1]
          $next && $next.focus()
          return true
        }
      })
    },
    input (val, prop) {
      const computeds = this.formItems
        .filter((c) => c.computed)
        .map(({ prop, computed }) => ({ prop, computed }))
      computeds.forEach((c) => {
        if (typeof c.computed === 'function') {
          this.ruleForm[c.prop] = c.computed.call(this, this.ruleForm)
        } else if (c.computed.props.includes(prop)) {
          this.ruleForm[c.prop] = c.computed.handler.call(this, this.ruleForm)
        }
      })
    },
    areaChange ({ key, val }) {
      this.ruleForm[key] = val
    },
    initForm (value, flag = false) {
      if (value) {
        if (flag) {
          this.ruleForm = this.formItems.reduce((t, it) => {
            if (it.elType === 'checkbox') {
              // eslint-disable-next-line eqeqeq
              return {
                ...t,
                [it.prop]:
                  typeof value[it.prop] === 'boolean'
                    ? value[it.prop]
                    // eslint-disable-next-line eqeqeq
                    : value[it.prop] == 1
              }
            } else {
              return { ...t, [it.prop]: value[it.prop] }
            }
          }, {})
        } else {
          this.ruleForm = this.$format.copy(value)
        }
        this.$nextTick(() => {
          this.$refs.auArea && this.$refs.auArea[0].refresh()
        })
      } else {
        this.ruleForm = this.formItems.reduce((t, item) => {
          if (item.elType === 'area') {
            return {
              ...t,
              ...this.$format.copy(this.initArea)
            }
          } else if (item.elType === 'checkbox') {
            return { ...t, [item.prop]: false }
          } else {
            return {
              ...t,
              [item.prop]: item.num
                ? 0
                : (typeof item.defaultVal === 'function'
                  ? item.defaultVal()
                  : item.defaultVal) || ''
            }
          }
        }, {})
      }
    },
    handleIconClick () {},
    autocompleteSelect (v, item) {
      const { relation, prop, sendKey } = item
      relation &&
        relation.forEach((key) => {
          if (key.indexOf('->') === -1) return (this.ruleForm[key] = v[key])
          const [oKey, nKey] = key.split('->')
          this.ruleForm[nKey] = v[oKey]
        })
      this.$emit('autocomplete-select', { v, prop, sendKey, form: this.ruleForm })
    },
    remoteMethod (item, e) {
      this.$api[item.api](
        {
          [item.sendKey || item.prop]: e || '',
          ...(item.superKeys
            ? item.superKeys.reduce((t, k) => {
              t[k] = this.ruleForm[k] || ''
              return t
            }, {})
            : {})
        },
        true
      ).then((data) => {
        item.listData = data.res
      })
    },
    querySearchAsync (q, cb, item) {
      this.$api[item.api](
        {
          [item.sendKey || item.prop]: q,
          ...(item.superKeys
            ? item.superKeys.reduce((t, k) => {
              t[k] = this.ruleForm[k] || ''
              return t
            }, {})
            : {})
        },
        true
      ).then(
        (data) => {
          cb(data.res)
        },
        (e) => {}
      )
    },
    clearValidate () {
      this.$refs.ruleForm.clearValidate()
    },
    setFieldsValue (values) {
      Object.keys(values).forEach((k) => {
        this.ruleForm[k] = values[k]
        this.input(values[k], k)
      })
    },
    submitForm (formName = 'ruleForm') {
      return new Promise((resolve, reject) => {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            resolve(
              Object.keys(this.ruleForm).reduce((t, k) => {
                if (
                  (!k.includes('blank') &&
                    this.formItems.some((it) => it.prop === k)) ||
                  this.includeKeys.includes(k)
                ) {
                  t[k] = this.ruleForm[k]
                }
                return t
              }, {})
            )
          } else {
            // reject(new Error('未通过验证'))
            return false
          }
        })
      })
    },
    resetForm (formName = 'ruleForm') {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="scss">
.auto-form {
    display: flex;
    flex-wrap: wrap;
    padding: 10px 6px 4px 0px;
    box-sizing: border-box;
    flex-shrink: 1;
    background-color: white;

    .el-input {
        display: block !important;
    }

    .el-input__inner {
        padding: 0 8px !important;
    }

    .el-date-editor .el-input__inner {
        padding: 0 30px !important;
    }

    .el-form-item--mini.el-form-item {
        margin-bottom: 13px;
    }
}
</style>
