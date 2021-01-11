<template>
<div class="page">
    <header-btn
        border
        @change="editChange"
        :activeIndex="activeIndex"
        :defaultTab.sync="tabIndex"
        :hide-change="currentRow && currentRow.jd"
        :hide-edit="!$permission([{ mc: '生成工票', xg: true }])"
        :tabs="['添加列表', '查询列表']">
        <el-button type="info" v-if="$permission([{ mc: '生成工票_结单', xg: true }])" size="mini" :disabled="!disabled" @click="handleStatement">{{ currentRow && currentRow.jd ? "反结单" : "结单" }}</el-button>
        <el-button type="info" v-if="$permission([{ mc: '生成工票_结单', xg: true }])" size="mini" :disabled="!disabled" @click="handleExamine">{{ currentRow && currentRow.sh ? "反审核" : "审核" }}</el-button>
        <el-button type="info" size="mini" :disabled="disabled" @click="quoteDh" v-if="$permission([{ mc: '生成工票', xg: true }])">引用单号</el-button>
        <el-button type="primary" size="mini" @click="exportExcel">导出</el-button>
        <exportExcel ref="exportExcel" :msg="excelData" :format="excelFormat" style="display: none" />
    </header-btn>
    <div class="billTitle" v-show="tabIndex === '添加列表'">
        <div class="billTitle-left">
            <auto-form ref="autoForm" :disabled="disabled" style="width: 100%" :formItems="formItems" @icon-click="fromIconClick" />
        </div>
        <div class="billTitle-right" style="left: 800px">
            <div class="billTitle-right-table" style="width: 540px">
                <edit-table
                    hide-num
                    hide-sums
                    hide-context
                    header-bg
                    ref="editTable2"
                    name="GeneratesTicketTitle"
                    :columns.sync="columnsTitle"
                    :disabled="disabled" />
            </div>
        </div>
    </div>
    <div style="flex: 1;height:0;" v-show="tabIndex === '添加列表'">
        <edit-table
            ref="editTable"
            name="GeneratesTicket1"
            :columns.sync="columnsLeft"
            :disabled="disabled"
            :includeKeys="['kslx','msList']"
            @data-change="dataChange"
            @input="rowInput"
            @autocomplete-select="editAutocompleteSelect"
            @row-click="editRowClick"
            v-show="!disabled" /> <!-- @row-click="editRowClick" -->
        <search-table
            hide-num
            hide-context
            hide-search
            header-bg
            ref="editTable_2"
            name="GeneratesTicket1_S"
            :columns.sync="columnsLeft"
            @row-click="editRowClick"
            v-show="disabled" />
    </div>
    <div class="GeneratesTicketMid" v-show="tabIndex === '添加列表'">
        <div class="GeneratesTicketMidForm">
            <el-checkbox :disabled="disabled" style="margin-right: 0" v-model="attachParams.flag"></el-checkbox><span class="GeneratesTicketMidSpan">余数 ></span>
            <el-input :disabled="disabled" size="mini" style="width: 50px" v-model="attachParams.ys"></el-input><span class="GeneratesTicketMidSpan">时归为一扎</span>
            <el-checkbox></el-checkbox><span class="GeneratesTicketMidSpan">保存时重新计算</span>
        </div>
        <div class="GeneratesTicketMidBtn">
            <el-button size="mini" type="primary" :disabled="disabled">裁床比例</el-button>
            <el-button size="mini" type="primary" :disabled="disabled">生成工票</el-button>
            <el-button size="mini" type="primary" :disabled="!disabled" @click="managementProcess">管理工序</el-button>
            <el-button size="mini" type="primary" :disabled="!disabled" @click="showDialog('xgczsl')">修改此扎数量</el-button>
            <el-button size="mini" type="primary" :disabled="!disabled" @click="invalidHandle('cz')">此扎作废</el-button>
            <el-button size="mini" type="primary" :disabled="!disabled" @click="invalidHandle('cgx')">此工序作废</el-button>
            <el-button size="mini" type="primary" :disabled="!disabled" @click="invalidHandle('cdgx')">此道工序作废</el-button>
            <el-button size="mini" type="primary" :disabled="!disabled" @click="disassemble">拆解工序</el-button>
            <el-button size="mini" type="primary" :disabled="!disabled" @click="cancelDisassemble">取消拆解</el-button>
            <el-button size="mini" type="primary" :disabled="!disabled" @click="showDialog('xggxsl')">修改工序数量</el-button>
            <el-button size="mini" type="primary" @click="setPageSize">下方每页数量</el-button>
        </div>
    </div>
    <div style="flex: 1; height: 250px" v-show="tabIndex === '添加列表'">
        <search-table
            spanMethod
            ref="searchTable"
            name="GeneratesTicket2"
            v-show="tabIndex === '添加列表'"
            :sourceData="ticketData"
            :sourceCount="ticketCount"
            :sourcePageSize="pageSize"
            :columns.sync="columnsRight"
            :merge-columns="mergeColumns"
            @send-change="sendChange"
            @row-click="ticketClick" />
    </div>
    <div class="billList" v-show="tabIndex === '查询列表'">
        <search-table
            hide-sums
            ref="List"
            name="GeneratesTicketList"
            :columns.sync="columnsList"
            @row-click="rowClickXx"
            @row-dblclick="rowDblclick"
            api="getGeneratesTicket"></search-table>
    </div>
    <div v-for="item in subRecords" :key="item.prop">
        <component
            append-to-body
            :sub="item.prop === 'ghsmc' ? ['ghsmc', 'ghsbh'] : []"
            :is="item.component"
            :visible.sync="item.visible"
            @row-dblclick="
          (...argv) => {
            subDblclick(item.prop, ...argv);
          }
        "
            @selectEnd="
          (...argv) => {
            subSelectEnd(item.prop, ...argv);
          }
        " />
    </div>
    <el-dialog v-for="d in dialogs" :key="d.prop" :visible.sync="d.visible" :title="d.title" :close-on-click-modal="false">
        <auto-form v-if="d.visible" :ref="'autoForm_' + d.prop" style="width: 100%" :formItems="d.formItems" :tab="false" />
        <template #footer>
            <div>
                <el-button @click="d.visible = false">取 消</el-button>
                <el-button type="primary" @click="dialogConfirm(d)">确 定</el-button>
            </div>
        </template>
    </el-dialog>
    <el-dialog :visible.sync="visibles.cj" title="拆解工序" class="SetTicketCjgx">
        <div style="text-align: left" class="Ticketcjgx" v-if="ticketCurrentRow">
            <el-tag>床号：{{ticketCurrentRow.ch}}</el-tag>
            <el-tag>款号：{{ticketCurrentRow.kh}}</el-tag>
            <el-tag>工序：{{ticketCurrentRow.gxmc}}</el-tag>
            <el-tag>颜色：{{ticketCurrentRow.ysmc}}</el-tag>
        </div>
        <div style="height: 300px">
            <edit-table :columns.sync="columnsCj" name="SetTicketCjgx" :disabled="false" ref="editTable_cj" v-if="visibles.cj"></edit-table>
        </div>
        <template #footer>
            <div>
                <el-button @click="visibles.cj = false">取 消</el-button>
                <el-button type="primary" @click="disassembleConfirm">确认拆解</el-button>
            </div>
        </template>
    </el-dialog>
    <ProcessManagement :visible.sync="visibles.glgx" :params="params" title="管理工序" name="SetTicketGx" :columns.sync="columnsGx" />
    <QuoteCutBedOrder :visible.sync="visibles.yyccd" @select-end="quoteSelectEnd" :params="quoteParams" />
</div>
</template>

<script type="text/javascript">
import { bill, formIconClick, excel } from '@/common/mixins'
import { columnsLeft, columnsRight, columnsTitle, columnsList } from './columns'
import { columnsGx, columnsCj } from '../SetTicket/columns'
import { formItems2 } from '../SetTicket/formItems'
import formItems from './formItems'
import { num } from '@/common/utils/pattern'
import { compose } from '@/common/utils/format'
function isNull (cb, prop) {
  if (!this.ticketCurrentRow) return this.$alert('请先选择磁卡！')
  if ((prop === 'xgjhrq' || prop === 'jhsl' || prop === 'czjhxx') && !this.ticketCurrentRow.yggh && !this.ticketCurrentRow.ygmc) return this.$alert('未交货！')
  cb()
}
function authentication (cb) {
  this.$authentication()
    .then(() => {
      cb()
    })
    .catch((e) => {})
}
export default {
  mixins: [bill, formIconClick, excel],
  data () {
    return {
      formItems,
      columnsLeft,
      columnsRight,
      columnsTitle,
      columnsList,
      columnsGx,
      columnsCj,
      api: {
        add: 'addGeneratesTicket',
        update: 'updateGeneratesTicket',
        getByDh: 'getGeneratesTicketByDh',
        del: 'delGeneratesTicket',
        statement: 'statementGeneratesTicket',
        examine: 'examineGeneratesTicket'
      },
      excelApi: 'getGeneratesTicket',
      subRecords: [
        {
          prop: 'bm',
          visible: false,
          component: 'Department'
        }
      ],
      visibles: {
        glgx: false,
        cj: false,
        yyccd: false
      },
      editCurrentRow: null,
      ticketCurrentRow: null,
      ticketData: [],
      groupKey: ['kh', 'zh', 'ysmc', 'tmbh'],
      mergeColumns: ['kh', 'zh', 'ysmc', 'tmbh'],
      pageSize: 60,
      ticketCount: 0,
      attachParams: {
        ys: '',
        flag: false
      },
      invalidTextDict: {
        cz: '此扎',
        cgx: '此工序',
        cdgx: '此道工序'
      },
      dialogs: [
        {
          title: '修改此扎数量',
          prop: 'xgczsl',
          formItems: formItems2,
          visible: false
        }
      ],
      quoteParams: {}
    }
  },
  created () {
    this.excelFormat = this.c2eFormat(this.columnsList)
  },
  computed: {
    params () {
      if (this.currentRow && (this.editCurrentRow || this.ticketCurrentRow)) {
        const { tableData, ...res } = this.currentRow
        const { ch, kh, tmbh } = { ...res, ...this.editCurrentRow, ...this.ticketCurrentRow }
        return { ch, kh, tmbh }
      }
      return {}
    },
    dynamic () {
      return this.columnsLeft.filter(c => c.dynamic)
    }
  },
  methods: {
    quoteDh () {
      this.quoteParams.ids = this.$refs.editTable
        .submitTable()
        .filter((it) => it.yyid)
        .map((it) => it.yyid)
        .join(',')
      this.visibles.yyccd = true
    },
    quoteSelectEnd (selection, keys) {
      if (selection.length) {
        let index = 1
        const ms = Object.keys(selection[0]).reduce((t, k) => {
          if ([...keys, 'xz', 'id', 'hj', 'dh', 'xh', 'yydh', 'index'].indexOf(k) === -1) {
            t.push({ ms: k, key: 'xj' + index++ })
          }
          return t
        }, [])
        this.msHandle(ms)
        this.$refs.editTable.pushRow(
          selection.map((s) => {
            const it = { ...s }
            ms.forEach(m => {
              it[m.key] = it[m.ms]
              delete it[m.ms]
            })
            return it
          }),
          'unshift'
        )
      }
    },
    // 码数列名切换
    msHandle (ms) {
      ms = ms.map(m => ({ ms: m.ms }))
      const dynamic = [...this.dynamic]
      ms.some(m => {
        const c = dynamic.shift()
        if (!c) return true
        c.label = m.ms
      })
      return ms
    },
    // 添加或修改成功后触发
    submitEnd (a) {
      this.getDataByDh(true, a.dh)
    },
    // 可编辑表格 下拉选择
    editAutocompleteSelect (v, { prop }, r) {
      if (prop === 'kh') {
        r.msList = this.msHandle(v.ms)
      }
    },
    // 拆解工序
    disassemble: compose(function () {
      // eslint-disable-next-line eqeqeq
      if (this.ticketCurrentRow.cj == 1) return this.$alert('已拆解！')
      if (this.ticketCurrentRow.gxsl - (this.ticketCurrentRow.jhsl || 0) < 0) return this.$alert('交货数量达到上限，无法拆解！')
      this.visibles.cj = true
    }, isNull),
    // 取消拆解
    cancelDisassemble: compose(function () {
      this.$api.update_qxcj_SetTicket({ ...this.ticketCurrentRow }).then(res => {
        this.getGeneratesTicketByXh()
      })
    }, isNull),
    // 拆解确认
    disassembleConfirm () {
      const tableData = this.$refs.editTable_cj.submitTable()
      const zsl = tableData.reduce((t, r) => {
        return this.$math.add(t || 0, r.sl || 0)
      }, 0)
      const step = this.ticketCurrentRow.gxsl - (this.ticketCurrentRow.jhsl || 0)
      if (zsl > step) return this.$alert(`数量不能超过${step}!`)
      this.$api.update_cj_SetTicket({ ...this.ticketCurrentRow, tableData }).then(res => {
        this.getGeneratesTicketByXh()
        this.visibles.cj = false
      })
    },
    // 作废方法
    invalidHandle: compose(function (state) {
      this.$api[`invalid_${state}_SetTicket`]({
        ...this.ticketCurrentRow,
        bz: `${this.invalidTextDict[state]}作废`
      }).then((res) => {
        this.getGeneratesTicketByXh()
      })
    }, authentication, isNull),
    // 修改数量
    showDialog: compose(function (state) {
      if (state === 'xggxsl') {
        this.$prompt('', '请输入数量', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: num,
          inputValue: this.ticketCurrentRow.gxsl,
          inputErrorMessage: '请输入数字',
          closeOnClickModal: false
        }).then(({ value }) => {
          this.$api.update_gxsl_SetTicket({ ...this.ticketCurrentRow, gxsl: value }).then(res => {
            this.getGeneratesTicketByXh()
          })
        }).catch(e => {
        })
        return
      }
      this.dialogs.some((d) => {
        return (d.visible = d.prop === state)
      })
      this.$nextTick(() => {
        const data = { ...this.ticketCurrentRow }
        if (state === 'xgczsl') {
          data.ysl = data.sl
          data.yjhslbd = true
        }
        this.$refs['autoForm_' + state][0].initForm(data)
      })
    }, authentication, isNull),
    // 弹窗确认
    dialogConfirm (d) {
      this.$refs['autoForm_' + d.prop][0].submitForm().then(res => {
        this.$api[`update_${d.prop.substring(2)}_SetTicket`]({ ...this.ticketCurrentRow, ...res }).then(res => {
          this.getGeneratesTicketByXh()
          d.visible = false
        })
      })
    },
    // 管理工序
    managementProcess () {
      if (!this.currentRow) return this.$alert('暂无数据!')
      if (!this.editCurrentRow) return this.$alert('请先选择对应的款号!')
      this.visibles.glgx = true
    },
    // 点击工票
    ticketClick (row) {
      this.ticketCurrentRow = row
    },
    // 点击可编辑表格行
    editRowClick (row) {
      this.editCurrentRow = row
      this.$refs.editTable.setCurrentRow(row.index)
      this.$refs.editTable_2.setCurrentRow(row.index)
      row.msList && this.msHandle(row.msList)
      this.getGeneratesTicketByXh()
    },
    // 根据单号查询数据
    getDataByDh (flag = true, dh = null) {
      this.$api[this.api.getByDh]({ dh: dh || this.currentRow.dh }).then(({ res }) => {
        res = res instanceof Array ? res[0] : res
        const { tableData, ...msg } = res
        flag && (this.tabIndex = '添加列表')
        this.currentRow = this.$format.copy(res)
        this.initData(msg, [msg], tableData, false)
      })
    },
    // 根据序号查询工票
    getGeneratesTicketByXh () {
      if (!this.editCurrentRow) return
      this.$api.getGeneratesTicketByXh({ xh: this.editCurrentRow.xh, columns: this.$refs.searchTable.getMsg(), pageSize: this.pageSize }).then(data => {
        this.countMerge(data.res)
        this.ticketData = data.res
        this.ticketCount = data.count
        this.ticketCurrentRow = null
      }).catch(e => {
        this.ticketData = []
      })
    },
    // 工票表格搜索条件变化
    sendChange () {
      this.getGeneratesTicketByXh()
    },
    add () {
      this.tabIndex = '添加列表'
      this.initData()
    },
    addcancel () {
      this.$refs.autoForm.clearValidate()
      if (this.currentRow) {
        const { tableData, ...msg } = this.currentRow
        this.initData(msg, [msg], tableData, false)
      } else {
        this.initData()
        this.initBase()
      }
    },
    del () {
      if (!this.currentRow) return this.$message.info('请先选择要删除的数据！')
      this.$api[this.api.del]({ ...this.currentRow, dh: this.currentRow.dh }).then(res => {
        this.initData()
        this.initBase()
        const List = this.$refs.List
        List && List.setCurrentRow && List.setCurrentRow() && List.request && List.request()
        this.request && this.request()
      })
    },
    // 可编辑表格 输入
    rowInput ({ row, val, prop }) {
      let zsl = 0; let zzs = 0
      Object.keys(row).forEach(k => {
        if (k.indexOf('zs') !== -1) {
          const idx = k.slice(2)
          const xj = row['xj' + idx] || 0
          const ms = row['ms' + idx] || 0
          const ys = 'ys' + idx
          const flag = parseFloat(xj) >= parseFloat(ms)
          const zsV = xj / ms
          const ysV = xj % ms
          row[k] = isFinite(zsV) && flag ? Math.floor(zsV) : ''
          row[ys] = isFinite(ysV) && flag ? ysV : ''
          zzs = this.$math.add(row[k] || 0, zzs)
          zsl = this.$math.add(xj || 0, zsl)
        }
      })
      row.zsl = zsl
      row.zzs = zzs
    },
    // 可编辑表格数据变化
    dataChange (tableData) {
      tableData.forEach(r => {
        let zsl = 0
        Object.keys(r).forEach(k => {
          if (k.indexOf('xj') !== -1 && k.slice(2) < 13) {
            zsl = this.$math.add(r[k] || 0, zsl)
          }
        })
        r.zsl = zsl
      })
    },
    //  获取数据
    getData () {
      return new Promise(resolve => {
        this.$refs.autoForm.submitForm().then(res => {
          const titleTableData = this.$refs.editTable2.submitTable()[0]
          const tableData = this.$refs.editTable.submitTable()
          const attachParams = this.attachParams.flag && this.attachParams.ys ? { ys: this.attachParams.ys } : {}
          const sendData = { ...res, ...titleTableData, ...attachParams, tableData }
          resolve(sendData)
        })
      })
    },
    //  初始化数据
    initData (val = null, vTitle, vTable, flag = true) {
      this.$refs.autoForm && this.$refs.autoForm.initForm(val)
      if (this.$refs.editTable) {
        this.$refs.editTable.initTableData(vTable, flag)
        this.$refs.editTable_2.initTableData(vTable, flag)
      }
      this.$refs.editTable2 && this.$refs.editTable2.initTableData(vTitle, flag)
      if (vTable && vTable.length) {
        this.editCurrentRow = vTable[0]
        this.$refs.editTable.setCurrentRow(0)
        this.$refs.editTable_2.setCurrentRow(0)
        this.getGeneratesTicketByXh()
      }
    },
    //  初始化设置
    initBase () {
      this.ticketData = []
      this.currentRow = null
      this.editCurrentRow = null
      this.ticketCurrentRow = null
      this.ticketCount = 0
      this.dynamic.forEach((d, i) => {
        d.label = '码数' + (i + 1)
      })
    },
    // 设置工票表格每页显示数量
    setPageSize () {
      this.$prompt('建议每页最大不超过70,否则页面会卡顿', '请输入数量', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: num,
        inputValue: this.pageSize,
        inputErrorMessage: '请输入数字',
        closeOnClickModal: false
      }).then(({ value }) => {
        if (value > 100) return this.$alert('每页最大不能超过100条数据！')
        this.pageSize = value
        this.getGeneratesTicketByXh()
      }).catch(e => {
        this.pageSize = 60
      })
    },
    // 分组
    getGroupKey (it) {
      return this.groupKey.reduce((t, k) => {
        return t + it[k]
      }, '')
    },
    // 合并单元格
    countMerge (data) {
      const obj = {}
      data.forEach((it) => {
        const tempK = this.getGroupKey(it)
        obj[tempK]
          ? obj[tempK]++
          : (obj[tempK] = 1)
      })
      const obj2 = {}
      data.forEach((it) => {
        const tempK = this.getGroupKey(it)
        if (!obj2[tempK]) {
          it.count = obj[tempK]
          obj2[tempK] = true
        } else {
          it.count = false
        }
      })
    }
  }
}
</script>

<style lang="scss">
.GeneratesTicketMid {
    border: 1px solid var(--border-gray);
    box-sizing: border-box;
    margin: 2px 0;
    height: 38px;
    display: flex;

    >.GeneratesTicketMidForm {
        display: flex;
        height: 100%;
        padding-left: 3px;
        box-sizing: border-box;
        align-items: center;

        >.GeneratesTicketMidSpan {
            margin: 0 4px;
            font-size: 14px;
        }
    }

    >.GeneratesTicketMidBtn {
        margin-left: 5px;
        height: 100%;
        line-height: 38px;
    }
}
</style>
