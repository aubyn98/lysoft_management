export default [
  {
    label: '客户名称',
    prop: 'khmc',
    style: { width: '250px' },
    placeholder: '请输入客户名称',
    elType: 'autocomplete'
  },
  {
    label: '来款账号',
    prop: 'lkzh',
    placeholder: '请输入来款账号',
    style: { width: '250px' }
  }, {
    label: '',
    prop: 'blank1',
    placeholder: '',
    style: { width: 'calc(100% - 500px)' },
    elType: 'blank'
  }, {
    label: '收款账号',
    prop: 'skzh',
    style: { width: '250px' },
    placeholder: '请输入收款账号',
    elType: 'autocomplete'
  }, {
    label: '收款金额',
    prop: 'skje',
    style: { width: '250px' },
    placeholder: '请输入收款金额'
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
  },
  {
    label: '',
    prop: 'blank2',
    placeholder: '',
    style: { width: 'calc(100% - 700px)' },
    elType: 'blank'
  },
  {
    label: '备     注',
    prop: 'bz',
    placeholder: '请选择输入备注',
    style: { width: '700px' },
    elType: 'textarea'
  }
]
