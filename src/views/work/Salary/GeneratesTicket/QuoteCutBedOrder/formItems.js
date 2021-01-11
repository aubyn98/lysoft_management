// import moment from 'moment'
export default [

  {
    label: '开始日期',
    prop: 'ksrq',
    elType: 'date',
    style: { width: '215px' }
  },
  {
    label: '结束日期',
    prop: 'jsrq',
    elType: 'date',
    style: { width: '215px' }
  }, {
    label: '流水单号',
    prop: 'lsdh',
    style: { width: '160px' },
    placeholder: '请输入流水单号'
  }, {
    label: '款号',
    prop: 'kh',
    labelWidth: '60px',
    style: { width: '160px' },
    placeholder: '请输入款号',
    elType: 'autocomplete',
    api: 'getFashion'
  }, {
    label: '记录备注',
    prop: 'bz',
    style: { width: '200px' },
    placeholder: '请输入关键字'
  }, {
    label: '床号',
    prop: 'ch',
    labelWidth: '60px',
    style: { width: '200px' },
    placeholder: '请输入床号',
    elType: 'autocomplete',
    api: 'getBedNum'
  }, {
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
