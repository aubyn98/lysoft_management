import { num } from '@/common/utils/pattern'
export const formItemsCustomer = [
  {
    label: '客户名称',
    prop: 'mc',
    style: { width: '250px' },
    placeholder: '请输入客户名称',
    elType: 'autocomplete',
    api: 'getCustomer',
    sendKey: 'khmc',
    relation: ['khbh'],
    icon: true,
    rules: [{ trigger: 'focus', required: true, message: '请输入客户名称' }]
  },
  {
    label: '',
    elType: 'blank',
    prop: 'khbh',
    style: { width: '0px' }
  },
  {
    label: '来款账号',
    prop: 'lkzh',
    placeholder: '请输入来款账号',
    style: { width: '250px' }
  },
  {
    label: '',
    prop: 'blank1',
    placeholder: '',
    style: { width: 'calc(100% - 500px)' },
    elType: 'blank'
  },
  {
    label: '收款账号',
    prop: 'yhzh',
    style: { width: '250px' },
    placeholder: '请输入收款账号',
    elType: 'autocomplete',
    api: 'getBank',
    icon: true
  },
  {
    label: '收款金额',
    prop: 'skje',
    style: { width: '250px' },
    placeholder: '请输入收款金额',
    rules: [{ trigger: 'focus', pattern: num, message: '请输入数字' }]
  },
  {
    label: '',
    prop: 'jelx',
    labelWidth: '20px',
    placeholder: '',
    style: { width: '130px' },
    elType: 'autocomplete',
    api: 'getAmountType',
    icon: true,
    defaultVal: '其他金额'
  },
  {
    label: '',
    prop: 'qtje',
    placeholder: '',
    labelWidth: '5px',
    style: { width: '70px' },
    rules: [{ trigger: 'focus', pattern: num, message: '请输入数字' }]
  },
  {
    label: '',
    prop: 'blank2',
    placeholder: '',
    style: { width: 'calc(100% - 700px)' },
    elType: 'blank'
  },
  {
    label: '备     注',
    prop: 'bz',
    placeholder: '请选择输入备注',
    style: { width: '700px' },
    elType: 'textarea'
  }
]
export const formItemsProcessor = [
  {
    label: '加工商',
    prop: 'mc',
    style: { width: '250px' },
    placeholder: '请输入加工商名称',
    elType: 'autocomplete',
    api: 'getProcessor',
    sendKey: 'jgsmc',
    relation: ['jgsbh'],
    icon: true,
    rules: [{ trigger: 'focus', required: true, message: '请输入客户名称' }]
  }, {
    label: '',
    elType: 'blank',
    prop: 'jgsbh',
    style: { width: '0px' }
  },
  {
    label: '收款账号',
    prop: 'hrzh',
    placeholder: '请输入收款账号',
    style: { width: '250px' }
  },
  {
    label: '引用单号',
    prop: 'yydh',
    placeholder: '请输入引用单号',
    style: { width: '240px' }
  },
  {
    label: '',
    prop: 'blank1',
    placeholder: '',
    style: { width: 'calc(100% - 740px)' },
    elType: 'blank'
  },
  {
    label: '付款账号',
    prop: 'yhzh',
    style: { width: '250px' },
    placeholder: '请输入付款账号',
    elType: 'autocomplete',
    api: 'getBank',
    icon: true
  },
  {
    label: '付款金额',
    prop: 'skje',
    style: { width: '250px' },
    placeholder: '请输入付款金额',
    rules: [{ trigger: 'focus', pattern: num, message: '请输入数字' }]
  },
  {
    label: '',
    prop: 'jelx',
    labelWidth: '20px',
    placeholder: '',
    style: { width: '130px' },
    elType: 'autocomplete',
    api: 'getAmountType',
    icon: true,
    defaultVal: '其他金额'
  },
  {
    label: '',
    prop: 'qtje',
    placeholder: '',
    labelWidth: '5px',
    style: { width: '70px' },
    rules: [{ trigger: 'focus', pattern: num, message: '请输入数字' }]
  },
  {
    label: '',
    prop: 'blank2',
    placeholder: '',
    style: { width: 'calc(100% - 700px)' },
    elType: 'blank'
  },
  {
    label: '备     注',
    prop: 'bz',
    placeholder: '请选择输入备注',
    style: { width: '700px' },
    elType: 'textarea'
  }
]
export const formItemsVendor = [
  {
    label: '供货商',
    prop: 'mc',
    style: { width: '250px' },
    placeholder: '请输入供货商名称',
    elType: 'autocomplete',
    api: 'getVendor',
    sendKey: 'ghsmc',
    relation: ['ghsbh'],
    icon: true,
    rules: [{ trigger: 'focus', required: true, message: '请输入客户名称' }]
  }, {
    label: '',
    elType: 'blank',
    prop: 'ghsbh',
    style: { width: '0px' }
  },
  {
    label: '收款账号',
    prop: 'hrzh',
    placeholder: '请输入收款账号',
    style: { width: '250px' }
  },
  {
    label: '',
    prop: 'blank1',
    placeholder: '',
    style: { width: 'calc(100% - 500px)' },
    elType: 'blank'
  },
  {
    label: '付款账号',
    prop: 'yhzh',
    style: { width: '250px' },
    placeholder: '请输入付款账号',
    elType: 'autocomplete',
    api: 'getBank',
    icon: true
  },
  {
    label: '付款金额',
    prop: 'skje',
    style: { width: '250px' },
    placeholder: '请输入付款金额',
    rules: [{ trigger: 'focus', pattern: num, message: '请输入数字' }]
  },
  {
    label: '',
    prop: 'jelx',
    labelWidth: '20px',
    placeholder: '',
    style: { width: '130px' },
    elType: 'autocomplete',
    api: 'getAmountType',
    icon: true,
    defaultVal: '其他金额'
  },
  {
    label: '',
    prop: 'qtje',
    placeholder: '',
    labelWidth: '5px',
    style: { width: '70px' },
    rules: [{ trigger: 'focus', pattern: num, message: '请输入数字' }]
  },
  {
    label: '',
    prop: 'blank2',
    placeholder: '',
    style: { width: 'calc(100% - 700px)' },
    elType: 'blank'
  },
  {
    label: '备     注',
    prop: 'bz',
    placeholder: '请选择输入备注',
    style: { width: '700px' },
    elType: 'textarea'
  }
]
const formItems = {
  formItemsCustomer,
  formItemsProcessor,
  formItemsVendor
}
export function getformItems (type) {
  return formItems['formItems' + type]
}
