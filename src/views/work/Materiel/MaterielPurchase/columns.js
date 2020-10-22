export const columnsLeft = [
  {
    label: '款号',
    prop: 'kh',
    width: 120/* ,
    elType: 'autocomplete',
    api: 'getCustomer',
    superKeys: ['khbh'],
    relation: ['khbh'] */
  },
  {
    label: '床号',
    prop: 'ch',
    width: 120,
    show: true/* ,
    computed: {
      props: ['kh', 'tmbh'],
      handler: function (row) {
        return row.kh * row.tmbh
      }
    } */
  },
  {
    label: '条码编号',
    prop: 'tmbh',
    width: 120,
    show: true
  },
  {
    label: '物料编号',
    prop: '物料编号',
    width: 120,
    show: true/* ,
    computed: function (row) {
      return row.kh * row.tmbh
    } */
  },
  {
    label: '物料名称',
    prop: 'wlmc',
    width: 120,
    show: true
  },
  {
    label: '供货别名',
    prop: 'wlbm',
    width: 120,
    show: true
  },
  {
    label: '类型',
    prop: 'lx',
    width: 120,
    show: true
  },
  {
    label: '规格',
    prop: 'gg',
    width: 120,
    show: true
  },
  {
    label: '颜色',
    prop: 'ys',
    width: 120,
    show: true
  },
  {
    label: '色号',
    prop: 'sh',
    width: 120,
    show: true
  },
  {
    label: '单位',
    prop: 'dw',
    width: 120,
    show: true
  },
  {
    label: '供货商规格幅宽克',
    prop: 'ghsggfkk',
    width: 120,
    show: true
  },
  {
    label: '匹数',
    prop: 'ps',
    width: 120,
    show: true,
    sumProp: 'ps'
  },
  {
    label: '应采购匹数',
    prop: 'ycgps',
    width: 120,
    show: true
  },
  {
    label: '采购数量',
    prop: 'cgsl',
    width: 120,
    show: true
  },
  {
    label: '单价',
    prop: 'dj',
    width: 120,
    show: true
  },
  {
    label: '金额',
    prop: 'je',
    width: 120,
    show: true,
    sumProp: 'je'
  },
  {
    label: '预采欠数',
    prop: 'ycqs',
    width: 120,
    show: true
  },
  {
    label: '引用单号',
    prop: 'yydh',
    width: 120,
    show: true
  },
  {
    label: '备注',
    prop: 'bz',
    width: 120,
    show: true
  },
  {
    label: '仓库数',
    prop: 'cks',
    width: 120,
    show: true
  },
  {
    label: '所选需求数',
    prop: 'ssxqs',
    width: 120,
    show: true
  },
  {
    label: '占用数',
    prop: 'zys',
    width: 120,
    show: true
  },
  {
    label: '在途中',
    prop: 'ztz',
    width: 120,
    show: true
  },
  {
    label: '预计采购数',
    prop: 'yjcgs',
    width: 120,
    show: true
  },
  {
    label: '供货商尺寸',
    prop: 'ghscc',
    width: 120,
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
