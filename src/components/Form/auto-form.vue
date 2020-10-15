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
        :value-key="item.prop"
        @select="item.relation && autocompleteSelect($event, item.relation)"
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
        clearable
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
          this.ruleForm[it.CamelChars] = this.$str.py.getCamelChars(val)
        })
      }
    })
    this.rules = rules
  },
  mounted () {
    this.initForm()
  },
  data () {
    return {
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
  methods: {
    areaChange ({ key, val }) {
      this.ruleForm[key] = val
    },
    initForm (value) {
      if (value) {
        this.ruleForm = this.$format.copy(value)
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
          } else {
            return { ...t, [item.prop]: '' }
          }
        }, {})
      }
    },
    handleIconClick () {},
    autocompleteSelect (v, relation) {
      relation.forEach((key) => {
        this.ruleForm[key] = v[key]
      })
    },
    querySearchAsync (q, cb, item) {
      this.$api[item.api]({ [item.sendKey || item.prop]: q }).then(
        (data) => {
          cb(data.res)
        },
        (e) => {}
      )
    },
    setFieldsValue (values) {
      Object.keys(values).forEach((k) => {
        this.ruleForm[k] = values[k]
      })
    },
    submitForm (formName = 'ruleForm') {
      return new Promise((resolve, reject) => {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            resolve(this.ruleForm)
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
