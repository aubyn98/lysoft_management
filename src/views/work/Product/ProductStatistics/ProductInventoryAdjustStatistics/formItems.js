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
    label: '仓库名称',
    prop: 'ckmc',
    style: { width: '130px' },
    placeholder: '请输入仓库名称',
    elType: 'autocomplete',
    api: 'getStore'
  }, {
    label: '来货商',
    prop: 'khmc',
    style: { width: '130px' },
    placeholder: '请输入来货商',
    elType: 'autocomplete',
    api: 'getComer'
  }, {
    label: '盘点类型',
    prop: 'pdlx',
    style: { width: '130px' },
    placeholder: '请输入类型',
    elType: 'select',
    listData: ['盘盈', '盘亏', '入库']
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
  } /* {
    label: '结单状态',
    prop: 'jdzt',
    style: { width: '130px' },
    placeholder: '请输入类型',
    elType: 'select',
    listData: ['全部', '未结单', '已结单'],
    defaultVal: '全部'
  }, */ /* {
    label: '汇总条件',
    prop: 'hztj',
    style: { width: '130px' },
    placeholder: '请输入码数',
    elType: 'select',
    multiple: true,
    listData: ['日期', '盘点类型', '仓库', '款号', '颜色', '款式类型', '商标', '客户类型', '床号', '来货商']
  } */
]
