// import { math } from 'aubyn-common'
import { num } from '@/common/utils/pattern'
export default [
  {
    label: '客户名称',
    prop: 'khmc',
    style: { width: '250px' },
    placeholder: '请输入客户名称',
    labelWidth: '100px',
    elType: 'autocomplete',
    api: 'getCustomer',
    relation: ['khbh'],
    icon: true,
    rules: [{ trigger: 'focus', required: true, message: '请输入客户名称' }]
  },
  {
    label: '订单等级',
    prop: 'dddj',
    placeholder: '请选择订单等级',
    style: { width: '250px' },
    elType: 'select',
    listData: ['正常', '急', '紧急'],
    defaultVal: '正常'
  }, {
    label: '',
    prop: 'khbh',
    style: { width: '0px' },
    placeholder: '',
    labelWidth: '0px',
    elType: 'blank'
  }, {
    label: '本单金额',
    prop: 'kdje',
    placeholder: '请输入本单金额',
    style: { width: '250px' },
    readonly: true,
    num: true,
    rules: [{ trigger: 'focus', pattern: num, message: '请输入数字' }]
  }, /* {
    label: '',
    prop: 'sfjck',
    style: { width: '130px' },
    labelWidth: '0px',
    elType: 'checkbox',
    elText: '不减库存'
  }, */
  {
    label: '',
    prop: 'blank1',
    placeholder: '',
    style: { width: 'calc(100% - 750px)' },
    elType: 'blank'
  }, {
    label: '发货地点',
    labelWidth: '100px',
    prop: 'fhdd',
    placeholder: '请选择输入发货地点',
    style: { width: '250px' }
  },

  {
    label: '发货日期',
    prop: 'fhrq',
    placeholder: '请选择日期',
    style: { width: '250px' },
    elType: 'date'
  }, {
    label: '报警日期',
    prop: 'bjrq',
    placeholder: '请选择日期',
    style: { width: '250px' },
    labelWidth: '100px',
    elType: 'date'
  }, {
    label: '',
    prop: 'blank2',
    placeholder: '',
    style: { width: 'calc(100% - 750px)' },
    elType: 'blank'
  }, {
    label: '备     注',
    prop: 'bz',
    placeholder: '请选择输入备注',
    style: { width: '860px' },
    labelWidth: '100px',
    elType: 'textarea'
  }, {
    label: '订单顺序',
    prop: 'ddsx',
    placeholder: '请输入订单顺序',
    style: { width: '150px' },
    readonly: true,
    num: true,
    rules: [{ trigger: 'focus', pattern: num, message: '请输入数字' }]
  }
]
