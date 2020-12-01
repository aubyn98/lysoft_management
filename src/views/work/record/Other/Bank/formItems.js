export default [{
  label: '开户银行',
  prop: 'khyh',
  style: { width: '50%' },
  placeholder: '请输入开户银行',
  rules: [{ trigger: 'focus', required: true, message: '请输入开户银行' }]
}, {
  label: '银行账号',
  prop: 'yhzh',
  style: { width: '50%' },
  placeholder: '请输入银行账号',
  rules: [{ trigger: 'focus', required: true, message: '请输入银行账号' }]
}, {
  label: '开户人',
  prop: 'khr',
  style: { width: '50%' },
  placeholder: '请输入开户人'
}, {
  label: '银行存款',
  prop: 'yhck',
  style: { width: '50%' },
  placeholder: '请输入银行存款'
}, {
  label: '备注',
  prop: 'bz',
  style: { width: '100%' },
  placeholder: '请输入备注'
}, {
  label: '',
  prop: 'id',
  style: { width: '0px' },
  labelWidth: '0px',
  elType: 'blank'
}]
