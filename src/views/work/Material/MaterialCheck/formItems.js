export default [
  {
    label: '仓库名称',
    prop: 'ckmc',
    placeholder: '请输入仓库名称',
    style: { width: '250px' },
    elType: 'autocomplete',
    api: 'getStore',
    icon: true,
    rules: [{ trigger: 'focus', required: true, message: '请输入仓库名称' }]
  }, {
    label: '盘点类型',
    prop: 'lx',
    style: { width: '250px' },
    placeholder: '请选择盘点类型',
    elType: 'select',
    listData: ['盘盈', '盘亏', '入库', '退货'],
    defaultVal: '盘盈',
    hideClearable: true
  }, {
    label: '来货商',
    prop: 'khmc',
    placeholder: '请输入来货商',
    style: { width: '250px' },
    elType: 'autocomplete',
    api: 'getComer'
  }, {
    label: '',
    prop: 'khbh',
    style: { width: '0px' },
    placeholder: '',
    labelWidth: '0px',
    elType: 'blank'
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
