<template>
  <el-form
    class="auto-form"
    :model="ruleForm"
    :rules="rules"
    ref="ruleForm"
    size="mini"
    :label-position="labelPosition"
  >
    <el-form-item
      :label="item.label"
      :prop="item.prop"
      :style="item.style"
      v-for="item in formItems"
      :key="item.prop"
      :label-width="item.labelWidth || '90px'"
    >
      <el-input
        v-if="!item.elType"
        v-model="ruleForm[item.prop]"
        :placeholder="item.placeholder"
        :disabled="disabled"
        :readonly="item.readonly"
        @input="input($event, item.prop)"
        :type="item.type || 'text'"
      ></el-input>
      <el-button
        v-else-if="item.elType === 'button'"
        type="primary"
        :disabled="disabled"
        @click="$emit('btn-click', item.prop)"
        >{{ item.elText }}</el-button
      >
      <el-button
        v-else-if="item.elType === 'ndbutton'"
        type="primary"
        @click="$emit('btn-click', item.prop)"
        >{{ item.elText }}</el-button
      >
      <el-input
        v-else-if="item.elType === 'textarea'"
        type="textarea"
        placeholder="请输入内容"
        :disabled="disabled"
        v-model="ruleForm[item.prop]"
      >
      </el-input>
      <el-autocomplete
        style="width: 100%"
        v-else-if="item.elType === 'autocomplete'"
        v-model="ruleForm[item.prop]"
        :fetch-suggestions="(q, cb) => querySearchAsync(q, cb, item)"
        placeholder="请输入内容"
        :disabled="disabled"
        :value-key="item.sendKey || item.prop"
        @select="
          autocompleteSelect($event, item.relation, item.prop, item.sendKey)
        "
        ><i
          v-if="item.icon"
          class="el-icon-more-outline el-input__icon"
          slot="suffix"
          @click="$emit('icon-click', item.prop)"
        >
        </i
      ></el-autocomplete>
      <au-area
        ref="auArea"
        @change="areaChange"
        :disabled="disabled"
        :defaultArea="ruleForm"
        v-else-if="item.elType === 'area'"
        style="width: 100%"
      />
      <el-select
        style="width: 100%"
        v-model="ruleForm[item.prop]"
        filterable
        :clearable="!item.hideClearable"
        :disabled="disabled"
        placeholder="请选择"
        v-else-if="item.elType === 'select'"
        @focus="
          item.api &&
            $api[item.api]().then((data) => {
              item.listData = data.res.map((c) => c[item.prop]);
            })
        "
      >
        <el-option
          v-for="item in item.listData"
          :key="item"
          :label="item"
          :value="item"
        >
        </el-option>
      </el-select>
      <el-checkbox
        :disabled="disabled"
        v-else-if="item.elType === 'checkbox'"
        v-model="ruleForm[item.prop]"
        >{{ item.elText }}</el-checkbox
      >
      <el-date-picker
        style="width: 100%"
        :disabled="disabled"
        v-else-if="item.elType === 'daterange'"
        v-model="ruleForm[item.prop]"
        type="daterange"
        align="right"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :placeholder="item.placeholder"
        :picker-options="pickerOptions"
      >
      </el-date-picker>
      <el-date-picker
        style="width: 100%"
        :disabled="disabled"
        v-else-if="item.elType === 'date'"
        v-model="ruleForm[item.prop]"
        type="date"
        placeholder="选择日期"
        value-format="yyyy-MM-dd"
      >
      </el-date-picker>
      <div v-else-if="item.elType === 'blank'"></div>
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
    this.formItems.forEach(it => {
      if (it.rules) {
        rules[it.prop] = it.rules
      }
      if (it.CamelChars) {
        this.$watch(`ruleForm.${it.prop}`, val => {
          if (typeof it.CamelChars === 'string') {
            this.ruleForm[it.CamelChars] = this.$str.py.getCamelChars(val)
          } else if (it.CamelChars instanceof Array) {
            it.CamelChars.forEach(k => {
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
    const $el = this.$refs.ruleForm.$el
    $el.forEach((it, i) => {
      it.addEventListener('keypress', this.kf[i] = (e) => {
        if (e.key === 'Enter' && e.keyCode === 13) {
          const $next = $el[i + 1]
          $next && $next.focus()
        }
      })
    })
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
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      }
    }
  },
  computed: {

  },
  methods: {
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
        .filter(c => c.computed)
        .map(({ prop, computed }) => ({ prop, computed }))
      computeds.forEach(c => {
        if (typeof c.computed === 'function') {
          this.ruleForm[c.prop] = c.computed(this.ruleForm)
        } else if (c.computed.props.includes(prop)) {
          this.ruleForm[c.prop] = c.computed.handler(this.ruleForm)
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
            return { ...t, [item.prop]: item.num ? 0 : item.defaultVal || '' }
          }
        }, {})
      }
    },
    handleIconClick () {},
    autocompleteSelect (v, relation, prop, sendKey) {
      relation &&
        relation.forEach(key => {
          this.ruleForm[key] = v[key]
        })
      this.$emit('autocomplete-select', { v, prop, sendKey })
    },
    querySearchAsync (q, cb, item) {
      this.$api[item.api]({ [item.sendKey || item.prop]: q }, true).then(
        data => {
          cb(data.res)
        },
        e => {}
      )
    },
    setFieldsValue (values) {
      Object.keys(values).forEach(k => {
        this.ruleForm[k] = values[k]
        this.input(values[k], k)
      })
    },
    submitForm (formName = 'ruleForm') {
      return new Promise((resolve, reject) => {
        this.$refs[formName].validate(valid => {
          if (valid) {
            resolve(
              Object.keys(this.ruleForm).reduce((t, k) => {
                if (
                  (!k.includes('blank') &&
                    this.formItems.some(it => it.prop === k)) ||
                  this.includeKeys.includes(k)
                ) {
                  t[k] = this.ruleForm[k]
                }
                return t
              }, {})
            )
          } else {
            reject(new Error('未通过验证'))
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
<style lang="scss" scoped>
.auto-form {
  display: flex;
  flex-wrap: wrap;
  padding: 10px 6px 4px 0px;
  box-sizing: border-box;
  flex-shrink: 1;
}
</style>
