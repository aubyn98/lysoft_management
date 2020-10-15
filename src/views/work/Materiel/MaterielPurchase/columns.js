export const columnsXx = [
  {
    label: '客户名称',
    prop: 'khmc',
    width: 180/* ,
    elType: 'autocomplete',
    api: 'getCustomer',
    superKeys: ['khbh'],
    relation: ['khbh'] */
  },
  {
    label: '客户编号',
    prop: 'khbh',
    width: 180,
    show: true
  },
  {
    label: '简码',
    prop: 'jm',
    width: 180,
    show: true
  },
  {
    label: '单据累欠',
    prop: 'templjqk',
    width: 180,
    show: true,
    sumProp: 'templjqk'
  },
  {
    label: '审核累欠',
    prop: 'ljqk',
    width: 180,
    show: true,
    sumProp: 'ljqk'
  },
  {
    label: '客户类型',
    prop: 'lx',
    width: 180,
    show: true
  },
  {
    label: '客户等级',
    prop: 'khdj',
    width: 180,
    show: true
  }
]
export const columnsTitle = [
  {
    label: '开单单号',
    prop: 'kddh',
    width: 100,
    readonly: true
  }, {
    label: '开单日期',
    prop: 'kdrq',
    width: 136,
    elType: 'date'
  }, {
    label: '流水单号',
    prop: 'lsdh',
    width: 100,
    readonly: true
  }, {
    label: '制单人',
    prop: 'zdr',
    width: 100,
    readonly: true
  }
]
