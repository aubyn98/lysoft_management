import { num } from '@/common/utils/pattern'
export default [{
  label: '物料名称',
  prop: 'wlmc',
  style: { width: '50%' },
  placeholder: '请输入物料名称',
  CamelChars: ['wlbh', 'wlbm'],
  rules: [{ trigger: 'focus', required: true, message: '请输入物料名称' }]
}, {
  label: '',
  prop: 'id',
  style: { width: '0px' },
  labelWidth: '0px',
  elType: 'blank'
}, {
  label: '编　　号',
  prop: 'wlbh',
  style: { width: '50%' },
  placeholder: '请输入编号'
}, {
  label: '类　　型',
  prop: 'lx',
  style: { width: '50%' },
  placeholder: '请输入类型',
  elType: 'autocomplete',
  api: 'getMaterialType',
  icon: true
}, {
  label: '单　　位',
  prop: 'dw',
  style: { width: '50%' },
  placeholder: '请输入单位',
  elType: 'autocomplete',
  api: 'getUnit',
  icon: true
}, {
  label: '类　　别',
  prop: 'lb',
  style: { width: '50%' },
  placeholder: '请选择客户',
  elType: 'select',
  listData: ['主料', '辅料']
}, {
  label: '库存下限',
  prop: 'kcxx',
  style: { width: '50%' },
  placeholder: '请输入库存下限'
}, {
  label: '供货别名',
  prop: 'wlbm',
  style: { width: '50%' },
  placeholder: '请输入供货别名'
}, {
  label: '条码编号',
  prop: 'tmbh',
  style: { width: '50%' },
  placeholder: '请输入条码编号'
}, {
  label: '供 货 商',
  prop: 'ghsmc',
  style: { width: '50%' },
  placeholder: '请选择供货商',
  elType: 'autocomplete',
  api: 'getVendor',
  icon: true
}, {
  label: '',
  prop: 'sftywl',
  style: { width: '50%' },
  labelWidth: '0px',
  elType: 'checkbox',
  elText: '是否停用该物料'
}, {
  label: '用料部位',
  prop: 'ylbw',
  style: { width: '50%' },
  placeholder: '请选择用料部位',
  elType: 'autocomplete',
  api: 'getMaterialPosition',
  icon: true
}, {
  label: '仓库档位',
  prop: 'ckdw',
  style: { width: '50%' },
  placeholder: '请输入仓库档位'
},
{
  label: '备     注',
  prop: 'bz',
  placeholder: '请选择备注',
  style: { width: '100%' },
  elType: 'textarea'
},
{
  label: '成本价',
  prop: 'cbj',
  width: 180,
  show: true,
  style: { width: '50%' },
  placeholder: '请输入成本价',
  rules: [{ trigger: 'focus', pattern: num, message: '请输入数字' }]
},
{
  label: '批发价',
  prop: 'pfj',
  width: 180,
  show: true,
  style: { width: '50%' },
  placeholder: '请输入批发价',
  rules: [{ trigger: 'focus', pattern: num, message: '请输入数字' }]
},
{
  label: '零售价',
  prop: 'lsj',
  width: 180,
  show: true,
  style: { width: '50%' },
  placeholder: '请输入零售价',
  rules: [{ trigger: 'focus', pattern: num, message: '请输入数字' }]
},
{
  label: '外发价',
  prop: 'wfj',
  width: 180,
  show: true,
  style: { width: '50%' },
  placeholder: '请输入外发价',
  rules: [{ trigger: 'focus', pattern: num, message: '请输入数字' }]
}]
