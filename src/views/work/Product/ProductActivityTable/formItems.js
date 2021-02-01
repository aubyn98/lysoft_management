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
    label: '款式类型',
    prop: 'kslx',
    style: { width: '130px' },
    placeholder: '请输入款式类型',
    elType: 'autocomplete',
    api: 'getFashionType'
  }, {
    label: '颜色',
    prop: 'ysmc',
    style: { width: '130px' },
    placeholder: '请输入颜色',
    elType: 'autocomplete',
    api: 'getColor'
  }, {
    label: '',
    prop: 'ycwshjl',
    style: { width: '130px', minHeight: '28px' },
    elType: 'checkbox',
    elText: '隐藏未审核记录'
  }
]
