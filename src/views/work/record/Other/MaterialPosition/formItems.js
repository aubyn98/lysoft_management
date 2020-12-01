export default [{
  label: '用料部位',
  prop: 'ylbw',
  style: { width: '50%' },
  placeholder: '请输入用料部位',
  rules: [{ trigger: 'focus', required: true, message: '请输入用料部位' }]
}, {
  label: '备注',
  prop: 'bz',
  style: { width: '50%' },
  placeholder: '请输入用料备注'
}, {
  label: '',
  prop: 'id',
  style: { width: '0px' },
  labelWidth: '0px',
  elType: 'blank'
}]
