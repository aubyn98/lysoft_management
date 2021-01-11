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
    label: '员工工号',
    prop: 'yggh',
    width: 100
  },
  {
    label: '员工名称',
    prop: 'ygmc',
    width: 100
  },
  {
    label: '请假日期',
    prop: 'qjrq',
    width: 100
  },
  {
    label: '返厂日期',
    prop: 'fcrq',
    width: 100
  },
  {
    label: '天数',
    prop: 'ts',
    width: 100
  },
  {
    label: '时数',
    prop: 'ss',
    width: 100
  },
  {
    label: '分数',
    prop: 'fs',
    width: 100
  },
  {
    label: '请假类型',
    prop: 'qjlx',
    width: 100,
    sumProp: 'je'
  },
  {
    label: '结算状态',
    prop: 'zt',
    width: 100
  },
  {
    label: '备注',
    prop: 'bz',
    width: 100
  }
]
