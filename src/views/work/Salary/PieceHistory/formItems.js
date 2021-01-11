export default [
  {
    label: '范围',
    prop: 'fw',
    style: { width: '130px' },
    elType: 'select',
    listData: ['结算工资', '结单工资'],
    defaultVal: '结算工资',
    hideClearable: true
  }, {
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
    relation: ['yggh'],
    style: { width: '130px' },
    placeholder: '请输入员工名称',
    elType: 'autocomplete',
    api: 'getStaff'
  }, {
    label: '员工工号',
    prop: 'yggh',
    relation: ['ygmc'],
    style: { width: '130px' },
    placeholder: '请输入员工工号',
    elType: 'autocomplete',
    api: 'getStaff'
  }, {
    label: '',
    prop: 'xsylzyg',
    style: { width: '130px', height: '28px' },
    elType: 'checkbox',
    elText: '显示已离职员工'
  }
]
