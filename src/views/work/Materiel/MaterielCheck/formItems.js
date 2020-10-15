export default [
  {
    label: '仓库名称',
    prop: 'ckmc',
    placeholder: '请输入仓库名称',
    style: { width: '250px' },
    elType: 'autocomplete'
  }, {
    label: '盘点类型',
    prop: 'pdlx',
    style: { width: '250px' },
    placeholder: '请选择盘点类型',
    elType: 'autocomplete'
  }, {
    label: '来货商',
    prop: 'lhs',
    placeholder: '请输入来货商',
    style: { width: '250px' },
    elType: 'autocomplete'
  },
  {
    label: '',
    prop: 'blank1',
    placeholder: '',
    style: { width: 'calc(100% - 750px)' },
    labelWidth: '140px',
    elType: 'blank'
  },
  {
    label: '　备 注',
    prop: 'bz',
    placeholder: '请选择输入备注',
    style: { width: '750px' },
    elType: 'textarea',
    labelWidth: '80px'
  }
]
