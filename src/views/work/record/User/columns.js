export const columnsXx = [
  {
    label: '用户名',
    prop: 'user',
    width: 158,
    show: true
  }
]
export const columnsEdit = [
  {
    label: '功能权限',
    prop: 'mc',
    width: 180,
    show: true,
    readonly: true
  }, {
    label: '浏览',
    prop: 'll',
    width: 180,
    show: true,
    elType: 'checkbox',
    computed: {
      props: ['xg'],
      handler: function (row) {
        return row.xg
      }
    }
  }, {
    label: '修改',
    prop: 'xg',
    width: 180,
    show: true,
    elType: 'checkbox'
  }
]
