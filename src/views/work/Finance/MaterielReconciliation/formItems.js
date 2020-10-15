export default [
  {
    label: '开始日期',
    prop: 'ksrq',
    style: { width: '120px' },
    elType: 'date'
  },
  {
    label: '结束日期',
    prop: 'jsrq',
    placeholder: '请输入来款账号',
    style: { width: '120px' },
    elType: 'date'
  }, {
    label: '加工商',
    prop: 'jgsmc',
    style: { width: '120px' },
    placeholder: '请输入加工商',
    elType: 'autocomplete'
  },
  {
    label: '单据类型',
    prop: 'djlx',
    style: { width: '120px' },
    placeholder: '请选择单据类型',
    elType: 'select'
  }, {
    label: '制单人',
    prop: 'zdr',
    style: { width: '120px' },
    placeholder: '请输入制单人',
    elType: 'autocomplete'
  }
]
