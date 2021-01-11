export default [{
  label: '职务',
  prop: 'zw',
  style: { width: '50%' },
  placeholder: '请输入职务',
  rules: [{ trigger: 'focus', required: true, message: '请输入职务名称' }]
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
