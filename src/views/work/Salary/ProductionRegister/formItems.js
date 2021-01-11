import { math } from 'aubyn-common'
import { num } from '@/common/utils/pattern'
export const formItems = [
  {
    label: '日期类型',
    prop: 'rqlx',
    style: { width: '130px' },
    elType: 'select',
    listData: ['交货日期', '领货日期'],
    defaultVal: '交货日期'
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
  }, {
    label: '床号',
    prop: 'ch',
    style: { width: '130px' },
    placeholder: '请输入床号',
    elType: 'autocomplete',
    api: 'getBedNum'
  }, {
    label: '员工名称',
    prop: 'ygmc',
    style: { width: '130px' },
    placeholder: '请输入员工名称',
    elType: 'autocomplete',
    api: 'getStaff',
    relation: ['yggh']
  }, {
    label: '员工工号',
    prop: 'yggh',
    style: { width: '130px' },
    placeholder: '请输入员工工号',
    elType: 'autocomplete',
    api: 'getStaff',
    relation: ['ygmc']
  }, {
    label: '商标',
    prop: 'sb',
    placeholder: '请输入商标',
    style: { width: '130px' },
    elType: 'autocomplete',
    api: 'getTrademark'
  }, {
    label: '款号',
    prop: 'kh',
    placeholder: '请输入款号',
    style: { width: '130px' },
    elType: 'autocomplete',
    api: 'getFashion'
  }, {
    label: '款式类型',
    prop: 'kslx',
    placeholder: '请输入款式类型',
    style: { width: '130px' },
    elType: 'autocomplete',
    api: 'getFashionType'
  },
  {
    label: '工序名称',
    prop: 'gxmc',
    placeholder: '请输入工序名称',
    style: { width: '130px' },
    elType: 'autocomplete',
    api: 'getProcess'
  },
  {
    label: '颜色',
    prop: 'ysmc',
    placeholder: '请输入颜色',
    style: { width: '130px' },
    elType: 'autocomplete',
    api: 'getColor'
  },
  {
    label: '码数',
    prop: 'ms',
    placeholder: '请输入码数',
    style: { width: '130px' },
    elType: 'autocomplete',
    api: 'getSize'
  }
]
export const updateFormItems = [
  {
    label: '交货日期',
    prop: 'jhrq',
    style: { width: '50%' },
    placeholder: '请输入选择日期',
    elType: 'date',
    rules: [
      { trigger: 'focus', required: true, message: '请输入选择日期' }
    ]
  },
  {
    label: '员工名称',
    prop: 'ygmc',
    style: { width: '50%' },
    placeholder: '请输入员工名称',
    elType: 'autocomplete',
    api: 'getStaff',
    relation: ['yggh', 'jm->ygjm'],
    rules: [
      { trigger: 'focus', required: true, message: '请输入员工名称' }
    ]
  },
  {
    label: '员工工号',
    prop: 'yggh',
    style: { width: '50%' },
    placeholder: '请输入员工工号',
    elType: 'autocomplete',
    api: 'getStaff',
    relation: ['ygmc', 'jm->ygjm'],
    rules: [
      { trigger: 'focus', required: true, message: '请输入员工工号' }
    ]
  },
  {
    label: '工序名称',
    prop: 'gxmc',
    placeholder: '请输入工序名称',
    style: { width: '50%' },
    elType: 'autocomplete',
    api: 'getProcess',
    relation: ['jm->gxjm', 'gj->dj'],
    rules: [
      { trigger: 'focus', required: true, message: '请输入工序名称' }
    ]
  }, {
    label: '工价',
    prop: 'dj',
    placeholder: '请输入工价',
    style: { width: '50%' },
    rules: [
      { trigger: 'focus', required: true, message: '请输入工价' },
      { trigger: 'focus', pattern: num, message: '请填写数字' }
    ]
  },
  {
    label: '数量',
    prop: 'jhsl',
    placeholder: '请输入数量',
    style: { width: '50%' },
    show: true,
    rules: [
      { trigger: 'focus', required: true, message: '请输入数量' },
      { trigger: 'focus', pattern: num, message: '请填写数字' }
    ]
  }, {
    label: '',
    prop: 'je',
    labelWidth: '0px',
    style: { width: '0px' },
    elType: 'blank',
    show: true,
    computed (form) {
      return math.multiply(parseFloat(form.jhsl || 0), parseFloat(form.dj || 0))
    }
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
  }, {
    label: '密码',
    prop: 'mm',
    type: 'password',
    placeholder: '请输入密码',
    style: { width: '50%' },
    show: true,
    rules: [
      { trigger: 'focus', required: true, message: '请输入密码' }
    ]
  }
]
