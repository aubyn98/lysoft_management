export default [
  {
    label: '客户',
    prop: 'khmc',
    style: { width: '130px' },
    placeholder: '请输入客户',
    elType: 'autocomplete',
    api: 'getCustomer'
  }, {
    label: '商标',
    prop: 'sb',
    style: { width: '130px' },
    placeholder: '请输入商标',
    elType: 'autocomplete',
    api: 'getTrademark'
  }, {
    label: '款号',
    prop: 'kh',
    style: { width: '130px' },
    placeholder: '请输入款号',
    elType: 'autocomplete',
    api: 'getFashion'
  }, {
    label: '颜色',
    prop: 'ysmc',
    style: { width: '130px' },
    placeholder: '请输入颜色',
    elType: 'autocomplete',
    api: 'getColor'
  }, {
    label: '条码',
    prop: 'tmbh',
    style: { width: '130px' },
    placeholder: '请输入条码'
  }, {
    label: '档位',
    sendKey: 'kw',
    prop: 'ckdw',
    style: { width: '130px' },
    placeholder: '请输入档位',
    elType: 'autocomplete',
    api: 'getGears'
  }, {
    label: '',
    prop: 'ycfcsj',
    style: { width: '130px', minHeight: '28px' },
    elType: 'checkbox',
    elText: '隐藏发出数据'
  }
]
