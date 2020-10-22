# 表格

## edit-table 可编辑表格

### 属性

|     参数      |         说明         |  类型   | 默认值 | 是否必需 |
| :-----------: | :------------------: | :-----: | :----: | :------: |
|     name      |     设置表格名字     | String  |   无   |    是    |
|    columns    |      设置表格列      |  Array  |  [ ]   |    是    |
| hide-add-menu | 隐藏右键菜单添加按钮 | Boolean | false  |    -     |
| hide-del-menu | 隐藏右键菜单删除按钮 | Boolean | false  |    -     |
|   header-bg   |   显示表头黑色背景   | Boolean | false  |    -     |
|  show-search  |    显示表头搜索行    | Boolean | false  |    -     |
|   hide-num    |       隐藏序号       | Boolean | false  |    -     |
|   hide-sum    |     隐藏尾行合计     | Boolean | false  |    -     |
| hide-context  |     隐藏右键菜单     | Boolean | false  |    -     |
|   disabled    |       禁用表格       | Boolean |  true  |    -     |
|   selection   |      显示选择列      | Boolean | false  |    -     |

### 事件

|    事件名    |      说明      |     参数      |
| :----------: | :------------: | :-----------: |
|  row-click   | 单击表格某一行 |      row      |
| row-dblclick | 双击表格某一行 |      row      |
|    select    | 选择表格某一行 | selection,row |
|  select-all  |  选择表格全部  |   selection   |

### 方法

|    事件名     |                         说明                         |     参数     | 返回值 |
| :-----------: | :--------------------------------------------------: | :----------: | :----: |
|  submitTable  |                     获取表格数据                     |      -       | Array  |
| initTableData |                    初始化表格数据                    | null / Array |   -    |
|    initMsg    | 初始化表头和页码<br />当参数为 true 时，只初始化页码 |   Boolean    |   -    |
