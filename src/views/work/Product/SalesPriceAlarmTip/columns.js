export const columnsPp = [
  {
    label: '商标',
    prop: 'sb',
    width: 100,
    show: true,
    elType: 'autocomplete',
    api: 'getTrademark'
  },
  {
    label: '款式类型',
    prop: 'kslx',
    width: 100,
    show: true,
    elType: 'autocomplete',
    api: 'getFashionType'
  }, {
    label: '类型',
    prop: 'lx',
    width: 100,
    show: true,
    elType: 'autocomplete',
    api: 'getType'
  }, {
    label: '大于百分比%',
    prop: 'dybfb',
    width: 100,
    show: true
  }, {
    label: '小于百分比%',
    prop: 'xybfb',
    width: 100,
    show: true
  }, {
    label: '大于数值',
    prop: 'dysz',
    width: 100,
    show: true
  }, {
    label: '小于数值',
    prop: 'xysz',
    width: 100,
    show: true
  }, {
    label: '是否报警',
    prop: 'sfbj',
    width: 100,
    show: true,
    elType: 'checkbox',
    align: 'center'
  }
]
