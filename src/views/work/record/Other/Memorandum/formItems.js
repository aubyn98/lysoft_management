export default [{
  label: '内容',
  prop: 'bz',
  style: { width: '50%' },
  placeholder: '请输入内容',
  elType: 'textarea',
  rules: [{ trigger: 'focus', required: true, message: '请输入内容' }]
}, {
  label: '',
  prop: 'jd',
  style: { width: '50%' },
  elType: 'checkbox',
  elText: '已处理'
}, {
  label: '',
  prop: 'id',
  style: { width: '0px' },
  labelWidth: '0px',
  elType: 'blank'
}, {
  label: '',
  prop: 'khbh',
  style: { width: '0px' },
  labelWidth: '0px',
  elType: 'blank'
}]
