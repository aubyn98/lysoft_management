import { num, month } from '@/common/utils/pattern'
import { math } from 'aubyn-common'
export const formItems = [
  {
    label: '名称',
    prop: 'mc',
    style: { width: '250px' },
    placeholder: '请输入名称',
    /* elType: 'autocomplete',
    api: 'getStaff',
    relation: ['yggh'],
    icon: true, */
    rules: [{ trigger: 'focus', required: true, message: '请输入名称' }]
  }, {
    label: '原始价值',
    prop: 'ysjz',
    placeholder: '请输入原始价值',
    style: { width: '250px' },
    rules: [{ trigger: 'focus', required: true, message: '请输入原始价值' }, { trigger: 'focus', pattern: num, message: '请输入数字' }]
  },
  {
    label: '残值率 % ',
    prop: 'czl',
    placeholder: '请输入残值率%',
    style: { width: '250px' },
    rules: [{ trigger: 'focus', required: true, message: '请输入残值率%' }, { trigger: 'focus', pattern: num, message: '请输入数字' }]
  },
  {
    label: '折旧月份',
    prop: 'zjyf',
    placeholder: '折旧月份',
    style: { width: '250px' },
    rules: [{ trigger: 'focus', pattern: month, message: '请输入正确月份' }]
  }, {
    label: '',
    labelWidth: '0px',
    prop: 'blank_1',
    style: { width: 'calc(100% - 1000px)' },
    elType: 'blank'
  }, {
    label: '购入日期',
    prop: 'grrq',
    placeholder: '请选择日期',
    style: { width: '250px' },
    elType: 'date',
    defaultVal: new Date(),
    rules: [{ trigger: 'focus', required: true, message: '请选择日期' }]
  }, {
    label: '剩余价值',
    prop: 'syjz',
    // placeholder: '输入剩余价值',
    style: { width: '250px' },
    // rules: [{ trigger: 'focus', pattern: num, message: '请输入数字' }],
    readonly: true,
    computed (form) {
      const surplus = math.subtract(form.ysjz || 0, math.multiply(form.ysjz || 0, (form.czl || 100) / 100))
      const step = math.divide(surplus, 12)
      const differ = Date.now() - new Date(new Date(form.grrq).getTime() + 2592000000).getTime()
      if (differ >= 0) {
        const num = Math.ceil(math.divide(differ, 2592000000))
        return math.subtract(surplus, math.multiply(step, num)).toFixed(4)
      }
      return surplus
    }
  }, {
    label: '备注',
    prop: 'bz',
    placeholder: '输入备注',
    style: { width: '500px' },
    elType: 'textarea'
  }
]
export const formItemsList = [
  {
    label: '开始日期',
    prop: 'ksrq',
    style: { width: '130px' },
    placeholder: '请选择开始日期',
    elType: 'date'
  },
  {
    label: '结束日期',
    prop: 'jsrq',
    placeholder: '请选择结束日期',
    style: { width: '130px' },
    elType: 'date'
  }, {
    label: '名称',
    prop: 'mc',
    style: { width: '130px' },
    placeholder: '请输入名称'
  }
]
