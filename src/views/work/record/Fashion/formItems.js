import { num } from '@/common/utils/pattern'
const titleStyle = { width: '100%', borderBottom: 'solid 1px #ccc', backgroundColor: '#409EFF', borderRadius: '0 4px 4px 0', textAlign: 'left', color: '#fff' }
export const p_formItems = [
  {
    label: '开始日期',
    prop: 'ksrq',
    elType: 'date',
    style: { width: '220px' }
  },
  {
    label: '结束日期',
    prop: 'jsrq',
    elType: 'date',
    style: { width: '220px' }
  }
]
export const p_formItems2 = [
  {
    label: '工序名称',
    prop: 'gxmc',
    placeholder: '请输入选择工序',
    elType: 'autocomplete',
    api: 'getProcess',
    style: { width: '220px' },
    rules: [{ trigger: 'focus', required: true, message: '请输入工序名称' }]
  },
  {
    label: '工价',
    prop: 'gj',
    style: { width: '220px' },
    placeholder: '请输入工价',
    rules: [{ trigger: 'focus', required: true, message: '请输入工价' }, { trigger: 'focus', pattern: num, message: '请输入数字' }]
  },
  {
    label: '码数',
    prop: 'ms',
    placeholder: '请输入选择码数',
    elType: 'autocomplete',
    api: 'getSize',
    style: { width: '220px' }
  }
]
export const p_formItems3 = [
  {
    label: '',
    prop: 'blank1',
    elType: 'blank',
    elText: '从',
    labelWidth: '25px',
    style: { width: '40px' }
  },
  {
    label: '',
    prop: 'lsh1',
    style: { width: '70px' },
    placeholder: '流水号1',
    labelWidth: '10px',
    rules: [{ trigger: 'focus', pattern: num, message: '请输入数字' }]
  },
  {
    label: '',
    prop: 'blank2',
    elType: 'blank',
    elText: '到',
    labelWidth: '10px',
    style: { width: '30px' }
  },
  {
    label: '',
    prop: 'lsh2',
    style: { width: '70px' },
    placeholder: '流水号2',
    labelWidth: '10px',
    rules: [{ trigger: 'focus', pattern: num, message: '请输入数字' }]
  },
  {
    label: '',
    prop: 'blank3',
    elType: 'blank',
    elText: '裁床流水号',
    labelWidth: '10px',
    style: { width: '80px' }
  }
]
export default [{
  label: '　款　号',
  prop: 'kh',
  style: { width: '250px' },
  placeholder: '请输入款号名称',
  rules: [{ trigger: 'focus', required: true, message: '请输入款号名称' }]
}, {
  label: '',
  prop: 'id',
  style: { width: '0px' },
  labelWidth: '0px',
  elType: 'blank'
}, {
  label: '款号类型',
  prop: 'kslx',
  style: { width: '250px' },
  placeholder: '请选择款式类型',
  rules: [{ trigger: 'focus', required: true, message: '请选择款式类型' }],
  icon: true,
  elType: 'autocomplete',
  api: 'getFashionType'
}, {
  label: '　商　标',
  prop: 'sb',
  style: { width: '250px' },
  placeholder: '请选择商标',
  rules: [{ trigger: 'focus', required: true, message: '请选择商标' }],
  icon: true,
  elType: 'autocomplete',
  api: 'getTrademark'
}, {
  label: '库存单位',
  prop: 'dw',
  style: { width: '250px' },
  placeholder: '请选择单位',
  elType: 'autocomplete',
  api: 'getUnit',
  icon: true,
  rules: [{ trigger: 'focus', required: true, message: '请选择单位' }]
}, {
  label: '　类　型',
  prop: 'lx',
  style: { width: '250px' },
  placeholder: '请选择类型',
  icon: true,
  elType: 'autocomplete',
  api: 'getType'
}, {
  label: '仓库档位',
  prop: 'ckdw',
  style: { width: '250px' },
  placeholder: '请输入仓库档位'
}, {
  label: '布料名称',
  prop: 'bl',
  style: { width: '250px' },
  placeholder: '请输入布料名称',
  sendKey: 'wlmc',
  icon: true,
  elType: 'autocomplete',
  api: 'getMaterial'
}, {
  label: '条码编号',
  prop: 'tmbh',
  style: { width: '250px' },
  placeholder: '请输入条码编号'
}, {
  label: '库存下限',
  prop: 'kcxx',
  style: { width: '250px' },
  placeholder: '请输入库存下限',
  rules: [{ trigger: 'focus', pattern: num, message: '请输入数字' }]
}, {
  label: '设计师',
  prop: 'sjs',
  style: { width: '250px' },
  placeholder: '请选择设计师',
  sendKey: 'ygmc',
  icon: true,
  elType: 'autocomplete',
  api: 'getStaff'
}, {
  label: '　成　分',
  prop: 'cf',
  style: { width: '250px' },
  placeholder: '请选择成分',
  icon: true,
  elType: 'autocomplete',
  api: 'getMaterialConstituent'
}, {
  label: '洗水方法',
  prop: 'xsff',
  style: { width: '250px' },
  placeholder: '请选输入洗水方法'
}, {
  label: '创建时间',
  prop: 'cjrq',
  style: { width: '250px' },
  placeholder: '请选择时间',
  elType: 'date',
  readonly: true,
  defaultVal: new Date()
}, {
  label: '',
  prop: 'sftyks',
  labelWidth: '0',
  style: { width: '140px' },
  elType: 'checkbox',
  elText: '是否停用'
}, {
  label: '',
  prop: 'dmdj',
  labelWidth: '0px',
  style: { width: '110px' },
  elType: 'checkbox',
  elText: '是否多码多价'
}, {
  label: '',
  prop: 'ztk',
  labelWidth: '0px',
  style: { width: '90px' },
  elText: '主推款',
  elType: 'checkbox'
}, {
  label: '',
  prop: 'sfxj',
  labelWidth: '0px',
  style: { width: '90px' },
  elText: '是否下架',
  elType: 'checkbox'
}, {
  label: '',
  prop: 'cxk',
  labelWidth: '0px',
  style: { width: '70px' },
  elText: '促销款',
  elType: 'checkbox'
}, {
  label: '主推日期',
  prop: 'ztrq',
  style: { width: '250px' },
  placeholder: '请选择时间',
  elType: 'date',
  readonly: true
}, {
  label: '下架日期',
  prop: 'xjrq',
  style: { width: '250px' },
  placeholder: '请选择时间',
  elType: 'date',
  readonly: true
}, {
  label: '促销日期',
  prop: 'cxrq',
  style: { width: '250px' },
  placeholder: '请选择时间',
  elType: 'date',
  readonly: true
}, {
  label: '款式说明',
  prop: 'bz',
  style: { width: '250px' },
  placeholder: '请选输入款式说明',
  elType: 'textarea'
}, {
  label: '配料情况',
  prop: 'plqk',
  style: { width: '250px' },
  placeholder: '暂无配料情况',
  elType: 'textarea',
  readonly: true
}, {
  label: '',
  prop: 'gxdmdj',
  style: { width: '90px' },
  elText: '工序是否多码多价',
  elType: 'checkbox'
},
{
  label: '',
  prop: 'blank_title1',
  labelWidth: '10px',
  style: titleStyle,
  elText: '产品报价',
  elType: 'blank'
}, {
  label: '成本价',
  prop: 'cbj',
  style: { width: '250px' },
  placeholder: '请输入成本价',
  rules: [{ trigger: 'focus', pattern: num, message: '请输入数字' }]
}, {
  label: '批发价',
  prop: 'pfj',
  style: { width: '250px' },
  placeholder: '请输入批发价',
  rules: [{ trigger: 'focus', pattern: num, message: '请输入数字' }]
}, {
  label: '零售价',
  prop: 'lsj',
  style: { width: '250px' },
  placeholder: '请输入零售价',
  rules: [{ trigger: 'focus', pattern: num, message: '请输入数字' }]
}, {
  label: '加工价',
  prop: 'jgj',
  style: { width: '250px' },
  placeholder: '请输入价格',
  rules: [{ trigger: 'focus', pattern: num, message: '请输入数字' }]
}, {
  label: '半成品价',
  prop: 'bcpj',
  style: { width: '250px' },
  placeholder: '请输入价格',
  rules: [{ trigger: 'focus', pattern: num, message: '请输入数字' }]
}]
