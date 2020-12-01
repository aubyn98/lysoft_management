export default [{
  label: '品牌名称',
  prop: 'pp',
  style: { width: '50%' },
  placeholder: '请输入品牌名称',
  CamelChars: 'jm',
  rules: [{ trigger: 'focus', required: true, message: '请输入品牌名称' }]
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
