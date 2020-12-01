export default [{
  label: '色号',
  prop: 'sh',
  style: { width: '50%' },
  placeholder: '请输入色号',
  CamelChars: 'jm',
  rules: [{ trigger: 'focus', required: true, message: '请输入色号' }]
}, {
  label: '',
  prop: 'id',
  style: { width: '0px' },
  labelWidth: '0px',
  elType: 'blank'
}]
