export default [
  {
    label: '供 货 商',
    prop: 'ghsmc',
    style: { width: '250px' },
    placeholder: '请输入供货商',
    elType: 'autocomplete',
    labelWidth: '80px'
  },
  {
    label: '仓库名称',
    prop: 'ckmc',
    placeholder: '请输入仓库名称',
    style: { width: '250px' },
    elType: 'autocomplete'
  },
  {
    label: '',
    prop: 'sfjck',
    style: { width: '120px' },
    labelWidth: '0px',
    elType: 'checkbox',
    elText: '不减库存'
  },
  {
    label: '',
    prop: 'blank1',
    placeholder: '',
    style: { width: 'calc(100% - 620px)' },
    labelWidth: '140px',
    elType: 'blank'
  },
  {
    label: '　备 注',
    prop: 'bz',
    placeholder: '请选择输入备注',
    style: { width: '620px' },
    elType: 'textarea',
    labelWidth: '80px'
  }, {
    label: '',
    prop: 'blank2',
    placeholder: '',
    style: { width: 'calc(100% - 620px)' },
    labelWidth: '140px',
    elType: 'blank'
  },
  {
    label: '本单金额',
    prop: 'bdje',
    placeholder: '请输入本单金额',
    style: { width: '200px' },
    labelWidth: '80px'
  }, {
    label: '',
    prop: 'jelx',
    labelWidth: '20px',
    placeholder: '',
    style: { width: '130px' },
    elType: 'autocomplete'
  }, {
    label: '',
    prop: 'qtje',
    placeholder: '',
    labelWidth: '5px',
    style: { width: '70px' }
  }, {
    label: '合计',
    prop: 'hj',
    placeholder: '',
    style: { width: '200px' },
    labelWidth: '70px'
  }, {
    label: '前单欠款',
    prop: 'qdje',
    placeholder: '请输入前单欠款',
    style: { width: '200px' },
    labelWidth: '96px'
  }, {
    label: '付款金额',
    prop: 'fkje',
    placeholder: '请输入付款金额',
    style: { width: '200px' }
  }, {
    label: '结欠金额',
    prop: 'jqje',
    placeholder: '请输入结欠金额',
    style: { width: '200px' }
  }
]
