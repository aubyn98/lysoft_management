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
    placeholder: '请输入供货商名称',
    elType: 'autocomplete',
    api: 'getVendor'
  }, {
    label: '物料编号',
    prop: 'wlbh',
    style: { width: '130px' },
    placeholder: '请输入物料编号',
    elType: 'autocomplete',
    api: 'getMaterial'
  }, {
    label: '物料名称',
    prop: 'wlmc',
    style: { width: '130px' },
    placeholder: '请输入物料名称',
    elType: 'autocomplete',
    api: 'getMaterial'
  }, {
    label: '规格',
    prop: 'gg',
    style: { width: '130px' },
    placeholder: '请输入规格',
    elType: 'autocomplete',
    api: 'getMaterialSpec'
  }, {
    label: '颜色',
    prop: 'ysmc',
    style: { width: '130px' },
    placeholder: '请输入颜色',
    elType: 'autocomplete',
    api: 'getMaterialColor'
  }, {
    label: '类型',
    prop: 'lx',
    style: { width: '130px' },
    placeholder: '请输入类型',
    elType: 'autocomplete',
    api: 'getMaterialType'
  }
]
