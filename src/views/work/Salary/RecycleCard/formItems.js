export default [
  /* {
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
  }, */
  {
    label: '扫入工票',
    prop: 'tmbh',
    placeholder: '请输入条码',
    style: { width: '130px' }
  }, {
    label: '床号',
    prop: 'ch',
    placeholder: '请输入床号',
    style: { width: '130px' },
    elType: 'autocomplete',
    api: 'getBedNum'
  }, {
    label: '商标',
    prop: 'sb',
    placeholder: '请输入商标',
    style: { width: '130px' },
    elType: 'autocomplete',
    api: 'getTrademark'
  }, {
    label: '',
    prop: 'hs',
    labelWidth: '0px',
    style: { width: '130px', height: '30px' },
    elType: 'checkbox',
    elText: '未做完工序回收'
  }
]
