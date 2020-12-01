// import moment from 'moment'
export default [
  {
    label: '物料名称',
    prop: 'wlmc',
    style: { width: '200px' },
    placeholder: '请输入物料名称',
    elType: 'autocomplete',
    api: 'getMaterial'
  },
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
    style: { width: '200px' }
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
