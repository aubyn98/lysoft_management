import { num } from '@/common/utils/pattern'
export const formItems = [
  {
    label: '开始日期',
    prop: 'ksrq',
    style: { width: '130px' },
    placeholder: '请选择日期',
    elType: 'date'
  },
  {
    label: '结束日期',
    prop: 'jsrq',
    placeholder: '请选择日期',
    style: { width: '130px' },
    elType: 'date'
  }, {
    label: '员工名称',
    prop: 'ygmc',
    relation: ['yggh'],
    style: { width: '130px' },
    placeholder: '请输入员工名称',
    elType: 'autocomplete',
    api: 'getStaff'
  }, {
    label: '员工工号',
    prop: 'yggh',
    relation: ['ygmc'],
    style: { width: '130px' },
    placeholder: '请输入员工工号',
    elType: 'autocomplete',
    api: 'getStaff'
  },
  {
    label: '结算类型',
    prop: 'jslx',
    style: { width: '130px' },
    placeholder: '请选择结算类型',
    elType: 'select',
    listData: ['全部', '员工产量登记', '工票扫描', '产量登记', '产量汇合', '吊挂工资'],
    defaultVal: '全部'
  }, {
    label: '暂压金额',
    prop: 'zyje',
    placeholder: '输入金额',
    style: { width: '130px' },
    rules: [{ trigger: 'focus', pattern: num, message: '请输入数字' }]
  }/* , {
    label: '结算状态',
    prop: 'jszt',
    style: { width: '250px' },
    placeholder: '请选择结算状态',
    elType: 'select',
    listData: ['未结算', '结算'],
    defaultVal: '未结算'
  } */
]
