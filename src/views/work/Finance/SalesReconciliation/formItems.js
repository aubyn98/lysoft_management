export default [
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
    label: '客户',
    prop: 'khmc',
    style: { width: '130px' },
    placeholder: '请输入客户',
    elType: 'autocomplete',
    api: 'getCustomer'
  },
  {
    label: '单据类型',
    prop: 'djlx',
    style: { width: '130px' },
    placeholder: '请选择单据类型',
    elType: 'select',
    listData: ['销售开单', '销售退货', '资金汇入', '业务调账']
  }, {
    label: '单据状态',
    prop: 'djzt',
    style: { width: '130px' },
    placeholder: '请选择单据类型',
    elType: 'select',
    listData: ['已审核', '未审核']
  }, {
    label: '制单人',
    prop: 'zdr',
    style: { width: '130px' },
    placeholder: '请输入制单人',
    elType: 'autocomplete',
    sendKey: 'user',
    api: 'getUserAll'
  }
]
