<template>
<el-dialog :visible="visible" title="货物条码盘点" center class="CheckGoodsTicket" @close="close">
    <div style="margin:10px 0;">
        <span style="margin-right:10px;">条形编码</span>
        <el-input size="mini" class="topForm_input" placeholder="请输入条码" style="width:150px" v-model="msg.tmbh" @keydown.enter.native="request" :disabled="disabled"></el-input>
        <span style="margin:0 10px;">
            <el-radio v-model="msg.gl" :label="1" :disabled="disabled">款式过滤</el-radio>
            <el-radio v-model="msg.gl" :label="2" :disabled="disabled">档位过滤</el-radio>
        </span>
        <el-button type="primary" size="mini" @click="filterHandle" :disabled="disabled">过滤</el-button>
        <el-button type="primary" size="mini" @click="nullifyHandle" :disabled="!disabled">是否作废</el-button>
        <el-badge :value="badgeVals[badge.prop]" class="_badge" v-for="badge in badges" :key="badge.prop">
            <el-tag :type="badge.type">{{badge.label}}</el-tag>
        </el-badge>
    </div>
    <div style="height:300px">
        <search-table
            ref="top"
            name="CheckGoodsTicket"
            :sourceData="top_tableData"
            hide-search
            :columns.sync="top_columns"></search-table>
    </div>
    <div style="height:300px">
        <search-table
            ref="bottom"
            name="CheckGoodsTicket2"
            :sourceData="bottom_tableData"
            hide-search
            :columns.sync="bottom_columns"></search-table>
    </div>
</el-dialog>
</template>

<script type="text/javascript">
import { top_columns, bottom_columns } from './columns'
export default {
  props: {
    visible: Boolean
  },
  data () {
    return {
      top_tableData: [],
      top_columns,
      bottom_tableData: [],
      bottom_columns,
      msg: {
        tmbh: '',
        gl: 1
      },
      badges: [{ type: 'success', prop: 'yxtm', label: '有效条码' }, { type: 'danger', prop: 'wxtm', label: '无效条码' }, { type: 'info', prop: 'cftm', label: '重复条码' }],
      badgeVals: {
        yxtm: 0,
        wxtm: 0,
        cftm: 0
      },
      tmbhArr: [],
      disabled: false
    }
  },
  watch: {
    visible (val) {
      if (val) {
        this.reset()
      }
    }
  },
  methods: {
    filterHandle () {
      if (!this.msg.tmbh) return this.$alert('请先输入条码编号！')
      const tmbh = this.top_tableData.length ? this.top_tableData.map(r => r.tmbh) : [this.msg.tmbh]
      this.$api.filterCheckGoodsTicket({ tmbh, gl: this.msg.gl }).then(({ res }) => {
        this.disabled = true
        this.setData(res, true)
      })
    },
    nullifyHandle () {
      if (!this.msg.tmbh) return this.$alert('请先输入条码编号！')
      if (!this.top_tableData.length) return this.$alert('无记录可作废！')
      const tmbh = this.top_tableData.map(r => r.tmbh)
      this.$api.nullifyCheckGoodsTicket({ tmbh }).then(({ res }) => {
        this.close()
      })
    },
    reset () {
      this.msg.tmbh = ''
      Object.keys(this.badgeVals).forEach(k => {
        this.badgeVals[k] = 0
      })
      this.top_tableData = []
      this.bottom_tableData = []
      this.tmbhArr = []
      this.disabled = false
    },
    setData (res, type = null) {
      type ? (this.top_tableData = res) : this.top_tableData.push(...res)
      let zsl = 0
      const groupData = this.$arr.groupBy([['kh', 'ysmc', 'ms', 'dw', 'sb', 'kslx']], res, null, (item) => {
        zsl = this.$math.add(item.sl, zsl)
      })
      this.bottom_tableData = groupData.reduce((t, item) => {
        t.push(...item.value)
        return t
      }, [])
      this.$refs.top.setSums({ sl: zsl })
      this.$refs.bottom.setSums({ sl: zsl })
    },
    request () {
      if (!this.msg.tmbh) return
      if (this.tmbhArr.includes(this.msg.tmbh)) {
        this.badgeVals.cftm += 1
        return
      }
      this.$api.getCheckGoodsTicket(this.msg).then(({ res }) => {
        if (!res.length) { this.badgeVals.wxtm += 1; this.msg.tmbh = ''; return this.$alert('无效条码') }
        this.setData(res)
        this.badgeVals.yxtm += 1
      }).catch(e => {
        this.badgeVals.wxtm += 1
      })
      this.tmbhArr.push(this.msg.tmbh)
    },
    close () {
      this.$emit('update:visible', false)
      this.$emit('close', false)
    }
  }
}
</script>

<style lang="scss">
.CheckGoodsTicket {
    .el-dialog {
        margin-top: 2vh !important;
        width: 70vw;
    }

    ._badge {
        margin: 0 15px;
    }
}
</style>
