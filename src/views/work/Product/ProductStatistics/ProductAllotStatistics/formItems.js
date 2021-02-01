export default [
  {
    label: '开始日期',
    prop: 'ksrq',
    style: { width: '130px' },
    placeholder: '请输入客户名称',
    elType: 'date'
  },
  {
    label: '结束日期',
    prop: 'jsrq',
    placeholder: '请输入来款账号',
    style: { width: '130px' },
    elType: 'date'
  }, {
    label: '调出仓库',
    sendKey: 'ckmc',
    prop: 'dcck',
    style: { width: '130px' },
    placeholder: '请输入仓库名称',
    elType: 'autocomplete',
    api: 'getStore'
  }, {
    label: '调入仓库',
    sendKey: 'ckmc',
    prop: 'drck',
    style: { width: '130px' },
    placeholder: '请输入仓库名称',
    elType: 'autocomplete',
    api: 'getStore'
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
    label: '汇总条件',
    prop: 'hztj',
    style: { width: '130px' },
    placeholder: '请输入码数',
    elType: 'select',
    multiple: true,
    defaultVal: [],
    objVal: true,
    listData: [
      { hztj: '日期', key: 'rq' },
      { hztj: '调入仓库', key: 'drck' },
      { hztj: '调出仓库', key: 'ckmc' },
      { hztj: '款号', key: 'kh' },
      { hztj: '颜色', key: 'ysmc' },
      { hztj: '款式类型', key: 'kslx' },
      { hztj: '商标', key: 'sb' }
    ]
  }
]
