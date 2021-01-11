import { num } from '@/common/utils/pattern'
export const formItems = [
  {
    label: '工序名称',
    prop: 'gxmc',
    style: { width: '50%' },
    placeholder: '请输入工序名称',
    CamelChars: 'jm',
    rules: [{ trigger: 'focus', required: true, message: '请输入工序名称' }]
  }, {
    label: '简码',
    prop: 'jm',
    labelWidth: '50px',
    style: { width: '25%' },
    placeholder: '请输入客户简码'
  }, {
    label: '工价',
    prop: 'gj',
    style: { width: '25%' },
    placeholder: '请输入工价',
    labelWidth: '50px',
    rules: [{ trigger: 'focus', pattern: num, message: '请输入数字' }]
  }, {
    label: '工序类型',
    prop: 'gxlx',
    style: { width: '50%' },
    placeholder: '请输入工序类型'
  }, {
    label: '类型',
    prop: 'lx',
    labelWidth: '50px',
    style: { width: '50%' },
    placeholder: '请输入类型',
    sendKey: 'zw',
    elType: 'autocomplete',
    api: 'getJob'
  }, {
    label: '更新产量登记录入款号工价',
    prop: 'bz',
    style: { width: '100%' },
    elType: 'textarea',
    labelWidth: '200px',
    placeholder: '请输入更新产量登记录入款号工价'
  }, {
    label: '',
    prop: 'xh',
    style: { width: '0px' },
    labelWidth: '0px',
    elType: 'blank'
  }, {
    label: '',
    prop: 'id',
    style: { width: '0px' },
    labelWidth: '0px',
    elType: 'blank'
  }]
