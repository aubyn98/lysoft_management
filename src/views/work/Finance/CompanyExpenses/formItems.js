import { num } from '@/common/utils/pattern'
export const formItems = [
  {
    label: '项目名称',
    prop: 'xmmc',
    style: { width: '250px' },
    placeholder: '请输入项目名称',
    sendKey: 'jelx',
    elType: 'autocomplete',
    api: 'getAmountType',
    icon: true,
    rules: [{ trigger: 'focus', required: true, message: '请输入项目名称' }]
  },
  {
    label: '类别',
    prop: 'lb',
    placeholder: '请选择类别',
    style: { width: '250px' },
    elType: 'select',
    listData: ['收入', '支出'],
    defaultVal: '收入'
  }, {
    label: '',
    prop: 'blank1',
    placeholder: '',
    style: { width: 'calc(100% - 500px)' },
    elType: 'blank'
  }, {
    label: '银行账号',
    prop: 'yhzh',
    style: { width: '250px' },
    placeholder: '请输入银行账号',
    elType: 'autocomplete',
    api: 'getBank',
    icon: true
  }, {
    label: '金额',
    prop: 'je',
    style: { width: '250px' },
    placeholder: '请输入金额',
    type: 'number',
    defaultVal: '0',
    rules: [{ trigger: 'focus', pattern: num, message: '请输入数字' }]
  },
  {
    label: '',
    prop: 'blank2',
    placeholder: '',
    style: { width: 'calc(100% - 500px)' },
    elType: 'blank'
  },
  {
    label: '备     注',
    prop: 'bz',
    placeholder: '请选择输入备注',
    style: { width: '500px' },
    elType: 'textarea'
  }
]
export const formItemsList = [
  {
    label: '开始日期',
    prop: 'ksrq',
    style: { width: '130px' },
    placeholder: '请输入客户名称',
    elType: 'date'
  },
  {
    label: '结束日期',
    prop: 'jsrq',
    placeholder: '请输入来款账号',
    style: { width: '130px' },
    elType: 'date'
  },
  {
    label: '项目名称',
    prop: 'xmmc',
    style: { width: '130px' },
    placeholder: '请输入项目名称',
    sendKey: 'jelx',
    elType: 'autocomplete',
    api: 'getAmountType'
  },
  {
    label: '报销人',
    prop: 'bxr',
    style: { width: '130px' },
    placeholder: '请输入报销人'
  },
  {
    label: '制单人',
    prop: 'zdr',
    style: { width: '130px' },
    placeholder: '请输入制单人'
  },
  {
    label: '类别',
    prop: 'lb',
    style: { width: '130px' },
    placeholder: '请输入选择',
    elType: 'select',
    listData: ['收入', '支出']
  }
]
export const formItemsListMx = [{
  label: '开始日期',
  prop: 'ksrq',
  style: { width: '130px' },
  placeholder: '请输入客户名称',
  elType: 'date'
},
{
  label: '结束日期',
  prop: 'jsrq',
  placeholder: '请输入来款账号',
  style: { width: '130px' },
  elType: 'date'
},
{
  label: '项目名称',
  prop: 'xmmc',
  style: { width: '130px' },
  placeholder: '请输入项目名称',
  sendKey: 'jelx',
  elType: 'autocomplete',
  api: 'getAmountType'
},
{
  label: '名称',
  prop: 'mc',
  style: { width: '130px' },
  placeholder: '请输入名称',
  elType: 'autocomplete',
  api: 'getExpenditure'
}]
