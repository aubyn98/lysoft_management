export default [
  {
    label: '设计师',
    sendKey: 'ygmc',
    prop: 'sjs',
    style: { width: '130px' },
    placeholder: '请输入设计师名称',
    elType: 'autocomplete',
    relation: ['yggh'],
    api: 'getStaff'
  }, {
    label: '工号',
    prop: 'yggh',
    style: { width: '130px' },
    placeholder: '请输入设计师名称',
    elType: 'autocomplete',
    relation: ['ygmc'],
    api: 'getStaff'
  }, {
    label: '客户',
    prop: 'khmc',
    style: { width: '130px' },
    placeholder: '请输入客户',
    elType: 'autocomplete',
    api: 'getCustomer'
  }
]
