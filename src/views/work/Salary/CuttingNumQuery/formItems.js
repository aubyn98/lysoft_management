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
    label: '床号',
    prop: 'ch',
    style: { width: '130px' },
    placeholder: '请输入床号',
    elType: 'autocomplete',
    api: 'getBedNum'
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
    label: '汇总模式',
    prop: 'hzms',
    style: { width: '130px' },
    placeholder: '请输入颜色',
    elType: 'select',
    multiple: true,
    defaultVal: [],
    collapseTags: true,
    listData: ['床号', '商标', '款号', '颜色', '日期']
  }
]
