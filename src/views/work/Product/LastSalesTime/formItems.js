import { num } from '@/common/utils/pattern'
export default [
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
  }, {
    label: '商标',
    prop: 'sb',
    style: { width: '130px' },
    placeholder: '请输入商标',
    elType: 'autocomplete',
    api: 'getTrademark'
  }, {
    label: '款号',
    prop: 'kh',
    style: { width: '130px' },
    placeholder: '请输入款号',
    elType: 'autocomplete',
    api: 'getFashion'
  }, {
    label: '据上次出售时间大于',
    prop: 'sccssjdy',
    style: { width: '130px' },
    placeholder: '请输入数字',
    rules: [{ trigger: 'focus', pattern: num, message: '请输入数字' }]
  }, {
    label: '据上次出售时间小于',
    prop: 'sccssjxy',
    style: { width: '130px' },
    placeholder: '请输入数字',
    rules: [{ trigger: 'focus', pattern: num, message: '请输入数字' }]
  }
]
