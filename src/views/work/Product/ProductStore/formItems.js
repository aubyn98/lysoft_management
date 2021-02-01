const width = '180px'
export default [
  {
    label: '仓库名称',
    prop: 'ckmc',
    style: { width },
    placeholder: '请输入仓库名称名称',
    elType: 'autocomplete',
    api: 'getStore'
  },
  {
    label: '类型',
    prop: 'lx',
    style: { width },
    placeholder: '请输入类型',
    elType: 'autocomplete',
    api: 'getType'
  },
  {
    label: '商标',
    prop: 'sb',
    style: { width },
    placeholder: '请输入商标',
    elType: 'autocomplete',
    api: 'getTrademark'
  },
  {
    label: '款号',
    prop: 'kh',
    style: { width },
    placeholder: '请输入款号',
    elType: 'autocomplete',
    api: 'getFashion'
  },
  {
    label: '款式类型',
    prop: 'kslx',
    style: { width },
    placeholder: '请输入物料名称',
    elType: 'autocomplete',
    api: 'getFashionType'
  },
  {
    label: '颜色',
    prop: 'ysmc',
    style: { width },
    placeholder: '请输入颜色',
    elType: 'autocomplete',
    api: 'getColor'
  },
  {
    label: '码数',
    prop: 'ms',
    style: { width },
    placeholder: '请输入码数',
    elType: 'autocomplete',
    api: 'getSize'
  },
  {
    label: '汇总条件',
    prop: 'hztj',
    style: { width },
    placeholder: '请输入码数',
    elType: 'select',
    multiple: true,
    defaultVal: [],
    objVal: true,
    listData: [
      { hztj: '款号', key: 'kh' },
      { hztj: '商标', key: 'sb' },
      { hztj: '颜色', key: 'ysmc' },
      { hztj: '码数', key: 'ms' },
      { hztj: '款式类型', key: 'kslx' },
      { hztj: '类型', key: 'lx' },
      { hztj: '裁床欠数', key: 'ccqs' },
      { hztj: '款式类型', key: 'kslx1' }
    ]
  },
  {
    label: '',
    prop: 'yczdykh',
    style: { width, minHeight: '28px' },
    elType: 'checkbox',
    elText: '隐藏自定义款号'
  },
  {
    label: '',
    prop: 'zctjcp',
    style: { width, minHeight: '28px' },
    elType: 'checkbox',
    elText: '找出所有特价产品'
  },
  {
    label: '',
    prop: 'yckcwldkh',
    style: { width, minHeight: '28px' },
    elType: 'checkbox',
    elText: '隐藏库存为0的款号'
  },
  {
    label: '',
    prop: 'xtkhsbhb',
    style: { width, minHeight: '28px' },
    elType: 'checkbox',
    elText: '相同款号、商标合并'
  },
  {
    label: '',
    prop: 'hxckbqfdw',
    style: { width, minHeight: '28px' },
    elType: 'checkbox',
    elText: '横向查看不区分单位'
  }
]
