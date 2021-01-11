export default [{
  label: '码数',
  prop: 'ms',
  style: { width: '50%' },
  placeholder: '请输入码数',
  rules: [{ trigger: 'focus', required: true, message: '请输入码数' }]
}, {
  label: '',
  prop: 'id',
  style: { width: '0px' },
  labelWidth: '0px',
  elType: 'blank'
}]
