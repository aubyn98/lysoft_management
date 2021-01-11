export const formItems = [
  {
    label: '开单日期',
    prop: 'jhrq',
    labelWidth: '100px',
    placeholder: '请选择日期',
    style: { width: '260px' },
    elType: 'date'
  },
  {
    label: '承包员工工号',
    prop: 'yggh',
    labelWidth: '120px',
    placeholder: '请选择承包员工工号',
    style: { width: '260px' },
    elType: 'autocomplete',
    api: 'getStaff',
    relation: ['ygmc'],
    icon: true
  },
  {
    label: '承包员工姓名',
    prop: 'ygmc',
    labelWidth: '120px',
    placeholder: '请选择承包员工姓名',
    style: { width: '260px' },
    elType: 'autocomplete',
    api: 'getStaff',
    relation: ['yggh'],
    icon: true
  }, {
    label: '工序名称',
    prop: 'gxmc',
    labelWidth: '100px',
    placeholder: '请选择工序名称',
    style: { width: '260px' },
    elType: 'autocomplete',
    api: 'getProcess'/* ,
    icon: true */
  },
  {
    label: '',
    labelWidth: '0px',
    elType: 'blank_row1',
    style: { width: 'calc(100% - 1040px)' }
  },
  {
    label: '交货开始日期',
    prop: 'ksrq',
    labelWidth: '100px',
    placeholder: '请选择日期',
    style: { width: '260px' },
    elType: 'date'
  },
  {
    label: '交货结束日期',
    prop: 'jsrq',
    labelWidth: '120px',
    placeholder: '请选择日期',
    style: { width: '260px' },
    elType: 'date'
  },
  {
    label: '汇总模式',
    prop: 'hzms',
    labelWidth: '120px',
    placeholder: '请选择汇总模式',
    style: { width: '260px' },
    elType: 'select',
    listData: ['员工', '颜色'],
    defaultVal: '员工',
    hideClearable: true
  }, {
    label: '特种工序',
    prop: 'tzgx',
    labelWidth: '100px',
    placeholder: '请选择特种工序',
    style: { width: '260px' },
    sendKey: 'gxmc',
    elType: 'autocomplete',
    api: 'getProcess'
  }, {
    label: '',
    labelWidth: '0px',
    elType: 'blank_row2',
    style: { width: 'calc(100% - 1040px)' }
  }, {
    label: '多位员工',
    prop: 'yggh2',
    labelWidth: '100px',
    placeholder: '请选择员工',
    style: { width: '1040px' },
    elType: 'select',
    multiple: true,
    sendKey: 'yggh',
    api: 'getStaff',
    icon: true,
    listData: [],
    defaultVal: []
  }, {
    label: '',
    labelWidth: '20px',
    prop: 'blank_btn',
    elType: 'button',
    elText: '查询'
  }
]
