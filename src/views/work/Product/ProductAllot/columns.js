// import { math } from 'aubyn-common'
export const columnsLeft = [
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
    label: '数量',
    prop: 'sl',
    sumProp: 'sl',
    readonly: true,
    width: 100,
    show: true
  }, {
    label: '码数',
    prop: 'ms',
    width: 100,
    readonly: true,
    show: true
  },
  {
    label: '备注',
    prop: 'bz',
    width: 100
  }
]
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
    label: '制单人',
    prop: 'zdr',
    width: 100,
    readonly: true,
    defaultVal: () => {
      return JSON.parse(localStorage.getItem('account')).username
    }
  }
]
export const columnsList = [
  { label: '开单单号', prop: 'dh', width: 100 },
  { label: '开单日期', prop: 'rq', width: 100 },
  { label: '款号预览', prop: 'kh_bz', width: 100 },
  { label: '调出仓库', prop: 'ckmc', width: 100 },
  { label: '调入仓库', prop: 'drck', width: 100 },
  { label: '制单人', prop: 'zdr', width: 100 },
  /* { label: '开单金额', prop: 'kdje', width: 100 },
  { label: '其他金额', prop: 'qtje', width: 100 },
  { label: '金额类型', prop: 'jelx', width: 100 },
  { label: '合计', prop: 'hj', width: 100 },
  { label: '前单欠款', prop: 'qdqk', width: 100 },
  { label: '付款金额', prop: 'skje', width: 100 },
  { label: '累计欠款', prop: 'ljqk', width: 100 }, */
  {
    label: '审核',
    prop: 'sh',
    width: 100,
    elType: 'checkbox',
    align: 'center',
    disabled: true
  },
  { label: '备注', prop: 'bz', width: 100 }
]
