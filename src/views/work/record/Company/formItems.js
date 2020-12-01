import { num } from '@/common/utils/pattern'
export const ProductSettings = [
  /* {
    label: '',
    prop: 'sfdg',
    style: { width: '300px' },
    elType: 'checkbox',
    elText: '信用额超出禁止保存单据',
    labelWidth: '0px'
  },
  {
    label: '',
    prop: 'sfdg',
    style: { width: '300px' },
    elType: 'checkbox',
    elText: '负库存禁止保存单据',
    labelWidth: '0px'
  },
  {
    label: '',
    prop: 'sfdg',
    style: { width: '300px' },
    elType: 'checkbox',
    elText: '开产品盘点单时检车床号是否为空',
    labelWidth: '0px'
  },
  {
    label: '',
    prop: 'sfdg',
    style: { width: '300px' },
    elType: 'checkbox',
    elText: '自定义款号',
    labelWidth: '0px'
  },
  {
    label: '',
    prop: 'sfdg',
    style: { width: '300px' },
    elType: 'checkbox',
    elText: '销售认订单价格',
    labelWidth: '0px'
  },
  {
    label: '',
    prop: 'sfdg',
    style: { width: '300px' },
    elType: 'checkbox',
    elText: '引用单据后修改数量',
    labelWidth: '0px'
  },
  {
    label: '',
    prop: 'sfdg',
    style: { width: '300px' },
    elType: 'checkbox',
    elText: '产品商标报价',
    labelWidth: '0px'
  } */
]
export const CompanyInfo = [
  {
    label: '公司名称',
    prop: 'gsmc',
    style: { width: '300px' },
    placeholder: '请输入公司名称',
    rules: [{ trigger: 'focus', required: true, message: '请输入公司名称' }]
  },
  {
    label: '英文名称',
    prop: 'ywmc',
    style: { width: '300px' },
    placeholder: '请输入英文名称'
  },
  {
    label: '联系人',
    prop: 'lxr',
    style: { width: '300px' },
    placeholder: '请输入联系人'
  },
  {
    label: '电话',
    prop: 'dh',
    style: { width: '300px' },
    placeholder: '请输入电话'
  },
  {
    label: '手机',
    prop: 'sj',
    style: { width: '300px' },
    placeholder: '请输入电话'
  },
  {
    label: '传真',
    prop: 'fax',
    style: { width: '300px' },
    placeholder: '请输入电话'
  },
  {
    label: 'QQ',
    prop: 'qqzh',
    style: { width: '300px' },
    placeholder: '请输入QQ'
  },
  {
    label: '微信',
    prop: 'wxzh',
    style: { width: '300px' },
    placeholder: '请输入微信'
  },
  {
    label: '邮箱',
    prop: 'yx',
    style: { width: '300px' },
    placeholder: '请输入邮箱'
  },
  {
    label: 'QQ群',
    prop: 'qqqh',
    style: { width: '300px' },
    placeholder: '请输入QQ群'
  },
  {
    label: '网址',
    prop: 'wz',
    style: { width: '300px' },
    placeholder: '请输入网址'
  },
  {
    label: '现金存款',
    prop: 'xjck',
    style: { width: '300px' },
    placeholder: '请输入现金存款',
    rules: [{ trigger: 'focus', pattern: num, message: '请输入数字' }]
  },
  {
    label: '',
    prop: 'yhxx',
    style: { width: '300px' },
    elType: 'button',
    elText: '银行信息',
    labelWidth: '0px'
  },
  /* {
    label: '',
    prop: 'sfdg',
    style: { width: '300px' },
    elType: 'checkbox',
    elText: '是否订购会形式',
    labelWidth: '0px'
  }, */ {
    label: '银行名称',
    prop: 'yhmc',
    style: { width: '300px' },
    placeholder: '请输入银行名称'
  }, {
    label: '公司地址',
    prop: 'gsdz',
    style: { width: '600px' },
    placeholder: '请输入公司地址'
  }
]
export const SystemSettings = [
  {
    label: '系统选项',
    formItems: [
      {
        label: '',
        prop: 'gzbj',
        style: { width: '140px' },
        elType: 'checkbox',
        elText: '跟踪客户报价',
        labelWidth: '0px'
      },
      /* {
        label: '',
        prop: 'sfdg',
        style: { width: '200px' },
        elType: 'checkbox',
        elText: '开销售单据时自动添加款式颜色',
        labelWidth: '0px'
      }, */
      {
        label: '默认日期类型',
        prop: 'rqlx',
        style: { width: '200px' },
        labelWidth: '130px',
        elType: 'select',
        listData: ['近期', '昨天', '今天', '本周', '上周', '本月', '上月', '本年']
      },
      {
        label: '',
        prop: 'blank_1',
        style: { width: 'calc(100% - 540px)' },
        elType: 'blank',
        labelWidth: '0px'
      },
      {
        label: '',
        prop: 'kcbj',
        style: { width: '110px' },
        elType: 'checkbox',
        elText: '报警提示',
        labelWidth: '0px'
      },
      /* {
        label: '',
        prop: 'sfdg',
        style: { width: '110px' },
        elType: 'checkbox',
        elText: '窗体最大化',
        labelWidth: '0px'
      }, */
      {
        label: '',
        prop: 'sfjm',
        style: { width: '110px' },
        elType: 'checkbox',
        elText: '支持简码',
        labelWidth: '0px'
      },
      {
        label: '',
        prop: 'sffkc',
        style: { width: '120px' },
        elType: 'checkbox',
        elText: '负库存销售提示',
        labelWidth: '0px'
      },
      {
        label: '统计默认日期范围',
        prop: 'mrrqfw',
        style: { width: '170px' },
        labelWidth: '130px'
      },
      {
        label: '个月',
        prop: 'blank_gy',
        style: { width: '50px' },
        labelWidth: '50px',
        elType: 'blank'
      }, /* {
        label: '图片大小超过',
        prop: 'sfdg',
        style: { width: '170px' },
        labelWidth: '110px'
      },
      {
        label: 'kb提示',
        prop: 'sfdg',
        style: { width: '60px' },
        labelWidth: '60px',
        elType: 'blank'
      }, */ {
        label: '',
        prop: 'blank_2',
        style: { width: 'calc(100% - 450px)' },
        elType: 'blank',
        labelWidth: '0px'
      },
      {
        label: '',
        prop: 'xsdzdsh',
        style: { width: '150px' },
        elType: 'checkbox',
        elText: '销售单自动审核',
        labelWidth: '0px'
      }/* , {
        label: '',
        prop: 'sfdg',
        style: { width: '120px' },
        elType: 'checkbox',
        elText: '收款报警',
        labelWidth: '0px'
      } */
    ]
  },
  {
    label: '其他设置',
    formItems: [
      {
        label: '金额取位',
        prop: 'jeqw',
        style: { width: '170px' },
        labelWidth: '86px',
        elType: 'select',
        listData: ['默认', '个位', '十位', '百位']
      },
      {
        label: '每页数据',
        prop: 'mysj',
        style: { width: '170px' },
        labelWidth: '86px'
      }, {
        label: '条',
        prop: 'blank_tt',
        style: { width: '30px' },
        labelWidth: '30px',
        elType: 'blank'
      },
      {
        label: '物料报警提前',
        prop: 'mrbjrq',
        style: { width: '170px' },
        labelWidth: '110px'
      }, {
        label: '天',
        prop: 'blank_t',
        style: { width: '30px' },
        labelWidth: '30px',
        elType: 'blank'
      }/* , {
        label: '',
        prop: 'blank_1',
        elType: 'blank',
        style: { width: 'calc(100% - 570px)' }
      },
      {
        label: '产品类型',
        prop: 'sfdg',
        style: { width: '170px' },
        labelWidth: '86px'
      },
      {
        label: '',
        prop: 'sfdg',
        style: { width: '220px' },
        elType: 'checkbox',
        elText: '隐藏款式档案里的尺码列',
        labelWidth: '0px'
      } */
    ]
  }/* ,
  {
    label: '条码设置',
    formItems: [
      {
        label: '条码类型',
        prop: 'sfdg',
        style: { width: '170px' },
        labelWidth: '86px'
      }, {
        label: '',
        prop: 'sfdg',
        style: { width: '290px' },
        elType: 'checkbox',
        elText: '智能仓库是否一个档位可以放多个款',
        labelWidth: '0px'
      }, {
        label: '',
        prop: 'blank_1',
        elType: 'blank',
        style: { width: 'calc(100% - 460px)' }
      },
      {
        label: '',
        prop: 'sfdg',
        style: { width: '400px' },
        elType: 'checkbox',
        elText: '用唯一条码发货时填写是否要禁掉填写功能，只能扫码',
        labelWidth: '0px'
      },
      {
        label: '',
        prop: 'blank_2',
        elType: 'blank',
        style: { width: 'calc(100% - 400px)' }
      },
      {
        label: '',
        prop: 'sfdg',
        style: { width: '430px' },
        elType: 'checkbox',
        elText: '产品库存里的成品数量隐藏（有条码功能才能使用这功能）',
        labelWidth: '0px'
      },
      {
        label: '',
        prop: 'blank_3',
        elType: 'blank',
        style: { width: 'calc(100% - 430px)' }
      },
      {
        label: '库存条码为',
        prop: 'sfdg',
        style: { width: '150px' },
        labelWidth: '86px'
      }, {
        label: '件货条',
        prop: 'sfdg',
        style: { width: '60px' },
        labelWidth: '60px',
        elType: 'blank'
      }, {
        label: '将余数细为',
        prop: 'sfdg',
        style: { width: '150px' },
        labelWidth: '86px'
      }, {
        label: '条/件，如为0表示将余数归为一长',
        prop: 'sfdg',
        style: { width: '220px' },
        labelWidth: '220px',
        elType: 'blank'
      }
    ]
  } */
]
export const MaterialSettings = [
  {
    label: '',
    prop: 'zdywlmc',
    style: { width: '300px' },
    elType: 'checkbox',
    elText: '自定义物料名',
    labelWidth: '0px'
  }, {
    label: '',
    prop: 'sfzdyggys',
    style: { width: '300px' },
    elType: 'checkbox',
    elText: '自定义物料颜色规格',
    labelWidth: '0px'
  }, {
    label: '',
    prop: 'fzshwl',
    style: { width: '300px' },
    elType: 'checkbox',
    elText: '复制上行物料信息',
    labelWidth: '0px'
  }, {
    label: '',
    prop: 'zdwl',
    style: { width: '300px' },
    elType: 'checkbox',
    elText: '自动创建物料档案',
    labelWidth: '0px'
  }/* , {
    label: '',
    prop: 'sfdg',
    style: { width: '300px' },
    elType: 'checkbox',
    elText: '物料开单超出预警值时报警',
    labelWidth: '0px'
  } */
]
export const ProductionSettings = [
  /* {
    label: '',
    prop: 'sfdg',
    style: { width: '300px' },
    elType: 'checkbox',
    elText: '裁床单是否减库存',
    labelWidth: '0px'
  }, {
    label: '',
    prop: 'sfdg',
    style: { width: '300px' },
    elType: 'checkbox',
    elText: '生产单盒数转为条数',
    labelWidth: '0px'
  } */
]
export const OutgoingSettings = [
  /* {
    label: '',
    prop: 'sfdg',
    style: { width: '300px' },
    elType: 'checkbox',
    elText: '外发来货引用单价',
    labelWidth: '0px'
  } */
]
export const FinancialSettings = [
  /* {
    label: '',
    prop: 'sfdg',
    style: { width: '300px' },
    elType: 'checkbox',
    elText: '资金往来自动引单',
    labelWidth: '0px'
  } */
]
export const PasswordSettings = [
  /* {
    label: '交货密码',
    prop: 'jhmm',
    style: { width: '300px' },
    placeholder: '请输入交货密码',
    labelWidth: '110px'
  }, {
    label: '工资密码',
    prop: 'gzmm',
    style: { width: '300px' },
    placeholder: '请输入工资密码',
    labelWidth: '110px'
  }, {
    label: '最高权限卡密码',
    prop: 'zgqxkmm',
    style: { width: '300px' },
    placeholder: '请输入最高权限卡密码',
    labelWidth: '110px'
  }, {
    label: '触摸屏密码',
    prop: 'cmpmm',
    style: { width: '300px' },
    placeholder: '请输入触摸屏密码',
    labelWidth: '110px'
  }, {
    label: '条码发货密码',
    prop: 'tmfhmm',
    style: { width: '300px' },
    placeholder: '请输入条码发货密码',
    labelWidth: '110px'
  }, {
    label: '',
    prop: 'sfdg',
    style: { width: '300px' },
    elType: 'checkbox',
    elText: '交货登记修改交货数量时启用密码验证',
    labelWidth: '0px'
  }, {
    label: '',
    prop: 'sfdg',
    style: { width: '300px' },
    elType: 'button',
    elText: '车间密码',
    labelWidth: '0px'
  } */
]

export const WageSettings = [
  /* {
    label: '工票设置',
    formItems: [
      {
        label: '',
        prop: 'sfdg',
        style: { width: '200px' },
        elType: 'checkbox',
        elText: '生成工票时将余数归为一扎',
        labelWidth: '0px'
      }, {
        label: '款式档案工序倍数设置为',
        prop: 'cmpmm',
        style: { width: '300px' },
        placeholder: '',
        labelWidth: '200px'
      }, {
        label: '',
        prop: 'blank_1',
        style: { width: 'calc(100% - 500px)' },
        elType: 'blank',
        labelWidth: '0px'
      }, {
        label: '',
        prop: 'sfdg',
        style: { width: '114px' },
        elType: 'checkbox',
        elText: '扫工票码模式',
        labelWidth: '0px'
      }, {
        label: '',
        prop: 'blank_2',
        style: { width: '116px' },
        elType: 'blank',
        labelWidth: '0px'
      }, {
        label: '',
        prop: 'sfdg',
        style: { width: '200px' },
        elType: 'checkbox',
        elText: '生成工票自动复制上行数据',
        labelWidth: '0px'
      }, {
        label: '',
        prop: 'blank_3',
        style: { width: 'calc(100% - 516px)' },
        elType: 'blank',
        labelWidth: '0px'
      },
      {
        label: '',
        prop: 'sfdg',
        style: { width: '520px' },
        elType: 'checkbox',
        elText: '扫工票时禁止自动入库（如需自动入库时需要在款式档案工序中设置入库仓库）', // （如需自动入库时需要在款式档案工序中设置入库仓库）
        labelWidth: '0px'
      }, {
        label: '',
        prop: 'blank_4',
        style: { width: 'calc(100% - 520px)' },
        elType: 'blank',
        labelWidth: '0px'
      }, {
        label: '',
        prop: 'sfdg',
        style: { width: '142px' },
        elType: 'checkbox',
        elText: '不按固定交货顺序',
        labelWidth: '0px'
      }, {
        label: '',
        prop: 'blank_5',
        style: { width: '88px' },
        elType: 'blank',
        labelWidth: '0px'
      }, {
        label: '工票扫入数量乘以',
        prop: 'cmpmm',
        style: { width: '200px' },
        placeholder: '',
        labelWidth: '130px'
      }, {
        label: '等于入库数量',
        prop: 'cmpmm',
        style: { width: '110px' },
        placeholder: '',
        labelWidth: '110px',
        elType: 'blank'
      }, {
        label: '',
        prop: 'blank_6',
        style: { width: 'calc(100% - 540px)' },
        elType: 'blank',
        labelWidth: '0px'
      }, {
        label: '',
        prop: 'sfdg',
        style: { width: '268px' },
        elType: 'checkbox',
        elText: '款式档案工价修改后款式档案跟随更新',
        labelWidth: '0px'
      }, {
        label: '',
        prop: 'sfdg',
        style: { width: '200px' },
        elType: 'checkbox',
        elText: '员工刷卡权限认工序类型',
        labelWidth: '0px'
      }
    ]
  },
  {
    label: '其他设置',
    formItems: [
      {
        label: '',
        prop: 'sfdg',
        style: { width: '130px' },
        elType: 'checkbox',
        elText: '领料权限卡交接',
        labelWidth: '0px'
      }, {
        label: '',
        prop: 'blank_1',
        style: { width: '90px' },
        elType: 'blank',
        labelWidth: '0px'
      }, {
        label: '新款号默认复制',
        prop: 'cmpmm',
        style: { width: '200px' },
        placeholder: '',
        labelWidth: '130px'
      }, {
        label: '的流程',
        prop: 'cmpmm',
        style: { width: '60px' },
        placeholder: '',
        labelWidth: '60px',
        elType: 'blank'
      }, {
        label: '',
        prop: 'blank_2',
        style: { width: 'calc(100% - 480px)' },
        elType: 'blank',
        labelWidth: '0px'
      }, {
        label: '每月伙食',
        prop: 'cmpmm',
        style: { width: '130px' },
        placeholder: '',
        labelWidth: '70px'
      }, {
        label: '每天伙食',
        prop: 'cmpmm',
        style: { width: '150px' },
        placeholder: '',
        labelWidth: '90px'
      }, {
        label: '支款上限/没人每月',
        prop: 'cmpmm',
        style: { width: '240px' },
        placeholder: '',
        labelWidth: '160px'
      }, {
        label: '',
        prop: 'blank_3',
        style: { width: 'calc(100% - 520px)' },
        elType: 'blank',
        labelWidth: '0px'
      }, {
        label: '裁床仓库以',
        prop: 'cmpmm',
        style: { width: '160px' },
        placeholder: '',
        labelWidth: '82px'
      }, {
        label: '为单位',
        prop: 'cmpmm',
        style: { width: '60px' },
        placeholder: '',
        labelWidth: '60px',
        elType: 'blank'
      }
    ]
  } */
]
