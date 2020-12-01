import { math } from 'aubyn-common'
import { num } from '@/common/utils/pattern'
export default [
  {
    label: '供 货 商',
    prop: 'ghsmc',
    style: { width: '250px' },
    placeholder: '请输入供货商',
    elType: 'autocomplete',
    labelWidth: '80px',
    api: 'getVendor',
    relation: ['ghsbh'],
    icon: true,
    rules: [{ trigger: 'focus', required: true, message: '请输入供货商名称' }]
  },
  {
    label: '',
    prop: 'ghsbh',
    style: { width: '0px' },
    elType: 'blank',
    labelWidth: '0px'
  },
  {
    label: '',
    prop: 'nblsdh',
    style: { width: '0px' },
    elType: 'blank',
    labelWidth: '0px'
  },
  {
    label: '仓库名称',
    prop: 'ckmc',
    placeholder: '请输入仓库名称',
    style: { width: '250px' },
    elType: 'autocomplete',
    api: 'getStore',
    icon: true
  },
  {
    label: '',
    prop: 'brk',
    style: { width: '130px' },
    labelWidth: '0px',
    elType: 'checkbox',
    elText: '不入库'
  },
  {
    label: '',
    prop: 'blank1',
    placeholder: '',
    style: { width: 'calc(100% - 630px)' },
    labelWidth: '140px',
    elType: 'blank'
  },
  {
    label: '　备 注',
    prop: 'bz',
    placeholder: '请选择输入备注',
    style: { width: '500px' },
    elType: 'textarea',
    labelWidth: '80px'
  },
  {
    label: '之前来款情况',
    prop: 'lkmx',
    placeholder: '请输入来款情况',
    style: { width: '250px' },
    labelWidth: '120px',
    readonly: true
  }, {
    label: '',
    prop: 'blank2',
    placeholder: '',
    style: { width: 'calc(100% - 760px)' },
    labelWidth: '140px',
    elType: 'blank'
  },
  {
    label: '本单金额',
    prop: 'kdje',
    placeholder: '请输入本单金额',
    style: { width: '200px' },
    labelWidth: '80px',
    readonly: true,
    rules: [{ trigger: 'focus', pattern: num, message: '请输入数字' }]
  }, {
    label: '',
    prop: 'jelx',
    labelWidth: '20px',
    placeholder: '',
    style: { width: '130px' },
    elType: 'autocomplete',
    defaultVal: '其他金额',
    api: 'getAmountType',
    icon: true
  }, {
    label: '',
    prop: 'qtje',
    placeholder: '',
    labelWidth: '5px',
    style: { width: '70px' },
    rules: [{ trigger: 'focus', pattern: num, message: '请输入数字' }]
  }, {
    label: '合计',
    prop: 'hj',
    placeholder: '',
    style: { width: '200px' },
    labelWidth: '70px',
    readonly: true,
    computed (form) {
      return math.add(parseFloat(form.kdje || 0), parseFloat(form.qtje || 0))
    }
  }, {
    label: '前单欠款',
    prop: 'qdqk',
    placeholder: '请输入前单欠款',
    style: { width: '200px' },
    labelWidth: '96px',
    readonly: true,
    rules: [{ trigger: 'focus', pattern: num, message: '请输入数字' }]
  }, {
    label: '付款金额',
    prop: 'skje',
    placeholder: '请输入付款金额',
    style: { width: '200px' },
    rules: [{ trigger: 'focus', pattern: num, message: '请输入数字' }]
  }, {
    label: '结欠金额',
    prop: 'ljqk',
    placeholder: '请输入结欠金额',
    style: { width: '200px' },
    readonly: true,
    computed (form) {
      return math.add(math.subtract(math.add(parseFloat(form.kdje || 0), parseFloat(form.qtje || 0)), parseFloat(form.skje || 0)), parseFloat(form.ljqk1 || 0))
    },
    rules: [{ trigger: 'focus', pattern: num, message: '请输入数字' }]
  }, {
    label: '',
    prop: 'ljqk1',
    placeholder: '',
    style: { width: '0' },
    elType: 'blank'
  }
]
