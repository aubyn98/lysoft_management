import { num } from '@/common/utils/pattern'
export const xsbj = [
  {
    label: '客户名称',
    prop: 'khmc',
    style: { width: '250px' },
    placeholder: '请输入客户名称',
    labelWidth: '100px',
    elType: 'autocomplete',
    api: 'getCustomer',
    relation: ['khbh'],
    // icon: true,
    rules: [{ trigger: 'focus', required: true, message: '请输入客户名称' }]
  },
  {
    label: '',
    prop: 'khbh',
    style: { width: '0px' },
    placeholder: '',
    labelWidth: '0px',
    elType: 'blank'
  }
]
export const cgbj = [
  {
    label: '供货商名称',
    prop: 'ghsmc',
    style: { width: '250px' },
    placeholder: '请输入供货商名称',
    labelWidth: '100px',
    elType: 'autocomplete',
    api: 'getVendor',
    relation: ['ghsbh'],
    // icon: true,
    rules: [{ trigger: 'focus', required: true, message: '请输入供货商名称' }]
  },
  {
    label: '',
    prop: 'ghsbh',
    style: { width: '0px' },
    placeholder: '',
    labelWidth: '0px',
    elType: 'blank'
  }
]
export const jgbj = [
  {
    label: '加工商名称',
    prop: 'jgsmc',
    style: { width: '250px' },
    placeholder: '请输入加工商名称',
    labelWidth: '100px',
    elType: 'autocomplete',
    api: 'getProcessor',
    relation: ['jgsbh'],
    // icon: true,
    rules: [{ trigger: 'focus', required: true, message: '请输入加工商名称' }]
  },
  {
    label: '',
    prop: 'jgsbh',
    style: { width: '0px' },
    placeholder: '',
    labelWidth: '0px',
    elType: 'blank'
  }
]
export const wfxsbj = jgbj

export const offer = [
  {
    label: '客户类型',
    sendKey: 'lx',
    prop: 'khlx',
    style: { width: '250px' },
    placeholder: '请输入客户类型',
    labelWidth: '100px',
    elType: 'autocomplete',
    api: 'getCustomerType',
    // icon: true,
    rules: [{ trigger: 'focus', required: true, message: '请输入客户类型' }]
  },
  {
    label: '增加价格',
    prop: 'jg',
    style: { width: '250px' },
    placeholder: '请输入增加价格',
    labelWidth: '100px',
    // icon: true,
    rules: [{ trigger: 'focus', required: true, message: '请输入增加价格' }, { trigger: 'focus', pattern: num, message: '请输入数字' }]
  },
  {
    label: '密码',
    prop: 'mm',
    style: { width: '250px' },
    placeholder: '请输入密码',
    labelWidth: '100px',
    // icon: true,
    rules: [{ trigger: 'focus', required: true, message: '请输入密码' }]
  }
]
