export default [
  {
    label: '客户名称',
    prop: 'khmc',
    style: { width: '250px' },
    placeholder: '请输入客户名称',
    labelWidth: '100px',
    elType: 'autocomplete'
  },
  {
    label: '仓库名称',
    prop: 'ckmc',
    placeholder: '请输入仓库名称',
    style: { width: '250px' }
  }, {
    label: '',
    prop: 'sfrk',
    style: { width: '130px' },
    labelWidth: '0px',
    elType: 'checkbox',
    elText: '不入库'
  },
  {
    label: '',
    prop: 'blank1',
    placeholder: '',
    style: { width: 'calc(100% - 620px)' },
    elType: 'blank'
  },
  {
    label: '备     注',
    prop: 'bz',
    placeholder: '请选择输入备注',
    style: { width: '620px' },
    labelWidth: '100px',
    elType: 'textarea'
  }, {
    label: '',
    prop: 'blank2',
    placeholder: '',
    style: { width: 'calc(100% - 860px)' },
    elType: 'blank'
  }, {
    label: '本单金额',
    prop: 'bdje',
    placeholder: '请输入本单金额',
    labelWidth: '100px',
    style: { width: '250px' }
  }, {
    label: '前单欠款',
    prop: 'qdqk',
    placeholder: '请输入前单欠款',
    style: { width: '250px' }
  }, {
    label: '之前来款情况',
    prop: 'zqlkqk',
    placeholder: '请输入之前来款情况',
    labelWidth: '110px',
    style: { width: '360px' }
  }, {
    label: '',
    prop: 'blank3',
    placeholder: '',
    style: { width: 'calc(100% - 860px)' },
    elType: 'blank'
  },
  {
    label: '上单销售日期',
    prop: 'sdxsrq',
    placeholder: '请选择日期',
    style: { width: '250px' },
    labelWidth: '100px',
    elType: 'date'
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
    label: '收款金额',
    prop: 'skje',
    placeholder: '请输入收款金额',
    style: { width: '250px' }
  }, {
    label: '结欠金额',
    prop: 'jkje',
    placeholder: '请输入结欠金额',
    style: { width: '250px' }
  }
]
