export default [{
  label: '成分名称',
  prop: 'cf',
  style: { width: '50%' },
  placeholder: '请输入成分名称',
  rules: [{ trigger: 'focus', required: true, message: '请输入成分名称' }]
}, {
  label: '',
  prop: 'id',
  style: { width: '0px' },
  labelWidth: '0px',
  elType: 'blank'
}]
