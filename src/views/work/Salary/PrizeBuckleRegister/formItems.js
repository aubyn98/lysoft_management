import { num } from '@/common/utils/pattern'
export const formItems = [
  {
    label: '员工名称',
    prop: 'ygmc',
    style: { width: '250px' },
    placeholder: '请输入员工名称',
    elType: 'autocomplete',
    api: 'getStaff',
    relation: ['yggh'],
    icon: true,
    rules: [{ trigger: 'focus', required: true, message: '请输入员工名称' }]
  }, {
    label: '员工工号',
    prop: 'yggh',
    style: { width: '250px' },
    placeholder: '请输入员工工号',
    elType: 'autocomplete',
    api: 'getStaff',
    relation: ['ygmc'],
    icon: true,
    rules: [{ trigger: 'focus', required: true, message: '请输入员工工号' }]
  },
  {
    label: '奖扣日期',
    prop: 'rq',
    placeholder: '请选择日期',
    style: { width: '250px' },
    elType: 'date',
    rules: [{ trigger: 'focus', required: true, message: '请选择日期' }]
  }, {
    label: '',
    labelWidth: '0px',
    prop: 'blank_1',
    style: { width: 'calc(100% - 750px)' },
    elType: 'blank'
  }, {
    label: '奖扣类型',
    prop: 'jklx',
    style: { width: '250px' },
    placeholder: '请选择奖扣类型',
    elType: 'select',
    listData: ['奖', '扣'],
    rules: [{ trigger: 'focus', required: true, message: '请选择奖扣类型' }]
  }, {
    label: '金额',
    prop: 'je',
    placeholder: '输入金额',
    style: { width: '250px' },
    defaultVal: '0',
    rules: [{ trigger: 'focus', pattern: num, message: '请输入数字' }]
  }, {
    label: '结算状态',
    prop: 'jszt',
    style: { width: '250px' },
    placeholder: '请选择结算状态',
    elType: 'select',
    listData: ['未结算', '结算'],
    defaultVal: '未结算'
  },
  {
    label: '',
    prop: 'blank2',
    placeholder: '',
    style: { width: 'calc(100% - 750px)' },
    elType: 'blank'
  },
  {
    label: '备     注',
    prop: 'bz',
    placeholder: '请选择输入备注',
    style: { width: '500px' },
    elType: 'textarea'
  }
]
export const formItemsList = [
  {
    label: '开始日期',
    prop: 'ksrq',
    style: { width: '130px' },
    placeholder: '请输入客户名称',
    elType: 'date'
  },
  {
    label: '结束日期',
    prop: 'jsrq',
    placeholder: '请输入来款账号',
    style: { width: '130px' },
    elType: 'date'
  }, {
    label: '奖扣类型',
    prop: 'jklx',
    style: { width: '130px' },
    placeholder: '请选择结算状态',
    elType: 'select',
    listData: ['全部', '奖', '扣'],
    defaultVal: '全部',
    hideClearable: true
  }, {
    label: '结算状态',
    prop: 'zt',
    style: { width: '130px' },
    placeholder: '请选择结算状态',
    elType: 'select',
    listData: ['全部', '未结算', '结算'],
    defaultVal: '全部',
    hideClearable: true
  }
]
