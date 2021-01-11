export const formItemsDj = [
  /* {
    label: '开始日期',
    prop: 'ksrq',
    style: { width: '130px' },
    elType: 'date'
  },
  {
    label: '结束日期',
    prop: 'jsrq',
    placeholder: '请输入来款账号',
    style: { width: '130px' },
    elType: 'date'
  }, */ {
    label: '交货日期',
    prop: 'jhrq',
    style: { width: '130px' },
    elType: 'date',
    defaultVal: () => new Date(Date.now() + 28800000).toISOString().substring(0, 10),
    hideClearable: true
  }, {
    label: '员工工号',
    prop: 'yggh',
    style: { width: '130px' },
    placeholder: '请输入员工工号',
    elType: 'autocomplete',
    api: 'getStaff',
    relation: ['ygmc']
  },
  {
    label: '磁卡',
    prop: 'tmbh',
    style: { width: '130px' },
    placeholder: '请输入磁卡'
  },
  {
    label: '扫工票模式',
    prop: 'sgpms',
    style: { width: '130px' },
    placeholder: '请选择模式',
    elType: 'select',
    defaultVal: '磁卡',
    listData: ['磁卡', '员工条码'],
    hideClearable: true
  }
]
export const formItemsCx = [
  {
    label: '开始日期',
    prop: 'ksrq',
    style: { width: '130px' },
    elType: 'date'
  },
  {
    label: '结束日期',
    prop: 'jsrq',
    placeholder: '请输入来款账号',
    style: { width: '130px' },
    elType: 'date'
  }, {
    label: '客户名称',
    prop: 'khmc',
    style: { width: '130px' },
    placeholder: '请输入客户名称',
    elType: 'autocomplete',
    api: 'getCustomer'
  }, {
    label: '床号',
    prop: 'ch',
    style: { width: '130px' },
    placeholder: '请输入床号',
    elType: 'autocomplete',
    api: 'getBedNum'
  }, {
    label: '员工工号',
    prop: 'yggh',
    style: { width: '130px' },
    placeholder: '请输入员工工号',
    elType: 'autocomplete',
    api: 'getStaff'
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
    label: '工序名称',
    prop: 'gxmc',
    style: { width: '130px' },
    placeholder: '请输入工序名称',
    elType: 'autocomplete',
    api: 'getProcess'
  }, {
    label: '磁卡',
    prop: 'tmbh',
    style: { width: '130px' },
    placeholder: '请输入磁卡'
  }, {
    label: '作废工票',
    prop: 'zfgp',
    style: { width: '130px' },
    elType: 'select',
    listData: ['不包含', '包含'],
    defaultVal: '不包含',
    hideClearable: true
  }
]
