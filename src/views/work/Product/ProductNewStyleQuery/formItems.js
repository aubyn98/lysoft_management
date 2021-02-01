export default [
  {
    label: '款号',
    prop: 'kh',
    style: { width: '130px' },
    placeholder: '请输入款号',
    elType: 'autocomplete',
    api: 'getFashion'
  }, {
    label: '商标',
    prop: 'sb',
    style: { width: '130px' },
    placeholder: '请输入商标',
    elType: 'autocomplete',
    api: 'getTrademark'
  }, {
    label: '款式创建时间',
    prop: 'ksrq',
    style: { width: '130px' },
    elType: 'date'
  },
  {
    label: '到',
    prop: 'jsrq',
    style: { width: '130px' },
    elType: 'date'
  }, {
    label: '入库时间',
    prop: 'ksrq_rk',
    style: { width: '130px' },
    elType: 'date'
  },
  {
    label: '到',
    prop: 'jsrq_rk',
    style: { width: '130px' },
    elType: 'date'
  }, {
    label: '入库状态',
    prop: 'rkzt',
    style: { width: '130px' },
    placeholder: '请选择入库状态',
    elType: 'select',
    listData: ['全部显示', '只显示入过库', '只显示未入库'],
    hideClearable: true,
    defaultVal: '全部显示'
  }
]
