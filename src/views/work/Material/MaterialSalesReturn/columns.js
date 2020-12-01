import { math } from 'aubyn-common'
export const columnsLeft = [
  {
    label: '条码编号',
    prop: 'tmbh',
    width: 100/* ,
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
    show: true,
    elType: 'autocomplete',
    api: 'getMaterial',
    relation: ['wlbh', 'wlbm', 'dw'],
    clearRelation: ['ysmc', 'gg']
  },
  {
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
    label: '匹数',
    prop: 'ps',
    width: 100,
    show: true,
    sumProp: 'ps'
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
    label: '金额',
    prop: 'je',
    width: 100,
    show: true,
    sumProp: 'je',
    computed: (r) => {
      return math.multiply(parseFloat(r.sl || 0), parseFloat(r.dj || 0))
    }
  }, {
    label: '条码',
    prop: 'tm',
    width: 100,
    show: true
  }, {
    label: '备注',
    prop: 'bz',
    width: 100,
    show: true
  }
]
export const columnsRight = [
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
  }, {
    label: '匹数6',
    prop: 'ps6',
    width: 50
  }, {
    label: '匹数7',
    prop: 'ps7',
    width: 50
  }, {
    label: '匹数8',
    prop: 'ps8',
    width: 50
  }, {
    label: '匹数9',
    prop: 'ps9',
    width: 50
  }, {
    label: '匹数10',
    prop: 'ps10',
    width: 50
  },
  {
    label: '小计',
    prop: 'xj',
    width: 50,
    sumProp: 'xj',
    computed: (r) => {
      return Object.keys(r).reduce((t, k) => {
        if (k.includes('ps')) {
          t = math.add(parseFloat(t), parseFloat(r[k] || 0))
        }
        return t
      }, 0)
    }
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
    label: '开单单号',
    prop: 'dh',
    width: 100
  },
  {
    label: '开单日期',
    prop: 'rq',
    width: 100
  },
  {
    label: '客户编号',
    prop: 'khbh',
    width: 100
  },
  {
    label: '客户名称',
    prop: 'khmc',
    width: 100
  },
  {
    label: '仓库名称',
    prop: 'ckmc',
    width: 100
  },
  {
    label: '流水单号',
    prop: 'lsdh',
    width: 100
  },
  {
    label: '制单人',
    prop: 'zdr',
    width: 100
  },
  {
    label: '开单金额 ',
    prop: 'kdje',
    width: 100
  },
  {
    label: '其他金额',
    prop: 'qtje',
    width: 100
  },
  {
    label: '金额类型',
    prop: 'jelx',
    width: 100
  },
  {
    label: '合计',
    prop: 'hj',
    width: 100
  },
  {
    label: '前单欠款',
    prop: 'qdqk',
    width: 100
  },
  {
    label: '付款金额',
    prop: 'skje',
    width: 100
  },
  {
    label: '累计欠款',
    prop: 'ljqk',
    width: 100
  }, {
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
  }

]
