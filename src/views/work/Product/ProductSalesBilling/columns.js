// import { math } from 'aubyn-common'
export const columnsLeft = [
  {
    label: '厂家款号',
    prop: 'cjkh',
    sendKey: 'kh',
    width: 100,
    show: false,
    elType: 'autocomplete',
    api: 'getFashion'
  },
  {
    label: '款号',
    prop: 'kh',
    width: 100,
    show: true,
    elType: 'autocomplete',
    api: 'getFashion',
    relation: ['sb', 'kslx']
  }, {
    label: '商标',
    prop: 'sb',
    width: 100,
    show: true,
    elType: 'autocomplete',
    api: 'getTrademark'
  }, {
    label: '款式类型',
    prop: 'kslx',
    width: 100,
    show: true,
    elType: 'autocomplete',
    api: 'getFashionType'
  }, {
    label: '单位',
    prop: 'dw',
    width: 100,
    show: true,
    elType: 'autocomplete',
    api: 'getUnit'
  }, {
    label: '折扣%',
    prop: 'zk',
    width: 100,
    show: true
  }, {
    label: '数量',
    prop: 'sl',
    sumProp: 'sl',
    readonly: true,
    width: 100,
    show: true
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
    sumProp: 'je',
    computed: `
    return this.$math.multiply(parseFloat(r.sl || 0), parseFloat(r.dj || 0))
    `,
    readonly: true
  }, {
    label: '码数',
    prop: 'ms',
    width: 100,
    readonly: true,
    show: true
  }, {
    label: '特价',
    prop: 'tj',
    width: 100,
    show: true
  }, {
    label: '档位',
    prop: 'ckdw',
    width: 100,
    show: true
  }, {
    label: '不减库存',
    prop: 'sfkc',
    width: 100,
    show: true,
    elType: 'checkbox',
    align: 'center'
  }, {
    label: '引用单号',
    prop: 'yydh',
    width: 100,
    show: true
  },
  {
    label: '备注',
    prop: 'bz',
    width: 100
  }

]
/* export const columnsRight = [
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
  },
  {
    label: '匹数6',
    prop: 'ps6',
    width: 50
  },
  {
    label: '匹数7',
    prop: 'ps7',
    width: 50
  },
  {
    label: '匹数8',
    prop: 'ps8',
    width: 50
  },
  {
    label: '匹数9',
    prop: 'ps9',
    width: 50
  },
  {
    label: '匹数10',
    prop: 'ps10',
    width: 50
  },
  {
    label: '小计',
    prop: 'xj',
    width: 50,
    sumProp: 'xj',
    computed: `
      return Object.keys(r).reduce((t, k) => {
        if (k.includes('ps')) {
          t = this.$math.add(parseFloat(t), parseFloat(r[k] || 0))
        }
        return t
      }, 0)
    `
  }
] */
export const columnsTitle = [
  {
    label: '开单单号',
    prop: 'dh',
    width: 100,
    readonly: true
  },
  {
    label: '开单日期',
    prop: 'rq',
    width: 136,
    elType: 'date'
  },
  {
    label: '流水单号',
    prop: 'lsdh',
    width: 100,
    readonly: true
  },
  {
    label: '制单人',
    prop: 'zdr',
    width: 100,
    readonly: true,
    defaultVal: () => {
      return JSON.parse(localStorage.getItem('account')).username
    }
  },
  {
    label: '业务员',
    prop: 'ywy',
    width: 100
  }
]
export const columnsList = [
  { label: '开单单号', prop: 'dh', width: 100 },
  { label: '开单日期', prop: 'rq', width: 100 },
  { label: '客户名称', prop: 'khmc', width: 100 },
  { label: '仓库名称', prop: 'ckmc', width: 100 },
  { label: '流水单号', prop: 'lsdh', width: 100 },
  { label: '制单人', prop: 'zdr', width: 100 },
  // { label: '款号预览', prop: 'kh_bz', width: 100 },
  { label: '开单金额', prop: 'kdje', width: 100 },
  { label: '其他金额', prop: 'qtje', width: 100 },
  { label: '金额类型', prop: 'jelx', width: 100 },
  { label: '合计', prop: 'hj', width: 100 },
  { label: '前单欠款', prop: 'qdqk', width: 100 },
  { label: '收款金额', prop: 'skje', width: 100 },
  { label: '结欠金额', prop: 'ljqk', width: 100 },
  {
    label: '审核',
    prop: 'sh',
    width: 100,
    elType: 'checkbox',
    align: 'center',
    disabled: true
  },
  {
    label: '作废',
    prop: 'ch',
    width: 100,
    elType: 'checkbox',
    align: 'center',
    disabled: true
  },
  { label: '备注', prop: 'bz', width: 100 }
]
