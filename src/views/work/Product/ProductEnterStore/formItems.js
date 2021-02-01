import { math } from 'aubyn-common'
import { num } from '@/common/utils/pattern'
export default [
  {
    label: '供货商',
    prop: 'ghsmc',
    style: { width: '250px' },
    placeholder: '请输入供货商名称',
    labelWidth: '100px',
    elType: 'autocomplete',
    api: 'getProductEnterStoreVendor',
    relation: ['ghsbh', 'ljqk', 'templjqk->qdqk'],
    icon: true,
    rules: [{ trigger: 'focus', required: true, message: '请输入供货商名称' }]
  },
  {
    label: '仓库名称',
    prop: 'ckmc',
    placeholder: '请输入仓库名称',
    style: { width: '250px' },
    elType: 'autocomplete',
    api: 'getStore',
    icon: true
  }, {
    label: '',
    prop: 'ghsbh',
    style: { width: '0px' },
    placeholder: '',
    labelWidth: '0px',
    elType: 'blank'
  }, {
    label: '之前来款情况',
    prop: 'lkmx',
    placeholder: '请输入之前来款情况',
    labelWidth: '110px',
    style: { width: '360px' },
    readonly: true
  },
  {
    label: '',
    prop: 'blank1',
    placeholder: '',
    style: { width: 'calc(100% - 860px)' },
    elType: 'blank'
  },
  {
    label: '备     注',
    prop: 'bz',
    placeholder: '请选择输入备注',
    style: { width: '860px' },
    labelWidth: '100px',
    elType: 'textarea'
  }, {
    label: '',
    prop: 'blank2',
    placeholder: '',
    style: { width: 'calc(100% - 860px)' },
    elType: 'blank'
  }, {
    label: '本单金额',
    prop: 'kdje',
    placeholder: '请输入本单金额',
    labelWidth: '100px',
    style: { width: '250px' },
    readonly: true,
    rules: [{ trigger: 'focus', pattern: num, message: '请输入数字' }]
  }, {
    label: '前单欠款',
    prop: 'qdqk',
    placeholder: '请输入前单欠款',
    style: { width: '250px' },
    readonly: true,
    rules: [{ trigger: 'focus', pattern: num, message: '请输入数字' }]
  },
  {
    label: '付款金额',
    prop: 'skje',
    placeholder: '请输入付款金额',
    style: { width: '250px' },
    rules: [{ trigger: 'focus', pattern: num, message: '请输入数字' }]
  }, {
    label: '结欠金额',
    prop: 'ljqk',
    placeholder: '请输入结欠金额',
    style: { width: '250px' },
    readonly: true,
    computed (form) {
      const total = math.add(math.add(form.kdje || 0, form.qdqk || 0), form.qtje || 0)
      return math.subtract(total, parseFloat(form.skje || 0))
    },
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
  }
]
