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
    label: '流水单号',
    prop: 'lsdh',
    style: { width: '130px' },
    placeholder: '请输入流水单号'
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
    label: '结单状态',
    prop: 'jdzt',
    style: { width: '130px' },
    placeholder: '请输入类型',
    elType: 'select',
    listData: ['全部', '未结单', '已结单'],
    defaultVal: '全部',
    hideClearable: true
  }
]
