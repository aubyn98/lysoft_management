import { math } from 'aubyn-common'
export const columnsXx = [
  {
    label: '是否打印',
    prop: 'sfdy',
    width: 100,
    show: true,
    elType: 'checkbox',
    align: 'center',
    disabled: true
  }, {
    label: '条码编号',
    prop: 'tmbh',
    width: 100,
    show: false/* ,
    elType: 'autocomplete',
    api: 'getCustomer',
    superKeys: ['khbh'],
    relation: ['khbh'] */
  },
  {
    label: '物料编号',
    prop: 'wlbh',
    width: 100,
    show: true,
    elType: 'autocomplete',
    api: 'getMaterial',
    relation: ['wlmc', 'wlbm', 'dw'],
    clearRelation: ['ysmc', 'gg']
  },
  {
    label: '物料名称',
    prop: 'wlmc',
    width: 100,
    elType: 'autocomplete',
    api: 'getMaterial',
    relation: ['wlbh', 'wlbm', 'dw'],
    clearRelation: ['ysmc', 'gg']
  },
  {
    label: '档位类型',
    prop: 'dwlx',
    width: 100,
    show: true
  }, {
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
    show: true,
    elType: 'autocomplete',
    api: 'getMaterialSpec_Bill',
    superKeys: ['wlbh', 'wlmc']
  },
  {
    label: '颜色',
    prop: 'ysmc',
    width: 100,
    show: true,
    elType: 'autocomplete',
    api: 'getMaterialColor_Bill',
    superKeys: ['wlbh', 'wlmc']
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
    label: '匹数',
    prop: 'ps',
    width: 100,
    show: true,
    sumProp: 'ps'
  },
  {
    label: '金额',
    prop: 'je',
    width: 100,
    show: true,
    sumProp: 'je',
    computed: (r) => {
      return math.multiply(parseFloat(r.sl || 0), parseFloat(r.dj || 0))
    },
    readonly: true
  },
  {
    label: '条码',
    prop: 'tm',
    width: 100,
    show: true
  },
  {
    label: '是否分配',
    prop: 'sffp',
    width: 100,
    show: true,
    elType: 'checkbox',
    align: 'center'
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
  { label: '来货商', prop: 'khmc', width: 100 },
  { label: '开单日期', prop: 'rq', width: 100 },
  { label: '盘点类型', prop: 'lx', width: 100 },
  { label: '仓库名称', prop: 'ckmc', width: 100 },
  { label: '制单人', prop: 'zdr', width: 100 },
  {
    label: '审核',
    prop: 'sh',
    width: 100,
    elType: 'checkbox',
    align: 'center',
    disabled: true
  },
  { label: '审核人', prop: 'shr', width: 100 },
  { label: '备注', prop: 'bz', width: 100 }
]
