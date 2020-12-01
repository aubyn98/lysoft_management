import { num } from '@/common/utils/pattern'
export default [
  {
    label: '供 货 商',
    prop: 'ghsmc',
    style: { width: '250px' },
    placeholder: '请输入供货商',
    elType: 'autocomplete',
    api: 'getVendor',
    relation: ['ghsbh'],
    icon: true,
    rules: [{ trigger: 'focus', required: true, message: '请输入供货商名称' }]
  }, {
    label: '',
    prop: 'ghsbh',
    style: { width: '0px' },
    placeholder: '',
    labelWidth: '0px',
    elType: 'blank'
  },
  /* {
    label: '仓库名称',
    prop: 'ckmc',
    placeholder: '仓库名称',
    style: { width: '250px' }
  }, */
  {
    label: '',
    prop: 'blank1',
    placeholder: '',
    style: { width: 'calc(100% - 250px)' },
    elType: 'blank'
  },
  {
    label: '收货日期',
    prop: 'shrq',
    placeholder: '请选择日期',
    style: { width: '250px' },
    elType: 'date'
  }, {
    label: '报警日期',
    prop: 'bjrq',
    placeholder: '请选择日期',
    style: { width: '250px' },
    elType: 'date'
  }, {
    label: '开单金额',
    prop: 'kdje',
    placeholder: '请输入开单金额',
    style: { width: '250px' },
    readonly: true,
    num: true,
    rules: [{ trigger: 'focus', pattern: num, message: '请输入数字' }]
  }, {
    label: '',
    prop: 'blank2',
    placeholder: '',
    style: { width: 'calc(100% - 750px)' },
    elType: 'blank'
  },
  {
    label: '备     注',
    prop: 'bz',
    placeholder: '请选择输入备注',
    style: { width: '750px' },
    elType: 'textarea'
  }
]
