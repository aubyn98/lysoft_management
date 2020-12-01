export default [{
  label: '金额类型',
  prop: 'jelx',
  style: { width: '50%' },
  placeholder: '请输入金额类型',
  CamelChars: 'jm',
  rules: [{ trigger: 'focus', required: true, message: '请输入金额类型' }]
}, {
  label: '简　　码',
  prop: 'jm',
  style: { width: '50%' },
  placeholder: '请输入简码'
}, {
  label: '',
  prop: 'cylr',
  style: { width: '50%' },
  labelWidth: '20px',
  elType: 'checkbox',
  elText: '参与利润'
}, {
  label: '',
  prop: 'id',
  style: { width: '0px' },
  labelWidth: '0px',
  elType: 'blank'
}]
