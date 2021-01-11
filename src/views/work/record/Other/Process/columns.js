export const columnsLeft = [
  {
    label: '工序名称',
    prop: 'gxmc',
    width: 100
  },
  {
    label: '简码',
    prop: 'jm',
    width: 100
  },
  {
    label: '工价',
    prop: 'gj',
    width: 100
  }, {
    label: '工序类型',
    prop: 'gxlx',
    width: 100
  },
  {
    label: '类型',
    prop: 'lx',
    width: 100
  },
  {
    label: '更新产量登记所录入款号的工价',
    prop: 'bz',
    width: 200
  }
]
export const columnsRight = [
  {
    label: '工号',
    prop: 'yggh',
    width: 100,
    elType: 'autocomplete',
    relation: ['ygmc', 'jm', 'bm'],
    api: 'getStaff'
  }, {
    label: '姓名',
    prop: 'ygmc',
    width: 100,
    elType: 'autocomplete',
    relation: ['yggh', 'jm', 'bm'],
    api: 'getStaff'
  }, {
    label: '简码',
    prop: 'jm',
    width: 100,
    elType: 'autocomplete',
    relation: ['ygmc', 'yggh', 'bm'],
    api: 'getStaff'
  }, {
    label: '所属部门',
    prop: 'bm',
    width: 100
  }
]
