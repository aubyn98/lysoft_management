import { num } from '@/common/utils/pattern'
export default [{
  label: '加工商名称',
  prop: 'jgsmc',
  style: { width: '22%' },
  placeholder: '请输入加工商名称',
  CamelChars: 'jm',
  labelWidth: '100px',
  rules: [{ trigger: 'focus', required: true, message: '请输入加工商名称' }]
}, {
  label: '',
  prop: 'jgsbh',
  style: { width: '0px' },
  placeholder: '',
  labelWidth: '0px',
  elType: 'blank'
}, {
  label: '简 码',
  prop: 'jm',
  style: { width: '14%' },
  placeholder: '请输入客户简码',
  labelWidth: '50px'
}, {
  label: '加 工 类 型',
  prop: 'lx',
  style: { width: '22%' },
  placeholder: '请选择加工类型',
  elType: 'select',
  listData: ['物料', '产品']
}, {
  label: '',
  prop: 'sftyjgs',
  style: { width: '12%' },
  labelWidth: '6px',
  elType: 'checkbox',
  elText: '停用'
},
{
  label: '公 司 地 址',
  prop: 'dz',
  style: { width: '100%' },
  labelWidth: '100px',
  placeholder: '请输入公司地址'
},
{
  label: '手 机 １',
  prop: 'sj',
  style: { width: '33.3333%' },
  labelWidth: '100px',
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
  labelWidth: '100px',
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
}, {
  label: '网   址',
  prop: 'wz',
  style: { width: '33.3333%' },
  labelWidth: '100px',
  placeholder: '请输入网址'
},
{
  label: '传   真',
  prop: 'cz',
  style: { width: '33.3333%' },
  placeholder: '请输入传真号码'
},
{
  label: '邮 政 编 码',
  prop: 'yzbm',
  style: { width: '33.333%' },
  placeholder: '请输入邮政编码'
},
{
  label: '开 户 银 行',
  prop: 'khyh',
  style: { width: '33.333%' },
  labelWidth: '100px',
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
  label: '累计应付款',
  prop: 'ljqk',
  placeholder: '请选择创建时间',
  style: { width: '33.333%' },
  num: true,
  labelWidth: '100px',
  rules: [{ trigger: 'focus', pattern: num, message: '请输入数字' }]
},
{
  label: '创 建 时 间',
  prop: 'cjsj',
  placeholder: '请选择日期',
  style: { width: '33.333%' },
  elType: 'date'
}, {
  label: '外发总欠款',
  prop: 'wjsje',
  placeholder: '请选择创建时间',
  style: { width: '33.333%' },
  num: true,
  rules: [{ trigger: 'focus', pattern: num, message: '请输入数字' }]
}, {
  label: '备     注',
  prop: 'bz',
  placeholder: '请选择输入备注',
  style: { width: '100%' },
  labelWidth: '100px',
  elType: 'textarea'
}]
