export const formItems = [
  {
    label: '开始日期',
    prop: 'ksrq',
    style: { width: '130px' },
    elType: 'date'
  },
  {
    label: '结束日期',
    prop: 'jsrq',
    placeholder: '请输入来款账号',
    style: { width: '130px' },
    elType: 'date'
  }
]
export const formItemsKh = [
  ...formItems,
  {
    label: '客户',
    prop: 'khmc',
    style: { width: '130px' },
    placeholder: '请输入客户名称',
    elType: 'autocomplete',
    api: 'getCustomer'
  },
  {
    label: '客户类型',
    prop: 'lx',
    style: { width: '130px' },
    placeholder: '请选择客户类型',
    elType: 'autocomplete',
    api: 'getCustomerType'
  }
]
export const formItemsJgs = [
  ...formItems,
  {
    label: '加工商',
    prop: 'jgs',
    style: { width: '130px' },
    placeholder: '请选择加工商'
    /* elType: 'autocomplete',
    api: 'getCustomerType' */
  }
]
export const formItemsGhs = [
  ...formItems,
  {
    label: '供货商',
    prop: 'ghs',
    style: { width: '130px' },
    placeholder: '请输入供货商名称',
    elType: 'autocomplete',
    api: 'getVendor'
  }
]
