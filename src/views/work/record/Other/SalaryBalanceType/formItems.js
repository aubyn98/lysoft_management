export default [{
  label: '结算方式',
  prop: 'jsfs',
  style: { width: '50%' },
  placeholder: '请输入结算方式',
  rules: [{ trigger: 'focus', required: true, message: '请输入结算方式' }]
}, {
  label: '',
  prop: 'id',
  style: { width: '0px' },
  labelWidth: '0px',
  elType: 'blank'
}]
