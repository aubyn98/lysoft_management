import { num } from '@/common/utils/pattern'
export const formItems_xgzcsl = [
  {
    label: '数量',
    prop: 'sl',
    placeholder: '输入数量',
    style: { width: '250px' },
    defaultVal: '0',
    rules: [{ trigger: 'focus', required: true, message: '请输入数量' }, { trigger: 'focus', pattern: num, message: '请输入数字' }]
  },
  {
    label: '',
    prop: 'blank_1',
    placeholder: '',
    style: { width: 'calc(100% - 250px)' },
    elType: 'blank'
  },
  {
    label: '',
    prop: 'xgjhsl',
    labelWidth: '50px',
    style: { width: '150px', minHeight: '28px' },
    elType: 'checkbox',
    elText: '仅修改交货数量'
  },
  {
    label: '',
    prop: 'yjhslbd',
    style: { width: '250px', minHeight: '28px' },
    elType: 'checkbox',
    elText: '已交货的数量跟着变动'
  }
]
export const formItems_xg = [
  {
    label: '员工名称',
    prop: 'ygmc',
    style: { width: '250px' },
    placeholder: '请输入员工名称',
    elType: 'autocomplete',
    api: 'getStaff',
    relation: ['yggh'],
    rules: [{ trigger: 'focus', required: true, message: '请输入员工名称' }]
  },
  {
    label: '员工工号',
    prop: 'yggh',
    style: { width: '250px' },
    placeholder: '请输入员工工号',
    elType: 'autocomplete',
    api: 'getStaff',
    relation: ['ygmc'],
    rules: [{ trigger: 'focus', required: true, message: '请输入员工工号' }]
  },
  {
    label: '',
    prop: 'blank_1',
    placeholder: '',
    style: { width: 'calc(100% - 500px)' },
    elType: 'blank'
  },
  {
    label: '工序名称',
    prop: 'gxmc',
    style: { width: '250px' },
    placeholder: '请输入工序名称',
    elType: 'autocomplete',
    api: 'getProcess',
    rules: [{ trigger: 'focus', required: true, message: '请输入工序名称' }]
  },
  {
    label: '数量',
    prop: 'jhsl',
    placeholder: '请输入数量',
    style: { width: '250px' },
    defaultVal: '0',
    rules: [{ trigger: 'focus', required: true, message: '请输入数量' }, { trigger: 'focus', pattern: num, message: '请输入数字' }]
  },
  {
    label: '',
    prop: 'blank_2',
    placeholder: '',
    style: { width: 'calc(100% - 500px)' },
    elType: 'blank'
  },
  {
    label: '',
    labelWidth: '0px',
    prop: 'czyjsyy',
    style: { width: '50%' },
    show: true,
    elType: 'checkbox',
    excludeKeys: ['ckyjsyy'],
    elText: '将此扎工票以下工序的已交数变一样'
  },
  {
    label: '',
    labelWidth: '0px',
    prop: 'ckyjsyy',
    style: { width: '50%' },
    show: true,
    elType: 'checkbox',
    excludeKeys: ['czyjsyy'],
    elText: '将此卡以下工序的已交数变一样'
  }
]
export const formItems = [
  {
    label: '日期类型',
    prop: 'rqlx',
    style: { width: '130px' },
    placeholder: '请输入选择日期',
    elType: 'select',
    listData: ['开单日期', '交货日期'],
    defaultVal: '开单日期',
    hideClearable: true
  },
  {
    label: '开始日期',
    prop: 'ksrq',
    style: { width: '130px' },
    placeholder: '请输入选择日期',
    elType: 'date'
  },
  {
    label: '结束日期',
    prop: 'jsrq',
    placeholder: '请输入选择日期',
    style: { width: '130px' },
    elType: 'date'
  },
  {
    label: '床号',
    prop: 'ch',
    style: { width: '130px' },
    placeholder: '请输入床号',
    elType: 'autocomplete',
    api: 'getBedNum'
  },
  {
    label: '部门',
    prop: 'bm',
    style: { width: '130px' },
    placeholder: '请输入部门',
    elType: 'autocomplete',
    api: 'getDepartment'
  },
  {
    label: '客户',
    prop: 'khmc',
    style: { width: '130px' },
    placeholder: '请输入客户',
    elType: 'autocomplete',
    api: 'getCustomer'
  },
  {
    label: '款号',
    prop: 'kh',
    style: { width: '130px' },
    placeholder: '请输入款号',
    elType: 'autocomplete',
    api: 'getFashion'
  },
  {
    label: '工序名称',
    prop: 'gxmc',
    style: { width: '130px' },
    placeholder: '请输入工序名称',
    elType: 'autocomplete',
    api: 'getProcess'
  },
  {
    label: '颜色',
    prop: 'ysmc',
    style: { width: '130px' },
    placeholder: '请输入颜色',
    elType: 'autocomplete',
    api: 'getColor'
  },
  {
    label: '磁卡编号',
    prop: 'tmbh',
    style: { width: '130px' },
    placeholder: '请输入编号'
  },
  {
    label: '结单状态',
    prop: 'jdzt',
    style: { width: '130px' },
    placeholder: '请选择结单状态',
    elType: 'select',
    listData: ['全部', '已结单', '未结单'],
    defaultVal: '全部',
    hideClearable: true
  },
  {
    label: '短信状态',
    prop: 'dxzt',
    style: { width: '130px' },
    placeholder: '请选择短信状态',
    elType: 'select',
    listData: ['全部', '已发送', '未发送'],
    defaultVal: '全部',
    hideClearable: true
  },
  {
    label: '',
    prop: 'crkgx',
    style: { width: '130px', minHeight: '28px' },
    elType: 'checkbox',
    labelWidth: '0px',
    elText: '查入库工序'
  },
  {
    label: '',
    prop: 'sfxsgj',
    style: { width: '130px', minHeight: '28px' },
    elType: 'checkbox',
    labelWidth: '0px',
    elText: '是否显示工价'
  },
  {
    label: '',
    prop: 'sfxszhyc',
    style: { width: '130px', minHeight: '28px' },
    elType: 'checkbox',
    labelWidth: '0px',
    elText: '是否显示最后一床'
  }
]
