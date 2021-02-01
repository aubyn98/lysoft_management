export default [
  {
    label: '调出仓库',
    prop: 'ckmc',
    placeholder: '请输入仓库名称',
    style: { width: '250px' },
    elType: 'autocomplete',
    api: 'getStore',
    icon: true,
    rules: [{ trigger: 'focus', required: true, message: '请输入仓库名称' }]
  }, {
    label: '调入仓库',
    sendKey: 'ckmc',
    prop: 'drck',
    placeholder: '请输入仓库名称',
    style: { width: '250px' },
    elType: 'autocomplete',
    api: 'getStore',
    icon: true,
    rules: [{ trigger: 'focus', required: true, message: '请输入仓库名称' }]
  },
  {
    label: '',
    prop: 'blank1',
    placeholder: '',
    style: { width: 'calc(100% - 500px)' },
    elType: 'blank'
  },
  {
    label: '备     注',
    prop: 'bz',
    placeholder: '请选择输入备注',
    style: { width: '750px' },
    elType: 'textarea'
  }
]
