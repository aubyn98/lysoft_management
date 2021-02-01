import { num } from '@/common/utils/pattern'
export const formItems = [
  {
    label: '磁卡',
    prop: 'tmbh',
    labelWidth: '50px',
    placeholder: '请输入磁卡号',
    style: { width: '160px' },
    defaultVal: ''
  }, {
    label: '床号',
    prop: 'ch',
    labelWidth: '50px',
    style: { width: '160px' },
    elType: 'select',
    api: 'getTicketBedNum',
    objVal: true,
    superKeys: ['tmbh'],
    hideClearable: true,
    listData: []
  }, {
    label: '工序名称',
    prop: 'gxmc',
    labelWidth: '80px',
    style: { width: '180px' },
    elType: 'select',
    api: 'getTicketProcess',
    objVal: true,
    superKeys: ['tmbh', 'ch'],
    hideClearable: true,
    listData: []
  }, {
    label: '',
    prop: 'blank_1',
    labelWidth: '0px',
    style: { width: '80px' },
    elType: 'button',
    elText: '清空'
  }
]
export const formItems2 = [
  {
    label: '原裁床数',
    prop: 'ysl',
    labelWidth: '80px',
    readonly: true,
    style: { width: '100%' }
  }, {
    label: '数量',
    prop: 'sl',
    labelWidth: '80px',
    placeholder: '输入数量',
    style: { width: '250px' },
    defaultVal: '0',
    rules: [{ trigger: 'focus', required: true, message: '请输入数量' }, { trigger: 'focus', pattern: num, message: '请输入数字' }]
  },
  {
    label: '',
    prop: 'blank_1',
    placeholder: '',
    style: { width: 'calc(100% - 250px)' },
    elType: 'blank'
  },
  {
    label: '',
    prop: 'xgjhsl',
    labelWidth: '50px',
    style: { width: '150px', minHeight: '28px' },
    elType: 'checkbox',
    elText: '仅修改交货数量'
  },
  {
    label: '',
    prop: 'yjhslbd',
    style: { width: '250px', minHeight: '28px' },
    elType: 'checkbox',
    elText: '已交货的数量跟着变动'
  }
]
export const formItems3 = [
  {
    label: '员工姓名',
    prop: 'ygmc',
    labelWidth: '80px',
    style: { width: '100%' }
  }, {
    label: '员工工号',
    prop: 'yggh',
    labelWidth: '80px',
    style: { width: '100%' }
  }, {
    label: '数量',
    prop: 'jhsl',
    labelWidth: '80px',
    style: { width: '100%' }
  }, /* {      label: '',
      prop: 'blank_1',
      labelWidth: '0px',
      style: { width: '200px' },
      elType: 'blank'
    }, */
  {
    label: '',
    labelWidth: '0px',
    prop: 'czyjsyy',
    style: { width: '50%' },
    show: true,
    elType: 'checkbox',
    excludeKeys: ['ckyjsyy'],
    elText: '将此扎工票以下工序的已交数变一样'
  },
  {
    label: '',
    labelWidth: '0px',
    prop: 'ckyjsyy',
    style: { width: '50%' },
    show: true,
    elType: 'checkbox',
    excludeKeys: ['czyjsyy'],
    elText: '将此卡以下工序的已交数变一样'
  }
]
export const formItems4 = [
  {
    label: '数量',
    prop: 'gxsl',
    labelWidth: '80px',
    style: { width: '100%' }
  }
]
export const formItems5 = [
  {
    label: '交货日期',
    prop: 'jhrq',
    labelWidth: '80px',
    style: { width: '100%' },
    elType: 'date'
  }
]
