export default [{
  label: '商　　标',
  prop: 'sb',
  style: { width: '50%' },
  placeholder: '请输入商标',
  CamelChars: 'jm',
  rules: [{ trigger: 'focus', required: true, message: '请输入商标' }]
}, {
  label: '简　　码',
  prop: 'jm',
  style: { width: '50%' },
  placeholder: '请输入简码'
}, {
  label: '备　　注',
  prop: 'bz',
  style: { width: '50%' },
  placeholder: '请输入备注'
}, {
  label: '是否停用',
  prop: 'sftysb',
  style: { width: '50%' },
  elType: 'checkbox',
  elText: ''
}, {
  label: '',
  prop: 'id',
  style: { width: '0px' },
  labelWidth: '0px',
  elType: 'blank'
}]
