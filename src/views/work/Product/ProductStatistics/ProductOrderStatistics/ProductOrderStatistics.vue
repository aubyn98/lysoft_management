<template>
<div class="page ProductOrderStatistics">
    <div class="page-RowContent">
        <div class="page-RowContent-item" data-left>
            <search-table
                small
                span-method
                ref="searchTable"
                name="ProductOrderStatisticsTable"
                style="flex:1;height:0;"
                :sourceData="tableData"
                :columns.sync="columnsXx"
                :sourceCount="count"
                :attach-columns.sync="attachColumns"
                :merge-columns="mergeColumns"
                @row-dblclick="rowDblclick"
                @row-click="rowClick"
                @send-change="sendChange" />
            <div class="bottomForm">
                <span>修改生产状态</span>
                <el-select  placeholder="请选择状态" size="mini" v-model="scMsg.sczt">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
                <el-button type="primary" size="mini" @click="handleSc('updateOrderProductState','sczt')">修改</el-button>
                <span>修改实裁数量</span>
                <el-input size="mini" placeholder="请输入数量" v-model="scMsg.scs"></el-input>
                <el-button type="primary" size="mini" @click="handleSc('updateOrderProductCutNum','scs')">修改</el-button>
            </div>
        </div>
        <div class="page-RowContent-item" data-search data-hover>
            <auto-form class="searchForm-column" ref="autoForm" :formItems="formItems" label-position="top" />
            <el-button type="primary" size="mini" class="search-form-btn" @click="request">查询</el-button>
            <el-button type="primary" size="mini" class="search-form-btn">打印</el-button>
            <el-button type="primary" size="mini" class="search-form-btn" @click="exportExcel">导出</el-button>
            <exportExcel ref="exportExcel" :msg="excelData" :format="excelFormat" style="display: none" />
        </div>
    </div>
</div>
</template>

<script type="text/javascript">
import { statistics, statistics_product_sizeC, excel_statistics_attachC } from '@/common/mixins'
import { columnsXx } from './columns'
import formItems from './formItems'
import { compose } from '@/common/utils/format'
import { num } from '@/common/utils/pattern'
function validate (cb) {
  if (!this.currentRow) return this.$alert('请先选择数据！')
  cb()
}
export default {
  mixins: [statistics, statistics_product_sizeC, excel_statistics_attachC],
  data () {
    return {
      columnsXx,
      formItems,
      // jumpTab: 'MaterialPurchase',
      api: 'getProductOrderStatistics',
      attach: {},
      groupKey: ['rq', 'khmc', 'kh', 'dw', 'lsh', 'dh'],
      mergeColumns: ['rq', 'khmc', 'kh', 'dw', 'lsh', 'dh'],
      currentRow: null,
      options: [{
        value: '工艺',
        label: '工艺'
      }, {
        value: '报料',
        label: '报料'
      }, {
        value: '生产安排',
        label: '生产安排'
      }, {
        value: '裁床',
        label: '裁床'
      }, {
        value: '下车间',
        label: '下车间'
      }, {
        value: '下后道',
        label: '下后道'
      }],
      scMsg: {
        sczt: '',
        scs: ''
      }
    }
  },
  methods: {
    rowClick (row) {
      this.currentRow = row
    },
    handleSc: compose(function (api, key) {
      const { dh, xh2 } = this.currentRow
      if (key === 'scs' && !num.test(this.scMsg[key])) { return this.$alert('请输入数字！') }
      const params = { dh, xh2, [key]: this.scMsg[key] }
      this.$api[api](params).then(() => {
        this.request()
        this.scMsg[key] = ''
      })
    }, validate)
  }
}
</script>

<style lang="scss">
.ProductOrderStatistics {
    .bottomForm {
        line-height: 40px;
        text-align: left;

        >span {
            font-size: 15px;
            margin: 0 5px 0 8px;
        }

        >.el-input,.el-select {
            width: 100px;
            margin: 0 15px;
        }
    }

}
</style>
