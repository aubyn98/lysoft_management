export default [
  {
    label: '项目名称',
    prop: 'xmmc',
    style: { width: '250px' },
    placeholder: '请输入项目名称',
    elType: 'autocomplete'
  },
  {
    label: '类别',
    prop: 'lb',
    placeholder: '请选择类别',
    style: { width: '250px' }
  }, {
    label: '',
    prop: 'blank1',
    placeholder: '',
    style: { width: 'calc(100% - 500px)' },
    elType: 'blank'
  }, {
    label: '银行账号',
    prop: 'yhzh',
    style: { width: '250px' },
    placeholder: '请输入银行账号',
    elType: 'autocomplete'
  }, {
    label: '金额',
    prop: 'je',
    style: { width: '250px' },
    placeholder: '请输入金额'
  },
  {
    label: '',
    prop: 'blank2',
    placeholder: '',
    style: { width: 'calc(100% - 500px)' },
    elType: 'blank'
  },
  {
    label: '备     注',
    prop: 'bz',
    placeholder: '请选择输入备注',
    style: { width: '500px' },
    elType: 'textarea'
  }
]
