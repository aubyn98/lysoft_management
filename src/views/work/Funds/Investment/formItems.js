import { num } from '@/common/utils/pattern'
// import { math } from 'aubyn-common'
export const formItems = [
  {
    label: '日期',
    prop: 'rq',
    placeholder: '请选择日期',
    style: { width: '250px' },
    elType: 'date',
    defaultVal: new Date(Date.now() + 28800000).toISOString().substring(0, 10),
    rules: [{ trigger: 'focus', required: true, message: '请选择日期' }]
  }, {
    label: '投资人',
    prop: 'tzzmc',
    style: { width: '250px' },
    placeholder: '请输入名称',
    /* elType: 'autocomplete',
    api: 'getStaff',
    relation: ['yggh'],
    icon: true, */
    rules: [{ trigger: 'focus', required: true, message: '请输入名称' }]
  }, {
    label: '认缴金额',
    prop: 'rjje',
    placeholder: '请输入认缴金额',
    style: { width: '250px' },
    rules: [{ trigger: 'focus', required: true, message: '请输入认缴金额' }, { trigger: 'focus', pattern: num, message: '请输入数字' }]
  },
  {
    label: '实缴金额',
    prop: 'sjje',
    placeholder: '请输入实缴金额',
    style: { width: '250px' },
    rules: [{ trigger: 'focus', required: true, message: '请输入实缴金额' }, { trigger: 'focus', pattern: num, message: '请输入数字' }]
  }, {
    label: '',
    labelWidth: '0px',
    prop: 'blank_1',
    style: { width: 'calc(100% - 1000px)' },
    elType: 'blank'
  }, {
    label: '已缴金额',
    prop: 'yj',
    placeholder: '请输入已缴金额',
    style: { width: '250px' },
    rules: [{ trigger: 'focus', required: true, message: '请输入已缴金额' }, { trigger: 'focus', pattern: num, message: '请输入数字' }]
  }, {
    label: '占股 %',
    prop: 'zg',
    placeholder: '请输入占股 %',
    style: { width: '250px' },
    rules: [{ trigger: 'focus', required: true, message: '请输入占股 %' }, { trigger: 'focus', pattern: num, message: '请输入数字' }]
  }, {
    label: '收款账号',
    prop: 'skzh',
    placeholder: '请输入收款账号',
    style: { width: '250px' },
    rules: [{ trigger: 'focus', required: true, message: '请输入收款账号' }, { trigger: 'focus', pattern: num, message: '请输入数字' }]
  }, {
    label: '',
    labelWidth: '0px',
    prop: 'blank_2',
    style: { width: 'calc(100% - 750px)' },
    elType: 'blank'
  }, {
    label: '备注',
    prop: 'bz',
    placeholder: '请输入备注',
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
    label: '名称',
    prop: 'mc',
    style: { width: '130px' },
    placeholder: '请输入名称'
  }
]
