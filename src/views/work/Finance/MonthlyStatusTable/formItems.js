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
    label: '客户',
    prop: 'khmc',
    style: { width: '120px' },
    placeholder: '请输入客户名称',
    elType: 'autocomplete'
  }, {
    label: '客户类型',
    prop: 'khlx',
    style: { width: '120px' },
    placeholder: '请选择客户类型',
    elType: 'select'
  }
]
