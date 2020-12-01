export default [{
  label: '客户类型',
  prop: 'lx',
  style: { width: '50%' },
  placeholder: '请输入客户类型',
  rules: [{ trigger: 'focus', required: true, message: '请输入客户类型' }]
}, {
  label: '价格类型',
  prop: 'jglx',
  style: { width: '50%' },
  placeholder: '请输入价格类型'
}, {
  label: '折　　扣',
  prop: 'zk',
  style: { width: '50%' },
  placeholder: '请输入折扣'
}, {
  label: '',
  prop: 'id',
  style: { width: '0px' },
  labelWidth: '0px',
  elType: 'blank'
}]
