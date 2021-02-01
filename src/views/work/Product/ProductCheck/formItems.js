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
    labelWidth: '80px',
    listData: ['盘盈', '盘亏', '入库', '退货'],
    defaultVal: '盘盈',
    hideClearable: true
  }, {
    label: '来货商类型',
    prop: 'lhslx',
    style: { width: '250px' },
    placeholder: '请选择来货商类型',
    elType: 'select',
    listData: ['客户', '供货商', '加工商'],
    defaultVal: '客户',
    hideClearable: true
  }, {
    label: '来货商',
    sendKey: 'khmc',
    prop: 'khmc',
    labelWidth: '80px',
    placeholder: '请输入来货商',
    style: { width: '250px' },
    elType: 'autocomplete',
    api: 'getCustomer'
  }, /*  {
    label: '',
    prop: 'khbh',
    style: { width: '0px' },
    placeholder: '',
    labelWidth: '0px',
    elType: 'blank'
  }, */
  {
    label: '',
    prop: 'blank1',
    placeholder: '',
    style: { width: 'calc(100% - 1000px)' },
    labelWidth: '140px',
    elType: 'blank'
  },
  {
    label: '　备 注',
    prop: 'bz',
    placeholder: '请选择输入备注',
    style: { width: '1000px' },
    elType: 'textarea',
    labelWidth: '80px'
  }
]
