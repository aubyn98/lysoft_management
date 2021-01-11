export default [{
  label: '类型',
  prop: 'lx',
  style: { width: '50%' },
  placeholder: '请输入类型',
  rules: [{ trigger: 'focus', required: true, message: '请输入类型' }]
}, {
  label: '',
  prop: 'id',
  style: { width: '0px' },
  labelWidth: '0px',
  elType: 'blank'
}]
