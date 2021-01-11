// import { num } from '@/common/utils/pattern'
export const formItems = [
  {
    label: '员工名称',
    prop: 'ygmc',
    style: { width: '130px' },
    placeholder: '请输入员工名称',
    elType: 'autocomplete',
    api: 'getStaff',
    relation: ['yggh']
  }, {
    label: '员工工号',
    prop: 'yggh',
    style: { width: '130px' },
    placeholder: '请输入员工工号',
    elType: 'autocomplete',
    api: 'getStaff',
    relation: ['ygmc']
  }
]
