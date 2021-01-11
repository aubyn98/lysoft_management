// import { num } from '@/common/utils/pattern'
export const formItems = [
  {
    label: '开始日期',
    prop: 'ksrq',
    style: { width: '130px' },
    placeholder: '请选择日期',
    elType: 'date'
  },
  {
    label: '结束日期',
    prop: 'jsrq',
    placeholder: '请选择日期',
    style: { width: '130px' },
    elType: 'date'
  }, {
    label: '员工名称',
    prop: 'ygmc',
    style: { width: '130px' },
    placeholder: '请输入员工名称',
    elType: 'autocomplete',
    api: 'getStaff',
    relation: ['yggh']
  }, {
    label: '员工工号',
    prop: 'yggh',
    style: { width: '130px' },
    placeholder: '请输入员工工号',
    elType: 'autocomplete',
    api: 'getStaff',
    relation: ['ygmc']
  },
  {
    label: '产量类型',
    prop: 'cllx',
    style: { width: '130px' },
    placeholder: '请选择产量类型',
    elType: 'select',
    listData: ['全部', '工票扫描', '产量登记', '产量汇合'/* , '吊挂数量' */],
    defaultVal: '全部'
  }, {
    label: '款号',
    prop: 'kh',
    placeholder: '输入款号',
    style: { width: '130px' },
    elType: 'autocomplete',
    api: 'getFashion'
  }, {
    label: '工序名称',
    prop: 'gxmc',
    placeholder: '输入工序名称',
    style: { width: '130px' },
    elType: 'autocomplete',
    api: 'getProcess'
  }, {
    label: '',
    prop: 'ycjs',
    labelWidth: '0px',
    style: { width: '130px', height: '28px' },
    elType: 'checkbox',
    elText: '隐藏已结算'
  }/* , {
    label: '结算状态',
    prop: 'jszt',
    style: { width: '130px' },
    placeholder: '请选择结算状态',
    elType: 'select',
    listData: ['未结算', '结算'],
    defaultVal: '未结算'
  } */
]
