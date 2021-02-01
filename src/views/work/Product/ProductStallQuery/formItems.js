const width = '130px'
export default [
  {
    label: '商标',
    prop: 'sb',
    style: { width },
    placeholder: '请输入商标',
    elType: 'autocomplete',
    api: 'getTrademark'
  }, {
    label: '款号',
    prop: 'kh',
    style: { width },
    placeholder: '请输入款号',
    elType: 'autocomplete',
    api: 'getFashion'
  }, {
    label: '颜色',
    prop: 'ysmc',
    style: { width },
    placeholder: '请输入颜色',
    elType: 'autocomplete',
    api: 'getColor'
  }, {
    label: '档位',
    prop: 'ckdw',
    style: { width },
    placeholder: '请输入档位',
    elType: 'autocomplete',
    api: 'getFashion'
  }, {
    label: '档位类型',
    prop: 'lx',
    style: { width },
    placeholder: '请输入档位类型',
    elType: 'autocomplete',
    api: 'getType'
  }, {
    label: '档位款式类型',
    prop: 'kslx',
    style: { width },
    placeholder: '请输入档位款式类型',
    elType: 'autocomplete',
    api: 'getFashionType'
  }
]
