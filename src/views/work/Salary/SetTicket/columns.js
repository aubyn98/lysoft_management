export const columnsCj = [
  {
    label: '员工简码',
    prop: 'jm',
    width: 100,
    show: true,
    elType: 'autocomplete',
    api: 'getStaff',
    relation: ['yggh', 'ygmc']
  },
  {
    label: '员工工号',
    prop: 'yggh',
    width: 100,
    show: true,
    elType: 'autocomplete',
    api: 'getStaff',
    relation: ['jm', 'ygmc']
  },
  {
    label: '员工名称',
    prop: 'ygmc',
    width: 100,
    show: true,
    elType: 'autocomplete',
    api: 'getStaff',
    relation: ['yggh', 'jm']
  }, {
    label: '数量',
    prop: 'sl',
    width: 100,
    show: true,
    sumProp: 'sl'
  }
]
export const columnsGx = [
  {
    label: '工序名称',
    prop: 'gxmc',
    width: 100,
    show: true
  },
  {
    label: '码数',
    prop: 'ms',
    width: 100,
    show: true
  },
  {
    label: '排序',
    prop: 'px',
    width: 80,
    show: true
  }, {
    label: '工序类型',
    prop: 'gxlx',
    width: 100,
    show: true
  }, {
    label: '原工价',
    prop: 'ygj',
    width: 100,
    show: true
  }, {
    label: '倍数',
    prop: 'bs',
    width: 80,
    show: true
  }, {
    label: '工价',
    prop: 'gj',
    width: 100,
    show: true
  }, {
    label: '交货顺序设置',
    prop: 'qhqr',
    width: 100,
    show: true,
    elType: 'checkbox'
  }, {
    label: '下车间设置',
    prop: 'cjck',
    width: 100,
    show: true
  }, {
    label: '入库设置',
    prop: 'ckmc',
    width: 100,
    show: true
  }, {
    label: '后道设置',
    prop: 'hd',
    width: 100,
    show: true
  }
]
