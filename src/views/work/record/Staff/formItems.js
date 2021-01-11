import { num } from '@/common/utils/pattern'
const titleStyle = { width: '100%', borderBottom: 'solid 1px #ccc', backgroundColor: '#409EFF', borderRadius: '0 4px 4px 0', textAlign: 'left', color: '#fff' }
export default [
  {
    label: '',
    prop: 'blank_title1',
    labelWidth: '10px',
    style: titleStyle,
    elText: '基本信息',
    elType: 'blank'
  },
  {
    label: '员工名称',
    prop: 'ygmc',
    style: { width: '200px' },
    placeholder: '请输入员工名称',
    CamelChars: 'jm',
    rules: [{ trigger: 'focus', required: true, message: '请输入员工名称' }]
  }, {
    label: '',
    prop: 'txbh',
    style: { width: '0px' },
    placeholder: '',
    labelWidth: '0px',
    elType: 'blank'
  }, {
    label: '',
    prop: 'jm',
    style: { width: '50px' },
    placeholder: '请输入简码',
    labelWidth: '0px'
  }, {
    label: '员工工号',
    prop: 'yggh',
    style: { width: '250px' },
    placeholder: '请输入员工工号'/* ,
    rules: [{ trigger: 'focus', required: true, message: '请输入员工工号' }] */
  }, {
    label: '员工工卡',
    prop: 'qxkh',
    style: { width: '250px' },
    placeholder: '请输入员工工卡'/* ,
    rules: [{ trigger: 'focus', required: true, message: '请输入员工工卡' }] */
  }, {
    label: '',
    prop: 'blank_row1',
    labelWidth: '0px',
    style: { width: 'calc(100% - 750px)' },
    elType: 'blank'
  }, {
    label: '进厂日期',
    prop: 'jcrq',
    style: { width: '250px' },
    placeholder: '请选择进厂日期',
    elType: 'date',
    rules: [{ trigger: 'focus', required: true, message: '请选择进厂日期' }]
  }, {
    label: '部门',
    prop: 'bm',
    style: { width: '250px' },
    placeholder: '请选择部门',
    elType: 'autocomplete',
    api: 'getDepartment',
    icon: true,
    rules: [{ trigger: 'focus', required: true, message: '请选择部门' }]
  }, {
    label: '职务',
    prop: 'zw',
    style: { width: '250px' },
    placeholder: '请输入职务',
    icon: true,
    elType: 'autocomplete',
    api: 'getJob'
  }, {
    label: '',
    prop: 'blank_row2',
    labelWidth: '0px',
    style: { width: 'calc(100% - 750px)' },
    elType: 'blank'
  }, {
    label: '手　机１',
    prop: 'sj',
    style: { width: '250px' },
    placeholder: '请输入手机'
  }, {
    label: '手　机２',
    prop: 'sj2',
    style: { width: '250px' },
    placeholder: '请输入手机'
  }, {
    label: '电话',
    prop: 'dh',
    style: { width: '250px' },
    placeholder: '请输入电话'
  }, {
    label: '',
    prop: 'blank_row3',
    labelWidth: '0px',
    style: { width: 'calc(100% - 750px)' },
    elType: 'blank'
  }, {
    label: '民族',
    prop: 'mz',
    style: { width: '250px' },
    placeholder: '请输入民族'
  }, {
    label: '性别',
    prop: 'xb',
    style: { width: '250px' },
    elType: 'select',
    defaultVal: '男',
    listData: ['男', '女', '其他'],
    placeholder: '请选择性别',
    hideClearable: true
  }, {
    label: '出生日期',
    prop: 'csrq',
    style: { width: '250px' },
    placeholder: '请选择日期',
    elType: 'date'
  }, {
    label: '',
    prop: 'blank_row4',
    labelWidth: '0px',
    style: { width: 'calc(100% - 750px)' },
    elType: 'blank'
  }, {
    label: '离职日期',
    prop: 'lzrq',
    style: { width: '250px' },
    placeholder: '请选择日期',
    elType: 'date'
  }, {
    label: '是否在职',
    prop: 'sfzz',
    style: { width: '140px' },
    elType: 'select',
    listData: ['是', '否'],
    defaultVal: '是',
    hideClearable: true
  }, {
    label: '每日工时',
    prop: 'gzsc',
    labelWidth: '75px',
    style: { width: '110px' },
    rules: [{ pattren: num, trigger: 'focus', message: '请输入数字' }],
    defaultVal: '12'
  }, {
    label: '婚否',
    prop: 'hf',
    style: { width: '140px' },
    elType: 'select',
    listData: ['是', '否'],
    defaultVal: '否',
    hideClearable: true
  }, {
    label: '学历',
    prop: 'xl',
    labelWidth: '50px',
    style: { width: '110px' },
    elType: 'select',
    listData: ['小学', '初中', '中专', '高中', '大专', '本科', '硕士', '博士'],
    defaultVal: '高中',
    hideClearable: true
  }, {
    label: '',
    prop: 'blank_row5',
    labelWidth: '0px',
    style: { width: 'calc(100% - 750px)' },
    elType: 'blank'
  }, {
    label: '身份证',
    prop: 'sfz',
    style: { width: '250px' },
    placeholder: '请输入身份证'
  }, {
    label: '家庭地址',
    prop: 'jtdz',
    style: { width: '500px' },
    placeholder: '请输入家庭地址'
  }, {
    label: '',
    prop: 'blank_row6',
    labelWidth: '0px',
    style: { width: 'calc(100% - 750px)' },
    elType: 'blank'
  }, {
    label: '',
    prop: 'blank_title2',
    labelWidth: '10px',
    style: titleStyle,
    elType: 'blank',
    elText: '工资与伙食'
  }, {
    label: '伙食类型',
    prop: 'hslx',
    style: { width: '250px' },
    elType: 'select',
    defaultVal: '计月伙食',
    listData: ['计月伙食', '计天伙食'],
    placeholder: '请选择类型',
    hideClearable: true,
    rules: [{ trigger: 'focus', required: true, message: '请选择伙食类型' }]
  }, {
    label: '伙食费',
    prop: 'hsf',
    style: { width: '250px' },
    rules: [{ pattren: num, trigger: 'focus', message: '请输入数字' }],
    placeholder: '请输入伙食费'
  }, {
    label: '完成额',
    prop: 'wce',
    style: { width: '250px' },
    rules: [{ pattren: num, trigger: 'focus', message: '请输入数字' }],
    placeholder: '请输入完成额'
  }, {
    label: '',
    prop: 'blank_row7',
    labelWidth: '0px',
    style: { width: 'calc(100% - 750px)' },
    elType: 'blank'
  }, {
    label: '工资类型',
    prop: 'gzlx',
    style: { width: '250px' },
    elType: 'select',
    defaultVal: '计件工资',
    listData: ['计件工资', '计月工资'],
    placeholder: '请选择类型',
    hideClearable: true,
    rules: [{ trigger: 'focus', required: true, message: '请选择工资类型' }]
  }, {
    label: '基本工资',
    prop: 'jbgz',
    style: { width: '250px' },
    rules: [{ pattren: num, trigger: 'focus', message: '请输入数字' }],
    placeholder: '请输入基本工资'
  }, {
    label: '保底工资',
    prop: 'bdgz',
    style: { width: '250px' },
    rules: [{ pattren: num, trigger: 'focus', message: '请输入数字' }],
    placeholder: '请输入保底工资'
  }, {
    label: '',
    prop: 'blank_row8',
    labelWidth: '0px',
    style: { width: 'calc(100% - 750px)' },
    elType: 'blank'
  }, {
    label: '暂压工资',
    prop: 'zygz',
    style: { width: '250px' },
    rules: [{ pattren: num, trigger: 'focus', message: '请输入数字' }],
    placeholder: '请输入暂压工资'
  }, {
    label: '补贴',
    prop: 'bt',
    style: { width: '250px' },
    rules: [{ pattren: num, trigger: 'focus', message: '请输入数字' }],
    placeholder: '请输入补贴金额'
  }, {
    label: '补贴说明',
    prop: 'btsm',
    style: { width: '250px' },
    placeholder: '请输入补贴说明'
  }, {
    label: '',
    prop: 'blank_row9',
    labelWidth: '0px',
    style: { width: 'calc(100% - 750px)' },
    elType: 'blank'
  }, {
    label: '结薪方式',
    prop: 'jsfs',
    style: { width: '250px' },
    placeholder: '请输入结薪方式',
    defaultVal: '现金',
    icon: true,
    elType: 'autocomplete',
    api: 'getSalaryBalanceType',
    rules: [{ trigger: 'focus', required: true, message: '请选择结薪方式' }]
  }, {
    label: '银行账号',
    prop: 'yhzh',
    style: { width: '250px' },
    placeholder: '请输入银行账号'
  },
  {
    label: '备     注',
    prop: 'bz',
    placeholder: '请选择输入备注',
    style: { width: '100%' },
    elType: 'textarea'
  }
]
