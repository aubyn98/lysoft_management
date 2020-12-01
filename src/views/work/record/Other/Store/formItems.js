export default [{
  label: '仓库名称',
  prop: 'ckmc',
  style: { width: '50%' },
  placeholder: '请输入仓库名称',
  CamelChars: 'jm',
  rules: [{ trigger: 'focus', required: true, message: '请输入仓库名称' }]
}, {
  label: '备注',
  prop: 'bz',
  style: { width: '50%' },
  placeholder: '请输入备注'
}, {
  label: '',
  prop: 'id',
  style: { width: '0px' },
  labelWidth: '0px',
  elType: 'blank'
}]
