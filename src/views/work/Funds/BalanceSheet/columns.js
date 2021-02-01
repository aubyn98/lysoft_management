import { copy } from '@/common/utils/format'
export const columns = [
  /* {
    label: '项目',
    prop: 'xmmc',
    width: 300,
    show: true
  }, */
  /* {
    label: '名称',
    prop: 'mc',
    width: 200,
    show: true
  }, */
  {
    label: '金额',
    prop: 'je',
    sumProp: 'je',
    width: 200,
    show: true
  }
]
export default {
  账户余额: [
    {
      label: '名称',
      prop: 'mc',
      width: 200,
      show: true
    },
    ...copy(columns)
  ],
  应收账款: [
    {
      label: '客户',
      prop: 'mc',
      width: 200,
      show: true
    },
    ...copy(columns)
  ],
  其他应收款: [
    {
      label: '客户',
      prop: 'mc',
      width: 200,
      show: true
    },
    ...copy(columns)
  ],
  应付供货商账款: [
    {
      label: '供货商',
      prop: 'mc',
      width: 200,
      show: true
    },
    ...copy(columns)
  ],
  应付加工商账款: [
    {
      label: '加工商',
      prop: 'mc',
      width: 200,
      show: true
    },
    ...copy(columns)
  ],
  其他欠款: [
    {
      label: '借入',
      prop: 'mc',
      width: 200,
      show: true
    },
    ...copy(columns)
  ],
  工资欠款: [
    {
      label: '工资',
      prop: 'mc',
      width: 200,
      show: true
    },
    ...copy(columns)
  ],
  固定资产: [
    {
      label: '类别',
      prop: 'mc',
      width: 200,
      show: true
    },
    ...copy(columns)
  ],
  成品库存: [
    {
      label: '成品',
      prop: 'kh',
      width: 200,
      show: true
    }, {
      label: '数量',
      prop: 'sl',
      sumProp: 'sl',
      width: 200,
      show: true
    }, {
      label: '单价',
      prop: 'dj',
      width: 200,
      show: true
    },
    ...copy(columns)
  ],
  材料库存: [
    {
      label: '材料',
      prop: 'wlmc',
      width: 200,
      show: true
    }, {
      label: '数量',
      prop: 'sl',
      sumProp: 'sl',
      width: 200,
      show: true
    }, {
      label: '单价',
      prop: 'dj',
      width: 200,
      show: true
    },
    ...copy(columns)
  ],
  投资者投入: [
    {
      label: '姓名',
      prop: 'tzzmc',
      width: 200,
      show: true
    }, {
      label: '认缴金额',
      prop: 'rjje',
      sumProp: 'rjje',
      width: 200,
      show: true
    }, {
      label: '股权占比 %',
      prop: 'gqzb',
      width: 200,
      show: true
    }, {
      label: '实缴金额',
      prop: 'je',
      sumProp: 'je',
      width: 200,
      show: true
    }
  ]
}
