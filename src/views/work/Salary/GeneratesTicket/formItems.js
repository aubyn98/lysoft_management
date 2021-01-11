import { num } from '@/common/utils/pattern'
export default [
  {
    label: '床号',
    prop: 'ch',
    style: { width: '250px' },
    labelWidth: '50px',
    placeholder: '请输入床号'
  }, {
    label: '部门',
    prop: 'bm',
    style: { width: '250px' },
    placeholder: '请输入部门',
    elType: 'autocomplete',
    api: 'getDepartment',
    icon: true,
    labelWidth: '80px',
    rules: [{ trigger: 'focus', required: true, message: '请输入部门' }]
  },
  {
    label: '',
    labelWidth: '0px',
    elType: 'blank',
    style: { width: 'calc(100% - 500px)' }
  },
  {
    label: '备     注',
    prop: 'bz',
    labelWidth: '50px',
    placeholder: '请选择输入备注',
    style: { width: '500px' }
  },
  {
    label: '',
    prop: 'sl',
    placeholder: '请选择数量',
    style: { width: '60px' },
    labelWidth: '10px',
    rules: [{ trigger: 'focus', pattern: num }],
    num: true
  }, {
    label: '条每扎',
    labelWidth: '60px',
    elType: 'blank',
    style: { width: '60px' }
  }
]
