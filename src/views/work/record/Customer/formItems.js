export default [
  {
    label: '客户名称',
    prop: 'khmc',
    style: { width: '22%' },
    placeholder: '请输入客户名称',
    CamelChars: 'jm',
    rules: [{ required: true, message: '请输入活动名称', trigger: 'blur' }]
  },
  {
    label: '简 码',
    prop: 'jm',
    style: { width: '14%' },
    placeholder: '请输入客户简码',
    labelWidth: '50px'
  },
  {
    label: '',
    prop: 'sfmc',
    style: { width: '48%' },
    placeholder: '请选择省份',
    labelWidth: '0px',
    elType: 'area',
    listData: ['天津', '武汉']
  },
  {
    label: '',
    prop: 'sftykh',
    style: { width: '12%' },
    labelWidth: '0px',
    elType: 'checkbox',
    elText: '停用'
  },
  {
    label: '客 户 类 型',
    prop: 'lx',
    style: { width: '22%' },
    placeholder: '请选择客户类型',
    elType: 'autocomplete',
    api: 'getCustomerType',
    relation: ['jglx', 'zk'],
    icon: true
  },
  {
    label: '价 格 类 型',
    prop: 'jglx',
    style: { width: '22%' },
    placeholder: '请选择价格类型',
    elType: 'select',
    listData: ['批发', '零售']
  },
  {
    label: '折 扣',
    prop: 'zk',
    style: { width: '22%' },
    placeholder: '请输入折扣',
    labelWidth: '50px'
  },
  {
    label: '客 户 等 级',
    prop: 'khdj',
    style: { width: '22%' },
    placeholder: '请选择客户等级',
    elType: 'select',
    listData: ['一等级', '二等级', '三等级']
  },
  {
    label: '',
    prop: 'bwl',
    style: { width: '10%' },
    placeholder: '请选择备忘录',
    labelWidth: '0px',
    elType: 'ndbutton',
    elText: '备忘录'
  },
  {
    label: '公 司 地 址',
    prop: 'dz',
    style: { width: '100%' },
    placeholder: '请输入公司地址'
  },
  {
    label: '手 机 １',
    prop: 'sj',
    style: { width: '33.3333%' },
    placeholder: '请输入手机号码'
  },
  {
    label: '手 机 ２',
    prop: 'sj2',
    style: { width: '33.3333%' },
    placeholder: '请输入手机号码'
  },
  {
    label: '手 机 ３',
    prop: 'sj3',
    style: { width: '33.3333%' },
    placeholder: '请输入手机号码'
  },
  {
    label: '联 系 人',
    prop: 'lxr',
    style: { width: '33.3333%' },
    placeholder: '请输入联系人'
  },
  {
    label: '电   话',
    prop: 'dh',
    style: { width: '33.3333%' },
    placeholder: '请输入电话号码'
  },
  {
    label: '邮   箱',
    prop: 'yx',
    style: { width: '33.333%' },
    placeholder: '请输入邮箱地址'
  },
  {
    label: '开 户 银 行',
    prop: 'khyh',
    style: { width: '33.333%' },
    placeholder: '请输入开户银行'
  },
  {
    label: '开 户 人',
    prop: 'khr',
    style: { width: '33.333%' },
    placeholder: '请输入开户人'
  },
  {
    label: '银 行 账 号',
    prop: 'yhzh',
    placeholder: '请输入银行账号',
    style: { width: '33.333%' }
  },
  {
    label: 'QQ 账 号',
    prop: 'QQzh',
    placeholder: '请输入QQ账号',
    style: { width: '33.333%' }
  },
  {
    label: '微 信 账 号',
    prop: 'wbzh',
    placeholder: '请输入微信账号',
    style: { width: '33.333%' }
  },
  {
    label: '累 计 欠 款',
    prop: 'ljqk',
    placeholder: '请输入累计欠款',
    style: { width: '33.333%' }
  },
  {
    label: '创 建 时 间',
    prop: 'cjsj',
    placeholder: '请选择日期',
    style: { width: '33.333%' },
    elType: 'date'
  },
  {
    label: '信 用 级 别',
    prop: 'xyjb',
    placeholder: '请选择信用级别',
    style: { width: '33.333%' },
    elType: 'autocomplete',
    api: 'getXyjb'
  },
  {
    label: '质 量 档 次',
    prop: 'zldc',
    placeholder: '请选择质量档次',
    style: { width: '33.333%' },
    elType: 'autocomplete',
    api: 'getZldc'
  },
  {
    label: '经 营 规 模',
    prop: 'jygm',
    placeholder: '请选择经营规模',
    style: { width: '33.333%' },
    elType: 'autocomplete',
    api: 'getJygm'
  },
  {
    label: '类　　　型',
    prop: 'lx2',
    placeholder: '请选择客户代号',
    style: { width: '33.333%' },
    elType: 'autocomplete',
    api: 'getCustomerType2'
  },
  {
    label: '',
    prop: 'sflskh',
    style: { width: '12%' },
    labelWidth: '10px',
    elType: 'checkbox',
    elText: '零 售 客 户'
  },
  {
    label: '',
    prop: 'blank_1',
    placeholder: '',
    style: { width: '11.333%' },
    elType: 'blank'
  },
  {
    label: '',
    prop: 'check_bj',
    style: { width: '12%' },
    labelWidth: '10px',
    elType: 'checkbox',
    elText: '预 定 周 期'
  },
  {
    label: '',
    prop: 'ksrq',
    labelWidth: '20px',
    placeholder: '请选择预定周期',
    style: { width: '25%' },
    elType: 'date'
  }, {
    label: '结 束 日 期',
    prop: 'jsrq',
    placeholder: '请选择结束日期',
    style: { width: '25%' },
    elType: 'date'
  },
  {
    label: '收款额低于',
    prop: 'skbj',
    placeholder: '请选择输入收款额',
    style: { width: '25%' }
  }, {
    label: '%报警',
    prop: 'blank_2',
    placeholder: '',
    labelWidth: '60px',
    style: { width: '10%' },
    elType: 'blank'
  },
  {
    label: '备     注',
    prop: 'bz',
    placeholder: '请选择输入备注',
    style: { width: '100%' },
    elType: 'textarea'
  }
]
