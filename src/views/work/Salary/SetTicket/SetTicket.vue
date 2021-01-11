<template>
<div class="page SetTicket">
    <header-btn hide-edit border key="pageHeader" :defaultTab.sync="tabIndex" :tabs="['磁卡模式']">
        <!-- , '磁卡模式-历史' -->
    </header-btn>
    <div class="SetTicketbox">
        <div v-show="tabIndex === '磁卡模式'">
            <el-card shadow="always">
                <auto-form
                    ref="autoForm"
                    style="width: 100%"
                    :formItems="formItems"
                    :tab="false"
                    @btn-click="btnClick"
                    @enter="enter1st"
                    @autocomplete-select="autocompleteSelect" />
            </el-card>
            <el-card shadow="always">
                <div class="ticketContent" v-show="ListData">
                    <span v-for="item in ListItems" :key="item.prop" :style="{}">{{ item.label }}：{{ ListData && ListData[item.prop] }}</span>
                </div>
                <span v-show="!ListData">暂无数据,请输入磁卡信息</span>
            </el-card>
            <el-card shadow="always">
                <div class="ticketBtns">
                    <div class="btn-link">
                        <div>
                            <el-button type="primary" size="mini" @click="query">查询</el-button>
                            <el-button type="primary" size="mini" @click="management">管理工序</el-button>
                        </div>
                        <el-button type="primary" size="mini" @click="openPrompt">为此扎配卡</el-button>
                        <el-button type="primary" size="mini" @click="invalidHandle('cgx')">此工序作废</el-button>
                        <el-button type="primary" size="mini" @click="cancelInvalid('cgx')">取消此工序作废</el-button>
                    </div>
                    <div class="btn-link">
                        <div>
                            <el-button type="primary" size="mini" @click="disassemble">拆解</el-button>
                            <el-button type="primary" size="mini" @click="cancelDisassemble">取消拆解</el-button>
                        </div>
                        <el-button type="primary" size="mini" @click="showDialog('xgczsl')">修改此扎数量</el-button>
                        <el-button type="primary" size="mini" @click="invalidHandle('cz')">此扎作废</el-button>
                        <el-button type="primary" size="mini" @click="cancelInvalid('cz')">取消此扎作废</el-button>
                    </div>
                    <div class="btn-link">
                        <el-button type="primary" size="mini" @click="showDialog('xgjhrq')">修改交货日期</el-button>
                        <el-button type="primary" size="mini" @click="showDialog('xgjhsl')">修改交货数量</el-button>
                        <el-button type="primary" size="mini" @click="invalidHandle('cdgx')">此道工序作废</el-button>
                        <el-button type="primary" size="mini" @click="cancelInvalid('cdgx')">取消此道工序作废</el-button>
                    </div>
                    <div class="btn-link">
                        <el-button type="primary" size="mini" @click="showDialog('xgcgxwjsl')">修改此工序未交数量</el-button>
                        <el-button type="primary" size="mini" @click="clearHandle('dqgxxx')">删除当前工序信息</el-button>
                        <el-button type="primary" size="mini" @click="clearHandle('czjhxx')">清除此扎交货信息</el-button>
                        <el-button type="primary" size="mini" @click="invalidHandle('czwsgx')">作废此扎未刷工序</el-button>
                    </div>
                </div>
            </el-card>
        </div>
        <div v-show="tabIndex === '磁卡模式-历史'">
            <el-card shadow="always">
                <auto-form
                    ref="autoForm2"
                    style="width: 100%"
                    :formItems="formItems"
                    :tab="false"
                    @btn-click="btnClick"
                    @enter="enter2nd" />
            </el-card>
            <el-card shadow="always">
                <div class="ticketContent" v-show="ListData">
                    <el-tag v-for="item in ListItems" :key="item.prop">{{ item.label }}：{{ ListData && ListData[item.prop] }}</el-tag>
                </div>
                <span v-show="!ListData">暂无数据,请输入磁卡信息</span>
            </el-card>
            <el-card shadow="always">
                <div class="ticketBtns ticketBtns2">
                    <div class="btn-link">
                        <div>
                            <el-button type="primary" size="mini">查询</el-button>
                            <el-button type="primary" size="mini">管理工序</el-button>
                        </div>
                        <el-button type="primary" size="mini">此工序作废</el-button>
                        <el-button type="primary" size="mini">取消此工序作废</el-button>
                    </div>
                    <div class="btn-link">
                        <el-button type="primary" size="mini" @click="visibles.xgczsl = true">修改此扎数量</el-button>
                        <el-button type="primary" size="mini">此扎作废</el-button>
                        <el-button type="primary" size="mini">取消此扎作废</el-button>
                    </div>
                    <div class="btn-link">
                        <el-button type="primary" size="mini">修改交货数量</el-button>
                        <el-button type="primary" size="mini">此道工序作废</el-button>
                        <el-button type="primary" size="mini">取消此道工序作废</el-button>
                    </div>
                    <div class="btn-link">
                        <el-button type="primary" size="mini">删除当前工序信息</el-button>
                        <el-button type="primary" size="mini">清除此扎交货信息</el-button>
                        <el-button type="primary" size="mini">作废此扎未刷工序</el-button>
                    </div>
                </div>
            </el-card>
        </div>
        <el-card shadow="always">
            <template #header>
                <span>一键作废未刷工序</span>
            </template>
            <el-input placeholder="请输入磁卡号并回车" v-model="cardInvalidNum" @keypress.native.enter="enterInvalid"></el-input>
        </el-card>
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
        <div style="text-align: left" class="Ticketcjgx" v-if="ListData">
            <el-tag>床号：{{ListData.ch}}</el-tag>
            <el-tag>款号：{{ListData.kh}}</el-tag>
            <el-tag>工序：{{ListData.gxmc}}</el-tag>
            <el-tag>颜色：{{ListData.ysmc}}</el-tag>
        </div>
        <div style="height: 300px">
            <edit-table :columns.sync="columnsCj" name="SetTicketCjgx" :disabled="false" ref="editTable" v-if="visibles.cj"></edit-table>
        </div>
        <template #footer>
            <div>
                <el-button @click="visibles.cj = false">取 消</el-button>
                <el-button type="primary" @click="disassembleConfirm">确认拆解</el-button>
            </div>
        </template>
    </el-dialog>
    <ProcessManagement :visible.sync="visibles.glgx" :params="ListData" title="管理工序" name="SetTicketGx" :columns.sync="columnsGx" />
</div>
</template>

<script type="text/javascript">
import {
  formItems,
  formItems2,
  formItems3,
  formItems4,
  formItems5
} from './formItems'
import { columnsCj, columnsGx } from './columns'
import { compose } from '@/common/utils/format'
function isNull (cb, prop) {
  if (!this.ListData) return this.$alert('请先刷入磁卡！')
  if ((prop === 'xgjhrq' || prop === 'jhsl' || prop === 'czjhxx') && !this.ListData.yggh && !this.ListData.ygmc) return this.$alert('未交货！')
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
  data () {
    return {
      tabIndex: '磁卡模式',
      formItems,
      columnsCj,
      columnsGx,
      dialogs: [
        {
          title: '修改此扎数量',
          prop: 'xgczsl',
          formItems: formItems2,
          visible: false
        },
        {
          title: '修改交货数量',
          prop: 'xgjhsl',
          formItems: formItems3,
          visible: false
        },
        {
          title: '修改此工序未交数量',
          prop: 'xgcgxwjsl',
          formItems: formItems4,
          visible: false
        },
        {
          title: '修改交货日期',
          prop: 'xgjhrq',
          formItems: formItems5,
          visible: false
        }
      ],
      visibles: {
        cj: false,
        glgx: false
      },
      cardInvalidNum: '',
      ListData: null,
      ListItems: [
        { label: '款号', prop: 'kh' },
        { label: '颜色', prop: 'ysmc' },
        { label: '码数', prop: 'ms' },
        { label: '工序', prop: 'gxmc' },
        { label: '工票数', prop: 'sl' },
        { label: '交货数', prop: 'jhsl' },
        { label: '扎号', prop: 'zh' },
        { label: '下次此工序的交货数为', prop: 'wjsl' },
        { label: '员工', prop: 'ygmc' },
        { label: '是否结算', prop: 'zt' },
        { label: '备注', prop: 'bz' },
        { label: '加工商', prop: 'jgsmc' },
        { label: '交货日期', prop: 'jhrq' }
      ],
      invalidTextDict: {
        cz: '此扎',
        cgx: '此工序',
        cdgx: '此道工序'
      }
    }
  },
  methods: {
    clearHandle: compose(function (state) {
      this.$api[`clear_${state}_SetTicket`](this.ListData).then(() => {
        this.getTicket()
      })
    }, authentication, isNull),
    showDialog: compose(function (state) {
      /* this.$authentication().then(() => {

      }).catch(e => {}) */
      this.dialogs.some((d) => {
        return (d.visible = d.prop === state)
      })
      this.$nextTick(() => {
        const data = { ...this.ListData }
        if (state === 'xgczsl') {
          data.ysl = data.sl
          data.yjhslbd = true
        }
        this.$refs['autoForm_' + state][0].initForm(data)
      })
    }, authentication, isNull),
    dialogConfirm (d) {
      this.$refs['autoForm_' + d.prop][0].submitForm().then(res => {
        this.$api[`update_${d.prop.substring(2)}_SetTicket`]({ ...this.ListData, ...res }).then(res => {
          this.getTicket()
          d.visible = false
        })
      })
    },
    getTicket () {
      this.$refs.autoForm.submitForm().then((form) => {
        this.$api
          .getTicket(form)
          .then((data) => {
            this.ListData = data.res[0]
            !form.gxmc &&
              !form.ch &&
              this.$refs.autoForm.setFieldsValue({
                ch: data.ch || '',
                gxmc: data.gxmc || ''
              })
          })
          .catch((e) => {
            this.ListData = null
          })
      })
    },
    invalidHandle: compose(function (state) {
      this.$api[`invalid_${state}_SetTicket`]({
        ...this.ListData,
        bz: `${this.invalidTextDict[state]}作废`
      }).then((res) => {
        this.getTicket()
      })
    }, isNull),
    cancelInvalid: compose(function (state) {
      this.$api[`invalid_${state}_SetTicket`]({
        ...this.ListData,
        bz: ''
      }).then((res) => {
        this.getTicket()
      })
    }, isNull),
    query () {
      const tmbh = this.$refs.autoForm.ruleForm.tmbh
      tmbh &&
        this.$emit('select', 'TicketQuery', {
          cb: (ref) => {
            ref.jumpQuery(tmbh)
          }
        })
    },
    openPrompt () {
      this.$prompt('请扫入磁卡信息', '为此扎配卡', {
        confirmButtonText: '确定',
        cancelButtonText:
          '取消',
        inputPattern: /.+/,
        inputErrorMessage: '请输入卡号'
      })
        .then(({ value }) => {
          this.$api.update_pk_SetTicket({ ...this.ListData, tmbh: value }).then(res => {
            this.getTicket()
          })
        })
        .catch(() => {})
    },
    enter1st (k, form) {
      if (!form[k]) return
      this.$api
        .getTicket({ tmbh: form[k] })
        .then((data) => {
          this.getTicket()
        })
        .catch((e) => {
          this.ListData = null
        })
    },
    autocompleteSelect ({ v, prop, form }) {
      this.getTicket()
    },
    enter2nd () {
      console.log(100)
    },
    enterInvalid () {
      this.$api.invalid_wsgx_SetTicket({ tmbh: this.cardInvalidNum }).then(() => {

      })
    },
    disassembleConfirm () {
      const tableData = this.$refs.editTable.submitTable()
      const zsl = tableData.reduce((t, r) => {
        return this.$math.add(t || 0, r.sl || 0)
      }, 0)
      const step = this.ListData.gxsl - (this.ListData.jhsl || 0)
      if (zsl > step) return this.$alert(`数量不能超过${step}!`)
      this.$api.update_cj_SetTicket({ ...this.ListData, tableData }).then(res => {
        this.getTicket()
        this.visibles.cj = false
      })
    },
    management: compose(function () {
      this.visibles.glgx = true
    }, isNull),
    cancelDisassemble: compose(function () {
      this.$api.update_qxcj_SetTicket({ ...this.ListData }).then(res => {
        this.getTicket()
      })
    }, isNull),
    disassemble: compose(function () {
      // eslint-disable-next-line eqeqeq
      if (this.ListData.cj == 1) return this.$alert('已拆解！')
      if (this.ListData.gxsl - (this.ListData.jhsl || 0) === 0) return this.$alert('交货数量达到上限，无法拆解！')
      this.visibles.cj = true
    }, isNull),
    // clear
    btnClick () {
      this.tabIndex === '磁卡模式'
        ? this.$refs.autoForm.initForm()
        : this.$refs.autoForm2.initForm()
      this.ListData = null
    }
  },
  computed: {}
}
</script>

<style lang="scss">
.SetTicket {
    .Ticketcjgx {
        >span+span {
            margin-left: 5px;
        }
    }

    .SetTicketCjgx {
        .el-dialog {
            margin-top: 20vh !important;
        }
    }

    .SetTicketbox {
        display: flex;
    }

    .ticketContent {
        display: grid;
        grid-template-columns: repeat(auto-fill, 200px);
        grid-auto-rows: 40px;
        justify-items: left;
        align-items: center;

        span {
            word-break: break-all;
            font-size: 15px;
        }

        span:last-child {
            grid-column-start: span 2;
        }
    }

    .ticketBtns {
        display: grid;
        grid-template-columns: repeat(4, 200px);
        grid-auto-rows: 40px;
        justify-items: center;
        align-items: center;

        .btn-link {
            height: 160px;
            grid-row: span 4;
            display: flex;
            flex-direction: column;
            justify-content: space-around;

            .el-button {
                margin: 0;
            }
        }
    }

    .ticketBtns2 {
        .btn-link {
            height: 120px;
            grid-row: span 3;
        }
    }
}
</style>
