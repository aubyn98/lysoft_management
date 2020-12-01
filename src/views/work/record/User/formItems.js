export default [
  {
    label: '用 户 名',
    prop: 'user',
    style: { width: '220px' },
    placeholder: '请输入用户名',
    rules: [{ trigger: 'focus', required: true, message: '请输入用户名' }]
  },
  {
    label: '密　　码',
    prop: 'password',
    type: 'password',
    style: { width: '220px' },
    placeholder: '请输入密码'
  },
  {
    label: '确认密码',
    prop: 'qrmm',
    type: 'password',
    style: { width: '220px' },
    placeholder: '请输入确认密码'
  }, {
    label: '备注',
    prop: 'bz',
    style: { width: '220px' },
    placeholder: '请输入备注',
    elType: 'textarea'
  },
  {
    label: '',
    prop: 'id',
    style: { width: '0px' },
    labelWidth: '0px',
    elType: 'blank'
  }
]
