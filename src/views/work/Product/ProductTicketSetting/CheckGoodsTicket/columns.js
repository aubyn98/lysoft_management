const common = [{
  label: '款号',
  prop: 'kh',
  width: 100,
  show: true
}, {
  label: '商标',
  prop: 'sb',
  width: 100,
  show: true
}, {
  label: '颜色',
  prop: 'ysmc',
  width: 100,
  show: true
}, {
  label: '款式类型',
  prop: 'kslx',
  width: 100,
  show: true
}, {
  label: '单位',
  prop: 'dw',
  width: 100,
  show: true
}, {
  label: '码数',
  prop: 'ms',
  width: 100,
  show: true
}, {
  label: '数量',
  prop: 'sl',
  sumProp: 'sl',
  width: 100,
  show: true
}]
export const top_columns = [
  ...JSON.parse(JSON.stringify(common)), {
    label: '包数',
    prop: 'bs',
    width: 100,
    show: true
  }, {
    label: '每包/件',
    prop: 'mbjs',
    width: 100,
    show: true
  }, {
    label: '引用单号',
    prop: 'yydh',
    width: 100,
    show: true
  }, {
    label: '条码',
    prop: 'tmbh',
    width: 100,
    show: true
  }, {
    label: '档位',
    prop: 'kw',
    width: 100,
    show: true
  }]
export const bottom_columns = [
  ...JSON.parse(JSON.stringify(common))
]
