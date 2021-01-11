export default [
  {
    label: '客户名称',
    prop: 'khmc',
    style: { width: '250px' },
    placeholder: '请输入客户名称',
    elType: 'autocomplete',
    api: 'getCustomer',
    relation: ['khbh'],
    icon: true,
    rules: [{ trigger: 'focus', required: true, message: '请输入客户名称' }]
  }, {
    label: '',
    prop: 'khbh',
    style: { width: '0px' },
    placeholder: '',
    labelWidth: '0px',
    elType: 'blank'
  },
  {
    label: '仓库名称',
    prop: 'ckmc',
    placeholder: '请输入仓库名称',
    style: { width: '250px' },
    elType: 'autocomplete',
    api: 'getStore',
    icon: true
  },
  {
    label: '',
    prop: 'blank1',
    placeholder: '',
    style: { width: 'calc(100% - 500px)' },
    elType: 'blank'
  },
  {
    label: '备     注',
    prop: 'bz',
    placeholder: '请选择输入备注',
    style: { width: '750px' },
    elType: 'textarea'
  }
]
