import { num } from '@/common/utils/pattern'
export default [{
  label: '部　　门',
  prop: 'bm',
  style: { width: '50%' },
  placeholder: '请输入部门',
  rules: [{ trigger: 'focus', required: true, message: '请输入部门' }]
}, {
  label: '生产总值',
  prop: 'sczz',
  style: { width: '50%' },
  placeholder: '请输入生产总值',
  rules: [{ trigger: 'focus', pattern: num, message: '请输入数字' }]
}, {
  label: '备　　注',
  prop: 'bz',
  style: { width: '50%' },
  placeholder: '请输入备注'
}, {
  label: '',
  prop: 'id',
  style: { width: '0px' },
  labelWidth: '0px',
  elType: 'blank'
}]
