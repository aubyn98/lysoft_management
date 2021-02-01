// import { math, str } from 'aubyn-common'
export const columnsTitle = [
  {
    label: '开单日期',
    prop: 'kdrq',
    width: 136,
    elType: 'date'
  }, {
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
  {
    label: '名称',
    prop: 'mc',
    width: 100
  }, {
    label: '原始价值',
    prop: 'ysjz',
    sumProp: 'ysjz',
    width: 100
  }, {
    label: '残值率 % ',
    prop: 'czl',
    width: 100
  },
  {
    label: '折旧月份',
    prop: 'zjyf',
    width: 100
  },
  {
    label: '购入日期',
    prop: 'grrq',
    width: 100
  },
  {
    label: '剩余价值',
    prop: 'syjz',
    sumProp: 'syjz',
    width: 100
  },
  {
    label: '备注',
    prop: 'bz',
    width: 100
  },
  {
    label: '开单日期',
    prop: 'kdrq',
    width: 100
  },
  {
    label: '制单人',
    prop: 'zdr',
    width: 100
  }
]
