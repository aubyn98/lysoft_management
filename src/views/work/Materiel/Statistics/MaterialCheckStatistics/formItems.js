export default [
  {
    label: '开始日期',
    prop: 'ksrq',
    style: { width: '130px' },
    elType: 'date'
  },
  {
    label: '结束日期',
    prop: 'jsrq',
    placeholder: '请输入来款账号',
    style: { width: '130px' },
    elType: 'date'
  }, {
    label: '仓库名称',
    prop: 'ckmc',
    style: { width: '130px' },
    placeholder: '请输入仓库名称',
    elType: 'autocomplete'
  }, {
    label: '盘点类型',
    prop: 'pdlx',
    style: { width: '130px' },
    placeholder: '请选择盘点类型',
    elType: 'select',
    listData: ['盘盈', '盘亏', '入库', '退货', '初始化']
  }, {
    label: '物料编号',
    prop: 'wlbh',
    style: { width: '130px' },
    placeholder: '请输入物料编号',
    elType: 'autocomplete',
    api: 'getMateriel'
  }, {
    label: '物料名称',
    prop: 'wlmc',
    style: { width: '130px' },
    placeholder: '请输入物料名称',
    elType: 'autocomplete',
    api: 'getMateriel'
  }, {
    label: '规格',
    prop: 'gg',
    style: { width: '130px' },
    placeholder: '请输入规格',
    elType: 'autocomplete',
    api: 'getMaterielSpec'
  }, {
    label: '颜色',
    prop: 'ysmc',
    style: { width: '130px' },
    placeholder: '请输入颜色',
    elType: 'autocomplete',
    api: 'getMaterielColor'
  }, {
    label: '类型',
    prop: 'lx',
    style: { width: '130px' },
    placeholder: '请输入类型',
    elType: 'autocomplete',
    api: 'getMaterielType'
  }
]
