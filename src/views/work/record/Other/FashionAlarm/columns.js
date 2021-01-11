export const columnsPp = [
  {
    label: '款式类型',
    prop: 'kslx',
    width: 100,
    show: true,
    elType: 'autocomplete',
    api: 'getFashionType'
  },
  {
    label: '款号',
    prop: 'kh',
    width: 100,
    show: true,
    elType: 'autocomplete',
    api: 'getFashion'
  },
  {
    label: '颜色',
    prop: 'ysmc',
    width: 80,
    show: true,
    elType: 'autocomplete',
    api: 'getColor'
  },
  {
    label: '码数',
    prop: 'ms',
    width: 80,
    show: true,
    elType: 'autocomplete',
    api: 'getSize'
  },
  {
    label: '商标',
    prop: 'sb',
    width: 100,
    show: true,
    elType: 'autocomplete',
    api: 'getTrademark'
  },
  {
    label: '库存下限（数量）',
    prop: 'kcxxsl',
    width: 120,
    show: true
  },
  {
    label: '是否报警',
    prop: 'sfbj',
    width: 70,
    show: true,
    elType: 'checkbox'
  }
]
