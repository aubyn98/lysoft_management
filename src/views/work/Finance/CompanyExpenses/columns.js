import { math, str } from 'aubyn-common'
export const columnsXx = [
  {
    label: '简码',
    prop: 'jm',
    width: 100,
    show: true,
    computed (row) {
      return str.py.getCamelChars(row.mc)
    }
  },
  {
    label: '开支名称',
    prop: 'mc',
    width: 100,
    show: true,
    elType: 'autocomplete',
    api: 'getExpenditure'
  },
  {
    label: '单价',
    prop: 'dj',
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
    label: '单位',
    prop: 'dw',
    width: 100,
    show: true
  },
  {
    label: '合计',
    prop: 'hj',
    width: 100,
    show: true,
    sumProp: 'hj',
    computed (row) {
      return math.multiply(parseFloat(row.sl || 0), parseFloat(row.dj || 0))
    }
  },
  {
    label: '备注',
    prop: 'bz',
    width: 100,
    show: true
  }
]
export const columnsTitle = [
  {
    label: '报销人',
    prop: 'bxr',
    width: 100
  }, {
    label: '开单单号',
    prop: 'dh',
    width: 100,
    readonly: true
  }, {
    label: '开单日期',
    prop: 'rq',
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
    readonly: true,
    defaultVal: () => {
      return JSON.parse(localStorage.getItem('account')).username
    }
  }
]
export const columnsList = [
  {
    label: '单号',
    prop: 'dh',
    width: 100
  },
  {
    label: '开支日期',
    prop: 'rq',
    width: 100
  },
  {
    label: '项目名称',
    prop: 'xmmc',
    width: 100
  },
  {
    label: '制单人',
    prop: 'zdr',
    width: 100
  },
  {
    label: '类别',
    prop: 'lb',
    width: 100
  },
  {
    label: '银行账号',
    prop: 'yhzh',
    width: 100
  },
  {
    label: '报销人',
    prop: 'bxr',
    width: 100
  },
  {
    label: '金额',
    prop: 'je',
    width: 100,
    sumProp: 'je'
  },
  {
    label: '开支方式',
    prop: 'xs',
    width: 100
  },
  {
    label: '流水单号',
    prop: 'lsdh',
    width: 100
  },
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
  {
    label: '备注',
    prop: 'bz',
    width: 100
  },
  {
    label: '前单金额',
    prop: 'qdje',
    width: 100
  },
  {
    label: '结欠金额',
    prop: 'jqje',
    width: 100
  }
]
export const columnsListMx = [
  { label: '日期', prop: 'rq1', width: 100 },
  { label: '项目名称', prop: 'xmmc', width: 100 },
  { label: '本单金额', prop: 'je', width: 100 },
  { label: '开支类型', prop: 'lb', width: 100 },
  { label: '记录名称', prop: 'mc', width: 100 },
  { label: '单号', prop: 'dh', width: 100 },
  { label: '单价', prop: 'dj', width: 100 },
  { label: '数量', prop: 'sl', width: 100 },
  { label: '单位', prop: 'dw', width: 100 },
  { label: '记录小计', prop: 'hj', width: 100 },
  { label: '银行账户', prop: 'yhzh', width: 100 },
  { label: '报销人', prop: 'bxr', width: 100 },
  { label: '流水单号', prop: 'lsdh', width: 100 },
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
  { label: '记录备注', prop: 'bz2', width: 100 },
  { label: '单据备注', prop: 'bz', width: 100 }
]
