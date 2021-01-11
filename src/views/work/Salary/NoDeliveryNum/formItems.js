export default [
  /* {
    label: '开始日期',
    prop: 'ksrq',
    style: { width: '130px' },
    placeholder: '请选择日期',
    elType: 'date'
  },
  {
    label: '结束日期',
    prop: 'jsrq',
    placeholder: '请选择日期',
    style: { width: '130px' },
    elType: 'date'
  }, */
  {
    label: '床号',
    prop: 'ch',
    placeholder: '请输入床号',
    style: { width: '130px' },
    elType: 'autocomplete',
    api: 'getBedNum'
  }, {
    label: '工序名称',
    prop: 'gxmc',
    placeholder: '请输入工序名称',
    style: { width: '130px' },
    elType: 'autocomplete',
    api: 'getProcess'
  }, {
    label: '款号',
    prop: 'kh',
    placeholder: '请输入款号',
    style: { width: '130px' },
    elType: 'autocomplete',
    api: 'getFashion'
  }, {
    label: '款式类型',
    prop: 'kslx',
    placeholder: '请输入款式类型',
    style: { width: '130px' },
    elType: 'autocomplete',
    api: 'getFashionType'
  },
  {
    label: '商标',
    prop: 'sb',
    placeholder: '请输入商标',
    style: { width: '130px' },
    elType: 'autocomplete',
    api: 'getTrademark'
  },
  {
    label: '颜色',
    prop: 'ysmc',
    placeholder: '请输入颜色',
    style: { width: '130px' },
    elType: 'autocomplete',
    api: 'getColor'
  }
]
