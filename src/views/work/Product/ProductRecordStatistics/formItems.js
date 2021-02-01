const width = '130px'
export default [
  {
    label: '开始日期',
    prop: 'ksrq',
    style: { width: '130px' },
    placeholder: '请输入开始日期',
    elType: 'date'
  },
  {
    label: '结束日期',
    prop: 'jsrq',
    placeholder: '请输入结束日期',
    style: { width: '130px' },
    elType: 'date'
  },
  {
    label: '仓库名称',
    prop: 'ckmc',
    style: { width },
    placeholder: '请输入仓库名称名称',
    elType: 'autocomplete',
    api: 'getStore'
  },
  {
    label: '客户名称',
    prop: 'khmc',
    style: { width },
    placeholder: '请输入客户名称',
    elType: 'autocomplete',
    api: 'getCustomer'
  },
  {
    label: '供货商',
    prop: 'ghsmc',
    style: { width },
    placeholder: '请输入供货商',
    elType: 'autocomplete',
    api: 'getVendor'
  },
  {
    label: '商标',
    prop: 'sb',
    style: { width },
    placeholder: '请输入商标',
    elType: 'autocomplete',
    api: 'getTrademark'
  },
  {
    label: '款号',
    prop: 'kh',
    style: { width },
    placeholder: '请输入款号',
    elType: 'autocomplete',
    api: 'getFashion'
  },
  {
    label: '汇总条件',
    prop: 'hztj',
    style: { width },
    placeholder: '请输入码数',
    elType: 'select',
    multiple: true,
    objVal: true,
    defaultVal: [],
    listData: [
      { hztj: '日期', key: 'rq' },
      { hztj: '仓库', key: 'ckmc' },
      { hztj: '商标', key: 'sb' },
      { hztj: '客户', key: 'khmc' },
      { hztj: '款号', key: 'kh' },
      { hztj: '供货商', key: 'ghsmc' },
      { hztj: '单价', key: 'dj' },
      { hztj: '类型', key: 'lx' },
      { hztj: '备注', key: 'bz' }
    ]
  },
  {
    label: '',
    prop: 'ycbjkcsj',
    style: { width, minHeight: '28px' },
    elType: 'checkbox',
    elText: '隐藏不减库存数据'
  }
]
