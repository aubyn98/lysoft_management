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
  },
  {
    label: '商标',
    prop: 'sb',
    placeholder: '请输入商标',
    style: { width: '130px' },
    elType: 'autocomplete',
    api: 'getTrademark'
  },
  {
    label: '款号',
    prop: 'kh',
    placeholder: '请输入款号',
    style: { width: '130px' },
    elType: 'autocomplete',
    api: 'getFashion'
  },
  {
    label: '部门',
    prop: 'bm',
    placeholder: '请输入部门',
    style: { width: '130px' },
    elType: 'autocomplete',
    api: 'getDepartment'
  }
]
