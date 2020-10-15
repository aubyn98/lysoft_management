<template>
  <div class="page">
    <header-btn
      border
      @change="editChange"
      @tab-change="tabChange"
      :activeIndex="1"
      :tabs="['物料信息', '物料信息列表', '停用物料信息列表']"
    >
    </header-btn>
    <div v-show="tabIndex === '物料信息'" class="page-RowContent" style="flex: 1.5">
      <div class="page-RowContent-item" data-left>
        <search-table
          name="MaterielXxTable"
          small
          :tableData="tableDataXx"
          :columns.sync="columnsXx"
          :total="1000"
          :pageSize="20"
          :sums="['合计', '', '', 8, '']"
          @row-click="rowClick"
          @row-dblclick="rowDblclick"
          @send-change="sendChange"
        />
      </div>
      <div class="page-RowContent-item" data-main style="flex: 4">
        <auto-form :formItems="formItems" style="width: 100%" />
      </div>
      <div class="page-RowContent-item" data-right data-wrap style="flex: 4.5">
        <div class="page-RowContent-item" data-wrap-item>
          <div class="page-RowContent-item-header">
            <el-tag style="margin-right: 10px; height: 28px">颜色</el-tag>
            <el-button type="primary" size="mini">添加</el-button
            ><el-button type="danger" size="mini">删除</el-button>
          </div>
          <div class="page-RowContent-item" data-wrap-item-main>
            <search-table
            hidePagination
              name="MaterielColorTable"
              small
              :tableData="tableDataColor"
              :columns.sync="columnsColor"
              :total="1000"
              :pageSize="20"
              @row-click="rowClick"
              @row-dblclick="rowDblclick"
              @send-change="sendChange"
            />
          </div>
        </div>
        <div class="page-RowContent-item" data-wrap-item>
          <div class="page-RowContent-item-header">
            <el-tag style="margin-right: 5px; height: 28px">色号</el-tag>
            <el-button type="primary" size="mini">添加</el-button
            ><el-button type="danger" size="mini">删除</el-button>
          </div>
          <div class="page-RowContent-item" data-wrap-item-main>
            <search-table
            hidePagination
              name="MaterielShTable"
              small
              :tableData="tableDataSh"
              :columns.sync="columnsSh"
              :total="1000"
              :pageSize="20"
              @row-click="rowClick"
              @row-dblclick="rowDblclick"
              @send-change="sendChange"
            />
          </div>
        </div>
        <div class="page-RowContent-item" data-wrap-item>
          <div class="page-RowContent-item-header">
            <el-tag style="margin-right: 10px; height: 28px">规格</el-tag>
            <el-button type="primary" size="mini">添加</el-button
            ><el-button type="danger" size="mini">删除</el-button>
          </div>
          <div class="page-RowContent-item" data-wrap-item-main>
            <search-table
            hidePagination
              name="MaterielSpecTable"
              small
              :tableData="tableDataSpec"
              :columns.sync="columnsSpec"
              :total="1000"
              :pageSize="20"
              @row-click="rowClick"
              @row-dblclick="rowDblclick"
              @send-change="sendChange"
            />
          </div>
        </div>
        <div class="page-RowContent-item" data-wrap-item>
          <div class="page-RowContent-item-header">
            <el-tag style="margin-right: 10px; height: 28px">成分</el-tag>
            <el-button type="primary" size="mini">添加</el-button
            ><el-button type="danger" size="mini">删除</el-button>
          </div>
          <div class="page-RowContent-item" data-wrap-item-main>
            <search-table
            hidePagination
              name="MaterielCfTable"
              small
              :tableData="tableDataConstituent"
              :columns.sync="columnsConstituent"
              :total="1000"
              :pageSize="20"
              @row-click="rowClick"
              @row-dblclick="rowDblclick"
              @send-change="sendChange"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="page-RowContent" v-show="tabIndex === '物料信息列表'">
      <search-table
        name="MaterielXxlbTable"
        small
        :tableData="tableDataLb"
        :columns.sync="columnsLb"
        :total="1000"
        :pageSize="20"
        :sums="['合计', '', '', 8, '']"
        @row-click="rowClick"
        @row-dblclick="rowDblclick"
        @send-change="sendChange"
      />
    </div>
    <div class="page-RowContent" v-show="tabIndex === '停用物料信息列表'">
      <search-table
        name="MaterielTyxxlbTable"
        small
        :tableData="tableDataTy"
        :columns.sync="columnsTy"
        :total="1000"
        :pageSize="20"
        :sums="['合计', '', '', 8, '']"
        @row-click="rowClick"
        @row-dblclick="rowDblclick"
        @send-change="sendChange"
      />
    </div>
  </div>
</template>

<script type="text/javascript">
import formItems from './formItems'
import { columnsXx, columnsLb, columnsTy, columnsColor, columnsSh, columnsSpec, columnsConstituent } from './columns'
export default {
  created () {},
  data () {
    return {
      search: '',
      search2: '',
      tabIndex: '物料信息',
      tableDataXx: [],
      tableDataLb: [],
      tableDataTy: [],
      tableDataColor: [],
      tableDataSh: [],
      tableDataSpec: [],
      tableDataConstituent: [],
      columnsXx,
      columnsLb,
      columnsTy,
      columnsColor,
      columnsSh,
      columnsSpec,
      columnsConstituent,
      formItems
    }
  },
  methods: {
    editChange ({ action, edit }) {
      this[action]()
    },
    tabChange (tab) {
      this.tabIndex = tab
    },
    sendChange (msg) {
      console.log(JSON.stringify(msg))
    },
    rowClick (row) {
      console.log(row)
    },
    rowDblclick (row, c, e) {
      console.log(row)
    },
    add () {},
    addsave () {},
    addcancel () {},
    update () {},
    updatesave () {},
    updatecancel () {},
    del () {}
  },
  components: {}
}
</script>
