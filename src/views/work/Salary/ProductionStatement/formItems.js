export default [
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
    label: '床号',
    prop: 'ch',
    style: { width: '130px' },
    placeholder: '请输入床号',
    elType: 'autocomplete',
    api: 'getBedNum'
  }, {
    label: '部门',
    prop: 'bm',
    style: { width: '130px' },
    placeholder: '请输入部门',
    elType: 'autocomplete',
    api: 'getDepartment'
  }, {
    label: '款号',
    prop: 'kh',
    style: { width: '130px' },
    placeholder: '请输入款号',
    elType: 'autocomplete',
    api: 'getFashion'
  }, {
    label: '显示',
    prop: 'jdzt',
    style: { width: '130px' },
    elType: 'select',
    listData: ['全部', '未完成', '已完成'],
    defaultVal: '全部'
  }
]
