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
    label: '项目名称',
    prop: 'xmmc',
    width: 100
  }, {
    label: '借贷人',
    prop: 'jddx',
    width: 100
  }, {
    label: '借贷类型',
    prop: 'jd_lx',
    width: 100
  }, {
    label: '本金',
    prop: 'bj',
    sumProp: 'bj',
    width: 100
  },
  {
    label: '利息',
    prop: 'lx',
    sumProp: 'lx',
    width: 100
  },
  {
    label: '合计',
    prop: 'hj',
    sumProp: 'hj',
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
export const columnsDetail = [
  {
    label: '日期',
    prop: 'rq',
    elType: 'date',
    width: 140
  }, {
    label: '项目名称',
    prop: 'xmmc',
    width: 100
  }, {
    label: '还款金额',
    prop: 'hkje',
    sumProp: 'hkje',
    width: 100
  },
  {
    label: '银行账号',
    prop: 'yhzh',
    width: 100
  },
  {
    label: '备注',
    prop: 'bz',
    width: 100
  }
]
