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
  }, {
    label: '客户名称',
    prop: 'khmc',
    style: { width },
    placeholder: '请输入客户名称',
    elType: 'autocomplete',
    api: 'getCustomer'
  }, {
    label: '客户类型',
    prop: 'lx',
    style: { width },
    placeholder: '请输入客户类型',
    elType: 'autocomplete',
    api: 'getCustomerType'
  }, {
    label: '流水单号',
    prop: 'lsdh',
    style: { width },
    placeholder: '请输入流水单号'
  }, {
    label: '订单等级',
    prop: 'dddj',
    style: { width },
    placeholder: '请选择订单等级',
    elType: 'select',
    listData: ['正常', '急', '紧急']
  }, {
    label: '款号',
    prop: 'kh',
    style: { width },
    placeholder: '请输入款号',
    elType: 'autocomplete',
    api: 'getFashion'
  }, {
    label: '商标',
    prop: 'sb',
    style: { width },
    placeholder: '请输入物料名称',
    elType: 'autocomplete',
    api: 'getTrademark'
  }, {
    label: '颜色',
    prop: 'ysmc',
    style: { width },
    placeholder: '请输入颜色',
    elType: 'autocomplete',
    api: 'getColor'
  }, {
    label: '结单状态',
    prop: 'jdzt',
    style: { width },
    placeholder: '请选择订单等级',
    elType: 'select',
    listData: ['全部', '未结单', '已结单'],
    defaultVal: '未结单',
    hideClearable: true
  }
]
