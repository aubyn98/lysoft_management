// import { math } from 'aubyn-common'
export const columnsLeft_xsbj = [
  {
    label: '客户名称',
    prop: 'khmc',
    width: 100,
    show: true
  },
  {
    label: '简码',
    prop: 'jm',
    width: 100,
    show: true
  }
]
export const columnsLeft_cgbj = [
  {
    label: '供货商',
    prop: 'ghsmc',
    width: 100,
    show: true
  },
  {
    label: '简码',
    prop: 'jm',
    width: 100,
    show: true
  }
]
export const columnsLeft_jgbj = [
  {
    label: '加工商',
    prop: 'jgsmc',
    width: 100,
    show: true
  },
  {
    label: '简码',
    prop: 'jm',
    width: 100,
    show: true
  }
]
export const columnsLeft_wfxsbj = JSON.parse(JSON.stringify(columnsLeft_jgbj))
export const columnsRight_xsbj = [
  {
    label: '款号',
    prop: 'kh',
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
    label: '款式类型',
    prop: 'kslx',
    width: 100,
    show: true
  },
  {
    label: '价格',
    prop: 'jg',
    width: 100,
    show: true
  },
  {
    label: '历史价',
    prop: 'lsjg',
    width: 100,
    show: true
  },
  {
    label: '最高价',
    prop: 'zgj',
    width: 100,
    show: true
  },
  {
    label: '最低价',
    prop: 'zdj',
    width: 100,
    show: true
  },
  {
    label: '日期',
    prop: 'riqi',
    width: 100,
    show: true
  }
]
export const columnsRight_cgbj = JSON.parse(JSON.stringify(columnsRight_xsbj))
export const columnsRight_jgbj = JSON.parse(JSON.stringify(columnsRight_xsbj))
export const columnsRight_wfxsbj = JSON.parse(JSON.stringify(columnsRight_xsbj))
export const columnsDialog = [{
  label: '款式类型',
  prop: 'kslx',
  width: 100,
  show: true,
  readonly: true,
  elType: 'autocomplete',
  api: 'getFashionType'
}, {
  label: '码数',
  prop: 'ms',
  width: 100,
  show: true
},
{
  label: '价格',
  prop: 'jg',
  width: 100,
  show: true
}]
export const columnsDialog_xsbj = [
  {
    label: '款号',
    prop: 'kh',
    width: 100,
    show: true,
    readonly: true,
    /* elType: 'autocomplete',
    api: 'getProductOffer_xsbj_kh', */
    relation: ['kslx']
  },
  ...columnsDialog
]

export const columnsDialog_cgbj = [
  {
    label: '款号',
    prop: 'kh',
    width: 100,
    show: true,
    readonly: true,
    /* elType: 'autocomplete',
    api: 'getProductOffer_cgbj_kh', */
    relation: ['kslx']
  },
  ...JSON.parse(JSON.stringify(columnsDialog))
]
export const columnsDialog_jgbj = [
  {
    label: '款号',
    prop: 'kh',
    width: 100,
    show: true,
    readonly: true,
    /* elType: 'autocomplete',
    api: 'getProductOffer_jgbj_kh', */
    relation: ['kslx']
  },
  ...JSON.parse(JSON.stringify(columnsDialog))
]
export const columnsDialog_wfxsbj = [
  {
    label: '款号',
    prop: 'kh',
    width: 100,
    show: true,
    readonly: true,
    /* elType: 'autocomplete',
    api: 'getProductOffer_wfxsbj_kh', */
    relation: ['kslx']
  },
  ...JSON.parse(JSON.stringify(columnsDialog))
]
