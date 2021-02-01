import { num } from '@/common/utils/pattern'
import { math } from 'aubyn-common'
export const formItems = [
  {
    label: '项目名称',
    prop: 'xmmc',
    style: { width: '250px' },
    placeholder: '请输入项目名称',
    /* elType: 'autocomplete',
    api: 'getStaff',
    relation: ['yggh'],
    icon: true, */
    rules: [{ trigger: 'focus', required: true, message: '请输入项目名称' }]
  }, {
    label: '借贷类型',
    prop: 'jd_lx',
    placeholder: '请选择借贷类型',
    style: { width: '250px' },
    elType: 'select',
    defaultVal: '借',
    listData: ['借', '贷'],
    hideClearable: true,
    rules: [{ trigger: 'focus', required: true, message: '请选择借贷类型' }]
  }, {
    label: '借贷人',
    prop: 'jddx',
    placeholder: '请输入借贷人',
    style: { width: '250px' },
    rules: [{ trigger: 'focus', required: true, message: '请输入借贷人' }]
  }, {
    label: '日期',
    prop: 'rq',
    placeholder: '请选择日期',
    style: { width: '250px' },
    elType: 'date',
    defaultVal: new Date(),
    rules: [{ trigger: 'focus', required: true, message: '请选择日期' }]
  },
  {
    label: '',
    labelWidth: '0px',
    prop: 'blank_1',
    style: { width: 'calc(100% - 1000px)' },
    elType: 'blank'
  }, {
    label: '本金',
    prop: 'bj',
    placeholder: '请输入金额',
    style: { width: '250px' },
    rules: [{ trigger: 'focus', required: true, message: '请输入金额' }, { trigger: 'focus', pattern: num, message: '请输入数字' }]
  }, {
    label: '利息',
    prop: 'lx',
    placeholder: '输入利息',
    style: { width: '250px' },
    rules: [{ trigger: 'focus', pattern: num, message: '请输入数字' }],
    icon: true
  }, {
    label: '合计',
    prop: 'hj',
    placeholder: '输入备注',
    style: { width: '250px' },
    rules: [{ trigger: 'focus', pattern: num, message: '请输入数字' }],
    readonly: true,
    computed (form) {
      return math.add(form.bj || 0, form.lx || 0)
    }
  }, {
    label: '',
    labelWidth: '0px',
    prop: 'blank_2',
    style: { width: 'calc(100% - 750px)' },
    elType: 'blank'
  }, {
    label: '备注',
    prop: 'bz',
    placeholder: '输入备注',
    style: { width: '1000px' },
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
    label: '项目名称',
    prop: 'xmmc',
    style: { width: '130px' },
    placeholder: '请输入项目名称'
  }
]
