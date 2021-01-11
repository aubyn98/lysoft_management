export default [
  {
    label: '日期类型',
    prop: 'rqlx',
    style: { width: '130px' },
    placeholder: '请选择日期类型',
    elType: 'select',
    listData: ['交货', '开单', '异常'],
    defaultVal: '交货'
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
  },
  {
    label: '异常类型',
    prop: 'lx',
    style: { width: '130px' },
    placeholder: '请选择异常类型',
    elType: 'select',
    listData: ['全部', '工票作废', '修改裁床数', '修改数量/日期', '删除/更换员工', '拆解工序'],
    defaultVal: '全部'
  },
  {
    label: '床号',
    prop: 'ch',
    placeholder: '请输入床号',
    style: { width: '130px' },
    elType: 'autocomplete',
    api: 'getBedNum'
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
    label: '工序名称',
    prop: 'gxmc',
    placeholder: '请输入工序名称',
    style: { width: '130px' },
    elType: 'autocomplete',
    api: 'getProcess'
  },
  {
    label: '颜色',
    prop: 'ysmc',
    placeholder: '请输入颜色',
    style: { width: '130px' },
    elType: 'autocomplete',
    api: 'getColor'
  },
  {
    label: '磁卡编号',
    prop: 'tmbh',
    placeholder: '请输入编号',
    style: { width: '130px' }
  },
  {
    label: '改后数大于原裁数',
    prop: 'dyycs',
    placeholder: '请输入款号',
    style: { width: '130px' }
  },
  {
    label: '交货数大于改后数',
    prop: 'dyghs',
    placeholder: '请输入款号',
    style: { width: '130px' }
  }
]
