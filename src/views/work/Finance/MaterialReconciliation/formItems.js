export const formItemsJg = [
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
  }, {
    label: '加工商',
    prop: 'jgsmc',
    style: { width: '130px' },
    placeholder: '请输入加工商'/* ,
    elType: 'autocomplete' */
  },
  {
    label: '单据类型',
    prop: 'djlx',
    style: { width: '130px' },
    placeholder: '请选择单据类型',
    elType: 'select',
    listData: ['物料来货', '资金汇出', '业务调账']
  }, {
    label: '制单人',
    prop: 'zdr',
    style: { width: '130px' },
    placeholder: '请输入制单人',
    sendKey: 'user',
    elType: 'autocomplete',
    api: 'getUserAll'
  }
]
export const formItemsCg = [
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
  }, {
    label: '供货商',
    prop: 'ghsmc',
    style: { width: '130px' },
    placeholder: '请输入供货商',
    elType: 'autocomplete',
    api: 'getVendor'
  },
  {
    label: '单据类型',
    prop: 'djlx',
    style: { width: '130px' },
    placeholder: '请选择单据类型',
    elType: 'select',
    listData: ['物料入库', '物料退货', '资金汇出', '业务调账']
  }, {
    label: '制单人',
    prop: 'zdr',
    style: { width: '130px' },
    placeholder: '请输入制单人',
    sendKey: 'user',
    elType: 'autocomplete',
    api: 'getUserAll'
  }
]
