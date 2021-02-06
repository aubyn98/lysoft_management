// import moment from 'moment'
export default [
  {
    label: '开始日期',
    labelWidth: '80px',
    prop: 'ksrq',
    elType: 'date',
    style: { width: '215px' }
  },
  {
    label: '结束日期',
    labelWidth: '80px',
    prop: 'jsrq',
    elType: 'date',
    style: { width: '215px' }
  }, {
    label: '流水单号',
    labelWidth: '80px',
    prop: 'lsdh',
    style: { width: '200px' }
  }, {
    label: '款号',
    prop: 'kh',
    labelWidth: '50px',
    style: { width: '200px' },
    placeholder: '请输入款号',
    elType: 'autocomplete',
    api: 'getFashion'
  }, /*  {
    label: '记录备注',
    prop: 'jlbz',
    labelWidth: '80px',
    style: { width: '200px' },
    placeholder: '请输入记录备注'
  }, */ {
    label: '',
    prop: 'blank_submit',
    style: { width: '90px' },
    labelWidth: '0px',
    elType: 'ndbutton',
    elText: '查询'
  }, {
    label: '',
    prop: 'blank_select',
    style: { width: '90px' },
    labelWidth: '0px',
    elType: 'ndbutton',
    elText: '选择完毕'
  }
]
