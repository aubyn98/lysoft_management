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
    label: '供货商',
    prop: 'ghsmc',
    style: { width: '130px' },
    placeholder: '请输入供货商',
    elType: 'autocomplete',
    api: 'getVendor'
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
    label: '引用单号',
    prop: 'yydh',
    style: { width: '130px' },
    placeholder: '请输入引用单号',
    elType: 'autocomplete',
    api: 'getProductEnterStatisticsQuote'
  }, /* {
    label: '结单状态',
    prop: 'jdzt',
    style: { width: '130px' },
    placeholder: '请输入类型',
    elType: 'select',
    listData: ['全部', '未结单', '已结单'],
    defaultVal: '全部',
    disabled: true
  }, */ {
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
      { hztj: '供货商', key: 'ghsmc' },
      { hztj: '商标', key: 'sb' },
      { hztj: '款号', key: 'kh' },
      { hztj: '颜色', key: 'ysmc' },
      { hztj: '款式类型', key: 'kslx' },
      { hztj: '单价', key: 'dj' },
      { hztj: '单位', key: 'dw' }
    ]
  }
]
