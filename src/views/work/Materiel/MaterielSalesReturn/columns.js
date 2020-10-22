export const columnsLeft = [
  {
    label: '条码编号',
    prop: 'tmbh',
    width: 100/* ,
    elType: 'autocomplete',
    api: 'getCustomer',
    superKeys: ['khbh'],
    relation: ['khbh'] */
  },
  {
    label: '物料编号',
    prop: 'wlbh',
    width: 100,
    show: true
  },
  {
    label: '物料名称',
    prop: 'wlmc',
    width: 100,
    show: true
  },
  {
    label: '档位',
    prop: 'ckdw',
    width: 100,
    show: true
  },
  {
    label: '类型',
    prop: 'lx',
    width: 100,
    show: true
  },
  {
    label: '规格',
    prop: 'gg',
    width: 100,
    show: true
  },
  {
    label: '颜色',
    prop: 'ysmc',
    width: 100,
    show: true
  },
  {
    label: '缸号',
    prop: 'gh',
    width: 100,
    show: true
  },
  {
    label: '色号',
    prop: 'sh',
    width: 100,
    show: true
  },
  {
    label: '匹数',
    prop: 'ps',
    width: 100,
    show: true,
    sumProp: 'ps'
  },
  {
    label: '单位',
    prop: 'dw',
    width: 100,
    show: true
  },
  {
    label: '数量',
    prop: 'sl',
    width: 100,
    show: true,
    sumProp: 'sl'
  },
  {
    label: '单价',
    prop: 'dj',
    width: 100,
    show: true
  },
  {
    label: '金额',
    prop: 'je',
    width: 100,
    show: true,
    sumProp: 'je'
  }, {
    label: '条码',
    prop: 'tm',
    width: 100,
    show: true
  }, {
    label: '备注',
    prop: 'bz',
    width: 100,
    show: true
  }
]
export const columnsRight = [
  {
    label: '匹数1',
    prop: 'ps1',
    width: 50
  },
  {
    label: '匹数2',
    prop: 'ps2',
    width: 50
  },
  {
    label: '匹数3',
    prop: 'ps3',
    width: 50
  },
  {
    label: '匹数4',
    prop: 'ps4',
    width: 50
  },
  {
    label: '匹数5',
    prop: 'ps5',
    width: 50
  }, {
    label: '匹数6',
    prop: 'ps6',
    width: 50
  }, {
    label: '匹数7',
    prop: 'ps7',
    width: 50
  }, {
    label: '匹数8',
    prop: 'ps8',
    width: 50
  }, {
    label: '匹数9',
    prop: 'ps9',
    width: 50
  }, {
    label: '匹数10',
    prop: 'ps10',
    width: 50
  }, {
    label: '小计',
    prop: 'xj',
    width: 50
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
