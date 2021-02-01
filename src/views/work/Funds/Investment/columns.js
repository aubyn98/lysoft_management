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
    label: '日期',
    prop: 'rq',
    width: 100
  }, {
    label: '投资人',
    prop: 'tzzmc',
    width: 100
  }, {
    label: '认缴金额',
    prop: 'rjje',
    width: 100
  },
  {
    label: '实缴金额',
    prop: 'sjje',
    width: 100
  },
  {
    label: '已缴金额',
    prop: 'yj',
    width: 100
  },
  {
    label: '占股',
    prop: 'zg',
    width: 100
  },
  {
    label: '收款账号',
    prop: 'skzh',
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
