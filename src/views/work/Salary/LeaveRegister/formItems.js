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
    label: '请假日期',
    prop: 'qjrq',
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
    label: '返厂日期',
    prop: 'fcrq',
    placeholder: '请选择日期',
    style: { width: '250px' },
    elType: 'date',
    rules: [{ trigger: 'focus', required: true, message: '请选择日期' }]
  }, {
    label: '请假类型',
    prop: 'qjlx',
    style: { width: '250px' },
    placeholder: '请选择请假类型',
    elType: 'select',
    listData: ['事假', '病假', '婚假', '丧假', '产假', '探亲假', '其他'],
    defaultVal: '事假'
  }, {
    label: '',
    prop: 'ts',
    labelWidth: '20px',
    style: { width: '60px' },
    defaultVal: '0',
    rules: [{ trigger: 'focus', pattern: num, message: '请输入数字' }]
  }, {
    label: '天',
    prop: 'blank_t',
    labelWidth: '30px',
    style: { width: '30px' },
    elType: 'blank'
  }, {
    label: '',
    prop: 'ss',
    labelWidth: '0px',
    style: { width: '40px' },
    defaultVal: '0',
    rules: [{ trigger: 'focus', pattern: num, message: '请输入数字' }]
  }, {
    label: '时',
    prop: 'blank_s',
    labelWidth: '30px',
    style: { width: '30px' },
    elType: 'blank'
  }, {
    label: '',
    prop: 'fs',
    labelWidth: '0px',
    style: { width: '40px' },
    defaultVal: '0',
    rules: [{ trigger: 'focus', pattern: num, message: '请输入数字' }]
  }, {
    label: '分',
    prop: 'blank_f',
    labelWidth: '30px',
    style: { width: '30px' },
    elType: 'blank'
  }, {
    label: '',
    prop: 'khsf',
    labelWidth: '0px',
    style: { width: '80px' },
    elType: 'checkbox',
    elText: '扣伙食费'
  },
  {
    label: '',
    prop: 'blank2',
    placeholder: '',
    style: { width: 'calc(100% - 810px)' },
    elType: 'blank'
  },
  {
    label: '备     注',
    prop: 'bz',
    placeholder: '请选择输入备注',
    style: { width: '500px' },
    elType: 'textarea'
  }, {
    label: '结算状态',
    prop: 'zt',
    style: { width: '250px' },
    placeholder: '请选择结算状态',
    elType: 'select',
    listData: ['未结算', '结算'],
    defaultVal: '未结算'
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
    label: '结算状态',
    prop: 'jszt',
    style: { width: '130px' },
    placeholder: '请选择结算状态',
    elType: 'select',
    listData: ['全部', '未结算', '结算'],
    defaultVal: '未结算'
  }
]
