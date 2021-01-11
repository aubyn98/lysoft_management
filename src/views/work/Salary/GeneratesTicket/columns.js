// import { math } from 'aubyn-common'
export const columnsLeft = [
  {
    label: '客户订单',
    prop: 'yydh',
    width: 120/* ,
    elType: 'autocomplete',
    api: 'getCustomer',
    superKeys: ['khbh'],
    relation: ['khbh'] */
  },
  {
    label: '简码',
    prop: 'jm',
    width: 120,
    show: true,
    elType: 'autocomplete',
    api: 'getCustomer',
    relation: ['khmc']
  },
  {
    label: '客户名称',
    prop: 'khmc',
    width: 120,
    show: true,
    elType: 'autocomplete',
    api: 'getCustomer',
    relation: ['jm']
  },
  {
    label: '款号',
    prop: 'kh',
    width: 120,
    show: true,
    elType: 'autocomplete',
    api: 'getFashion',
    relation: ['sb', 'kslx']
  },
  {
    label: '商标',
    prop: 'sb',
    width: 120,
    show: true,
    elType: 'autocomplete',
    api: 'getTrademark'
  },
  {
    label: '布料',
    prop: 'bl',
    width: 120,
    show: true,
    sendKey: 'wlmc',
    elType: 'autocomplete',
    api: 'getMaterial'
  },
  {
    label: '颜色',
    prop: 'ysmc',
    width: 120,
    show: true,
    elType: 'autocomplete',
    api: 'getFashionColor',
    superKeys: ['kh']
  },
  {
    label: '布匹层',
    prop: 'cs',
    width: 120,
    show: true
  },
  {
    label: '总数1',
    prop: 'xj1',
    width: 120,
    show: true,
    sumProp: 'xj1'
  },
  {
    label: '码数1',
    dynamic: true,
    prop: 'ms1',
    width: 120,
    show: true,
    sumProp: 'ms1'
  },
  {
    label: '扎数1',
    prop: 'zs1',
    width: 120,
    show: true
  }, {
    label: '余数1',
    prop: 'ys1',
    width: 120,
    show: true
  }, {
    label: '总数2',
    prop: 'xj2',
    width: 120,
    show: true,
    sumProp: 'xj2'
  },
  {
    label: '码数2',
    dynamic: true,
    prop: 'ms2',
    width: 120,
    show: true,
    sumProp: 'ms2'
  },
  {
    label: '扎数2',
    prop: 'zs2',
    width: 120,
    show: true
  }, {
    label: '余数2',
    prop: 'ys2',
    width: 120,
    show: true
  }, {
    label: '总数3',
    prop: 'xj3',
    width: 120,
    show: true,
    sumProp: 'xj3'
  },
  {
    label: '码数3',
    dynamic: true,
    prop: 'ms3',
    width: 120,
    show: true,
    sumProp: 'ms3'
  },
  {
    label: '扎数3',
    prop: 'zs3',
    width: 120,
    show: true
  }, {
    label: '余数3',
    prop: 'ys3',
    width: 120,
    show: true
  }, {
    label: '总数4',
    prop: 'xj4',
    width: 120,
    show: true,
    sumProp: 'xj4'
  },
  {
    label: '码数4',
    dynamic: true,
    prop: 'ms4',
    width: 120,
    show: true,
    sumProp: 'ms4'
  },
  {
    label: '扎数4',
    prop: 'zs4',
    width: 120,
    show: true
  }, {
    label: '余数4',
    prop: 'ys4',
    width: 120,
    show: true
  }, {
    label: '总数5',
    prop: 'xj5',
    width: 120,
    show: true,
    sumProp: 'xj5'
  },
  {
    label: '码数5',
    dynamic: true,
    prop: 'ms5',
    width: 120,
    show: true,
    sumProp: 'ms5'
  },
  {
    label: '扎数5',
    prop: 'zs5',
    width: 120,
    show: true
  }, {
    label: '余数5',
    prop: 'ys5',
    width: 120,
    show: true
  }, {
    label: '总数6',
    prop: 'xj6',
    width: 120,
    show: true,
    sumProp: 'xj6'
  },
  {
    label: '码数6',
    dynamic: true,
    prop: 'ms6',
    width: 120,
    show: true,
    sumProp: 'ms6'
  },
  {
    label: '扎数6',
    prop: 'zs6',
    width: 120,
    show: true
  }, {
    label: '余数6',
    prop: 'ys6',
    width: 120,
    show: true
  }, {
    label: '总数7',
    prop: 'xj7',
    width: 120,
    show: true,
    sumProp: 'xj7'
  },
  {
    label: '码数7',
    dynamic: true,
    prop: 'ms7',
    width: 120,
    show: true,
    sumProp: 'ms7'
  },
  {
    label: '扎数7',
    prop: 'zs7',
    width: 120,
    show: true
  }, {
    label: '余数7',
    prop: 'ys7',
    width: 120,
    show: true
  }, {
    label: '总数8',
    prop: 'xj8',
    width: 120,
    show: true,
    sumProp: 'xj8'
  },
  {
    label: '码数8',
    dynamic: true,
    prop: 'ms8',
    width: 120,
    show: true,
    sumProp: 'ms8'
  },
  {
    label: '扎数8',
    prop: 'zs8',
    width: 120,
    show: true
  }, {
    label: '余数8',
    prop: 'ys8',
    width: 120,
    show: true
  }, {
    label: '总数9',
    prop: 'xj9',
    width: 120,
    show: true,
    sumProp: 'xj9'
  },
  {
    label: '码数9',
    dynamic: true,
    prop: 'ms9',
    width: 120,
    show: true,
    sumProp: 'ms9'
  },
  {
    label: '扎数9',
    prop: 'zs9',
    width: 120,
    show: true
  }, {
    label: '余数9',
    prop: 'ys9',
    width: 120,
    show: true
  }, {
    label: '总数10',
    prop: 'xj10',
    width: 120,
    show: true,
    sumProp: 'xj10'
  },
  {
    label: '码数10',
    dynamic: true,
    prop: 'ms10',
    width: 120,
    show: true,
    sumProp: 'ms10'
  },
  {
    label: '扎数10',
    prop: 'zs10',
    width: 120,
    show: true
  }, {
    label: '余数10',
    prop: 'ys10',
    width: 120,
    show: true
  }, {
    label: '总数11',
    prop: 'xj11',
    width: 120,
    show: true,
    sumProp: 'xj11'
  },
  {
    label: '码数11',
    dynamic: true,
    prop: 'ms11',
    width: 120,
    show: true,
    sumProp: 'ms11'
  },
  {
    label: '扎数11',
    prop: 'zs11',
    width: 120,
    show: true
  }, {
    label: '余数11',
    prop: 'ys11',
    width: 120,
    show: true
  }, {
    label: '总数12',
    prop: 'xj12',
    width: 120,
    show: true,
    sumProp: 'xj12'
  },
  {
    label: '码数12',
    dynamic: true,
    prop: 'ms12',
    width: 120,
    show: true,
    sumProp: 'ms12'
  },
  {
    label: '扎数12',
    prop: 'zs12',
    width: 120,
    show: true
  }, {
    label: '余数12',
    prop: 'ys12',
    width: 120,
    show: true
  },
  {
    label: '总扎数',
    prop: 'zzs',
    width: 120,
    sumProp: 'zzs'
  },
  {
    label: '总数量',
    prop: 'zsl',
    width: 120,
    show: true,
    sumProp: 'zsl'
  },
  {
    label: '备注',
    prop: 'bz',
    width: 120,
    show: true
  }
]
export const columnsRight = [
  {
    label: '分扎码',
    prop: 'fzm',
    width: 120,
    show: true
  },
  {
    label: '款号',
    prop: 'kh',
    width: 120,
    show: true
  },
  {
    label: '扎号',
    prop: 'zh',
    width: 120,
    show: true
  },
  {
    label: '款式类型',
    prop: 'kslx',
    width: 120,
    show: true
  },
  {
    label: '商标',
    prop: 'sb',
    width: 120,
    show: true
  },
  {
    label: '布料',
    prop: 'bl',
    width: 120,
    show: true
  },
  {
    label: '码数',
    prop: 'ms',
    width: 120,
    show: true
  },
  {
    label: '颜色',
    prop: 'ysmc',
    width: 120,
    show: true
  },
  {
    label: '工序名称',
    prop: 'gxmc',
    width: 120,
    show: true
  },
  {
    label: '数量',
    prop: 'sl',
    width: 120,
    show: true,
    sumProp: 'sl'
  },
  {
    label: '交货数量',
    prop: 'jhsl',
    width: 120,
    show: true,
    sumProp: 'jhsl'
  },
  {
    label: '排序',
    prop: 'px',
    width: 120,
    show: true
  },
  {
    label: '员工名称',
    prop: 'ygmc',
    width: 120,
    show: true
  },
  {
    label: '工序类型',
    prop: 'gxlx',
    width: 120,
    show: true
  },
  {
    label: '领货登记',
    prop: 'qhqr',
    width: 120,
    show: true,
    elType: 'checkbox'
  },
  {
    label: '领货日期',
    prop: 'lhrq',
    width: 120,
    show: true
  },
  {
    label: '领货人',
    prop: 'lh_ygmc',
    width: 120,
    show: true
  },
  {
    label: '交货日期',
    prop: 'jhrq',
    width: 120,
    show: true
  },
  {
    label: '单价',
    prop: 'dj',
    width: 120,
    show: true
  },
  {
    label: '工票码',
    prop: 'gpm',
    width: 120,
    show: true
  },
  {
    label: '磁卡编号',
    prop: 'tmbh',
    width: 120,
    show: true
  },
  {
    label: '之前条码',
    prop: 'zqtm',
    width: 120,
    show: true
  },
  {
    label: '备注',
    prop: 'bz',
    width: 120,
    show: true
  },
  {
    label: '外发单号',
    prop: 'yydh_wfcp',
    width: 120,
    show: true
  },
  {
    label: '加工商',
    prop: 'jgsmc',
    width: 120,
    show: true
  },
  {
    label: '入库设置',
    prop: 'ckmc',
    width: 120,
    show: true
  },
  {
    label: '下车间设置',
    prop: 'cjck',
    width: 120,
    show: true
  },
  {
    label: '后道设置',
    prop: 'hd',
    width: 120,
    show: true
  },
  {
    label: '工序数量',
    prop: 'gxsl',
    width: 120,
    show: true
  }
]
export const columnsTitle = [
  {
    label: '裁床单号',
    prop: 'dh',
    width: 100,
    readonly: true
  }, {
    label: '裁床日期',
    prop: 'rq',
    width: 136,
    elType: 'date'
  }, {
    label: '自动床号',
    prop: 'zdch',
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
  }, {
    label: '加工商',
    prop: 'jgsmc',
    width: 100
  }
]
export const columnsList = [
  {
    label: '裁床单号',
    prop: 'dh',
    width: 100
  },
  {
    label: '自动床号',
    prop: 'zdch',
    width: 100
  },
  {
    label: '裁床日期',
    prop: 'rq',
    width: 100
  }, {
    label: '床号',
    prop: 'ch',
    width: 100
  }, {
    label: '制单人',
    prop: 'zdr',
    width: 100
  }, {
    label: '款号预览',
    prop: 'kh_bz',
    width: 100
  }, {
    label: '结单',
    prop: 'jd',
    width: 100,
    elType: 'checkbox',
    align: 'center',
    disabled: true
  }, {
    label: '备注',
    prop: 'bz',
    width: 100
  }, {
    label: '外发加工商',
    prop: 'jgsmc',
    width: 100
  }
]
