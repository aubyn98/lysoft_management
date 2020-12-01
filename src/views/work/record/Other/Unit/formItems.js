export default [{
  label: '单位',
  prop: 'dw',
  style: { width: '50%' },
  placeholder: '请输入单位',
  rules: [{ trigger: 'focus', required: true, message: '请输入单位' }]
}, {
  label: '',
  prop: 'id',
  style: { width: '0px' },
  labelWidth: '0px',
  elType: 'blank'
}]
