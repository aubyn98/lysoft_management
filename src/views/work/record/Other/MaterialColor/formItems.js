export default [{
  label: '颜色名称',
  prop: 'ysmc',
  style: { width: '50%' },
  placeholder: '请输入颜色名称',
  CamelChars: 'jm',
  rules: [{ trigger: 'focus', required: true, message: '请输入颜色名称' }]
}, {
  label: '简　　码',
  prop: 'jm',
  style: { width: '50%' },
  placeholder: '请输入简码'
}, {
  label: '',
  prop: 'id',
  style: { width: '0px' },
  labelWidth: '0px',
  elType: 'blank'
}]
