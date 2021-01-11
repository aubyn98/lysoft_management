import { num } from '@/common/utils/pattern'
export default [{
  label: '档　　位',
  prop: 'kw',
  style: { width: '50%' },
  placeholder: '请输入档位',
  // CamelChars: 'jm',
  rules: [{ trigger: 'focus', required: true, message: '请输入档位' }]
}, {
  label: '商　　标',
  prop: 'dwsb',
  style: { width: '50%' },
  placeholder: '请输入商标',
  sendKey: 'sb',
  elType: 'autocomplete',
  api: 'getTrademark'
}, {
  label: '款式类型',
  prop: 'dwkslx',
  style: { width: '50%' },
  placeholder: '请输入款式类型',
  sendKey: 'kslx',
  elType: 'autocomplete',
  api: 'getFashionType'
}, {
  label: '尺　　码',
  prop: 'cm',
  style: { width: '50%' },
  placeholder: '请输入尺码',
  sendKey: 'ms',
  elType: 'autocomplete',
  api: 'getSize'
}, {
  label: '类　　型',
  prop: 'dwlx',
  style: { width: '50%' },
  placeholder: '请输入类型',
  sendKey: 'lx',
  elType: 'autocomplete',
  api: 'getType'
}, {
  label: '容　　量',
  prop: 'rl',
  style: { width: '50%' },
  placeholder: '请输入容量',
  rules: [{ trigger: 'focus', pattern: num, message: '请输入数字' }]
}, {
  label: '备　　注',
  prop: 'bz',
  style: { width: '50%' },
  placeholder: '请输入备注'
}, {
  label: '类型关联',
  prop: 'sfgllx',
  style: { width: '120px' },
  elType: 'checkbox'
}, {
  label: '是否预留',
  prop: 'sfyl',
  style: { width: '120px' },
  elType: 'checkbox'
}, {
  label: '',
  prop: 'id',
  style: { width: '0px' },
  labelWidth: '0px',
  elType: 'blank'
}]
