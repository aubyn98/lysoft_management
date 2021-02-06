<template>
<div class="page ProductTicketSetting">
    <el-card shadow="always" style="text-align:left;">
        <div slot="header" class="clearfix">
            <h1>请扫入条码</h1>
        </div>
        <el-card style="text-align:left;margin-top:10px;">
            <div slot="header" class="clearfix topForm">
                <el-input size="mini" class="topForm_input" placeholder="请输入条码" v-model="tmbh"></el-input>
                <el-button size="mini" type="primary" @click="request">查询</el-button>
                <el-button size="mini" type="warning">清空</el-button>
                <el-button size="mini" type="info">打印</el-button>
            </div>
            <p v-show="!ListData">暂无数据</p>
            <div class="ticketContent" v-show="ListData">
                <span v-for="item in ListItems" :key="item.prop" :style="{}">{{ item.label }}：{{ ListData && ListData[item.prop] }}</span>
            </div>
        </el-card>
        <el-card shadow="always" style="text-align:left;margin-top:10px;">
            <div slot="header" class="clearfix">
                <span>将条码分解成一个为</span>
                <el-input size="mini" style="width:60px;margin:0 15px;" v-model="cjVal"></el-input>
                <span style="width:60px;margin-right:15px;">的条码数</span>
                <el-button size="mini" type="primary" @click="disassemble">条码拆解</el-button>
                <span style="margin-left:15px;color:var(--text-red);">Tip：拆解数为0则条码将为5条一张</span>
            </div>
            <el-button size="small" type="danger" @click="nullify">作废条码</el-button>
            <el-button size="small" type="warning" @click="cancelNullify">取消作废条码</el-button>
            <el-button size="small" type="success" @click="visible = true">条码盘点</el-button>
        </el-card>
    </el-card>
    <CheckGoodsTicket :visible.sync="visible" />
</div>
</template>

<script type="text/javascript">
import { compose } from '@/common/utils/format'
import { num } from '@/common/utils/pattern'
function isNull (cb, prop) {
  if (!this.tmbh) return this.$alert('请输入条码！')
  cb()
}
function isNull2 (cb, prop) {
  if (!this.ListData) return this.$alert('无效条码，无法操作！')
  cb()
}
export default {
  data () {
    return {
      visible: false,
      tmbh: '',
      cjVal: '',
      ListItems: [
        { label: '款号', prop: 'kh' },
        { label: '颜色', prop: 'ysmc' },
        { label: '码数', prop: 'ms' },
        { label: '数量', prop: 'sl' },
        { label: '发货类型', prop: 'fhlx' },
        { label: '备注', prop: 'bz' }
      ],
      ListData: null
    }
  },
  methods: {
    nullify: compose(function () {
      this.$api.nullifyTicket({ tmbh: this.tmbh }).then(() => {
        this.request()
      })
    }, isNull2, isNull),
    cancelNullify: compose(function () {
      this.$api.cancelNullifyTicket({ tmbh: this.tmbh }).then(() => {
        this.request()
      })
    }, isNull2, isNull),
    disassemble: compose(function () {
      if (!num.test(this.cjVal) || !this.cjVal) return this.$alert('请输入数字！')
      if (this.cjVal > this.ListData.sl) return this.$alert('不能大于等于当前数量！')
      this.$api.disassembleTicket({ tmbh: this.tmbh, sl: this.cjVal, zsl: this.ListData.sl })
    }, isNull2, isNull),
    request: compose(function () {
      this.$api.getProductTicketSetting({ tmbh: this.tmbh }).then(({ res }) => {
        if (res.length) {
          this.ListData = res[0]
        } else {
          this.ListData = null
        }
      }).catch(e => {
        this.ListData = null
      })
    }, isNull)
  }
}
</script>

<style lang="scss">
.ProductTicketSetting {
    .topForm {
        >.topForm_input {
            width: 250px;
            margin-right: 15px;
        }
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
    }
}
</style>
