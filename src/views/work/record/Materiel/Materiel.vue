<template>
  <div class="page">
    <header-btn
      border
      @change="editChange"
      :activeIndex="xxDataIndex"
      :defaultTab.sync="tabIndex"
      :tabs="['物料信息', '物料信息列表', '停用物料信息列表']"
    >
    <el-button type="success" size="mini" @click="currentRow && (AlarmVisible = true)">库存下限设置</el-button>
    </header-btn>
    <div
      v-show="tabIndex === '物料信息'"
      class="page-RowContent"
      style="flex: 1.5"
    >
      <div class="page-RowContent-item" data-left>
        <search-table
          small
          api="getMateriel"
          ref="Xx"
          name="MaterielXxTable"
          :pageSize="30"
          :columns.sync="columnsXx"
          @row-click="rowClickXx"
        />
      </div>
      <div class="page-RowContent-item" data-main style="flex: 4">
        <auto-form
          ref="autoForm"
          style="width: 100%"
          :disabled="disabled"
          :formItems="formItems"
        />
      </div>
      <div class="page-RowContent-item" data-right data-wrap style="flex: 4.5">
        <div
          class="page-RowContent-item"
          data-wrap-item
          v-for="c in rightTable"
          :key="c.component"
        >
          <div class="page-RowContent-item-header">
            <el-tag style="margin-right: 10px; height: 28px">{{
              c.name
            }}</el-tag>
            <el-button
              type="primary"
              size="mini"
              :disabled="disabled"
              @click="addAttach(c.prop)"
              v-if="c.prop !== 'ys'"
              >添加</el-button
            >
            <el-dropdown type="primary" v-else style="margin-right: 10px">
              <el-button type="primary" size="mini" :disabled="disabled">
                添加<i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="addAttach('ys2')"
                  >物料颜色</el-dropdown-item
                >
                <el-dropdown-item @click.native="addAttach('ys')"
                  >款式颜色</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
            <el-button
              type="danger"
              size="mini"
              :disabled="disabled || !currentAttachRow[c.prop].row"
              @click="delAttach(c.prop)"
              >删除</el-button
            >
          </div>
          <div class="page-RowContent-item" data-wrap-item-main>
            <search-table
              small
              hideSearch
              hidePagination
              :name="`Materiel${c.prop}Table`"
              :sourceData="attachData[c.prop]"
              :columns.sync="c.columns"
              @row-click="
                (row) => {
                  attachRowClick(c.prop, row);
                }
              "
            />
          </div>
        </div>
      </div>
    </div>
    <div class="page-RowContent" v-show="tabIndex === '物料信息列表'">
      <search-table
        small
        api="getMateriel"
        ref="Lb"
        name="MaterielXxlbTable"
        :pageSize="30"
        :params="{ sftywl: 0 }"
        :columns.sync="columnsLb"
        @row-dblclick="rowDblclick"
      />
    </div>
    <div class="page-RowContent" v-show="tabIndex === '停用物料信息列表'">
      <search-table
        small
        api="getMateriel"
        ref="Ty"
        name="MaterielTyxxlbTable"
        :pageSize="30"
        :params="{ sftywl: 1 }"
        :columns.sync="columnsTy"
        @row-dblclick="rowDblclick"
      />
    </div>
    <component
      selection
      v-for="c in rightContents"
      :key="c.component"
      :is="c.component"
      :visible.sync="currentAttachRow[c.prop].visible"
      @selectEnd="attachSelectEnd(c.prop, $event)"
      @row-dblclick="
        (row) => {
          attachSelectEnd(c.prop, [row]);
        }
      "
      :params="{ wlbh: currentRow && currentRow.wlbh }"
    />
    <MaterielAlarm :params="{ wlbh: currentRow && currentRow.wlbh }" :visible.sync="AlarmVisible"/>
  </div>
</template>

<script type="text/javascript">
import formItems from './formItems'
import {
  columnsXx,
  columnsLb,
  columnsTy,
  columnsColor,
  columnsSh,
  columnsSpec,
  columnsConstituent
} from './columns'
import { record } from '@/common/mixins'
export default {
  mixins: [record],
  data () {
    return {
      AlarmVisible: false,
      // 选择的tab
      editTab: '物料信息',
      tabIndex: '物料信息',
      // 操作
      updateApi: {
        api: 'updateMateriel'
      },
      addApi: {
        api: 'addMateriel',
        prop: 'wlbh'
      },
      delApi: {
        api: 'delMateriel',
        prop: 'wlbh'
      },
      attachData: {
        ys: [],
        cf: [],
        sh: [],
        gg: []
      },
      currentAttachRow: {
        ys2: {
          row: null,
          visible: false
        },
        ys: {
          row: null,
          visible: false
        },
        sh: {
          row: null,
          visible: false
        },
        gg: {
          row: null,
          visible: false
        },
        cf: {
          row: null,
          visible: false
        }
      },
      rightContents: [
        { name: '颜色', prop: 'ys', columns: columnsColor, component: 'Color' },
        {
          name: '物料颜色',
          prop: 'ys2',
          columns: columnsColor,
          component: 'MaterielColor'
        },
        {
          name: '色号',
          prop: 'sh',
          columns: columnsSh,
          component: 'ColorNumber'
        },
        {
          name: '规格',
          prop: 'gg',
          columns: columnsSpec,
          component: 'MaterielSpec'
        },
        {
          name: '成分',
          prop: 'cf',
          columns: columnsConstituent,
          component: 'MaterielConstituent'
        }
      ],
      columnsXx,
      columnsLb,
      columnsTy,
      formItems
    }
  },
  methods: {
    delNewItem (arr) {
      return arr.map((it) => {
        const { id, newItem, ...res } = it
        return res
      })
    },
    filterIdOrIndex (arr) {
      return arr.map((it) => {
        const { id, index, ...res } = it
        return res
      })
    },
    initAttachData (flag) {
      Object.keys(this.attachData).forEach((k) => {
        this.attachData[k] = flag ? this.$format.copy(this.currentRow[k]) : []
      })
    },
    // edit---------------------------------------------------------------------------------------
    rowClickXxAction (row) {
      this.initAttachData(true)
    },
    addAction () {
      this.initAttachData()
    },
    addsaveAction (res) {
      const { ys, sh, gg, cf } = this.attachData
      res.ys = ys
      res.sh = sh
      res.gg = gg
      res.cf = cf
    },
    addAttach (prop) {
      this.currentAttachRow[prop].visible = true
    },
    updatesave (fn) {
      this.$refs.autoForm.submitForm().then((option) => {
        const { ys, sh, gg, cf, delys, delsh, delgg, delcf } = this.attachData
        const { bwl, index, rownumber, ...res } = option
        this.updatesaveCommon(
          fn,
          { ...res, ys, sh, gg, cf, delys, delsh, delgg, delcf },
          {
            ...option,
            ys: this.delNewItem(ys),
            sh: this.delNewItem(sh),
            gg: this.delNewItem(gg),
            cf: this.delNewItem(cf)
          }
        )
      })
    },
    updatecancelAction () {
      this.initAttachData(true)
    },
    // attach------------------------------------------------------------------------------------
    attachSelectEnd (prop, rows) {
      this.currentAttachRow[prop].visible = false
      prop = prop === 'ys2' ? 'ys' : prop
      this.attachData[prop].push(
        ...rows.map((it) => {
          const { id, ...res } = it
          res.newItem = true
          return res
        })
      )
      console.log(this.attachData)
    },
    delAttach (prop) {
      const delProp = 'del' + prop
      this.attachData[delProp] || (this.attachData[delProp] = [])
      this.attachData[delProp].push(
        ...this.attachData[prop].splice(
          this.currentAttachRow[prop].row.index,
          1
        )
      )
      this.currentAttachRow[prop].row = null
    },
    attachRowClick (prop, row) {
      this.currentAttachRow[prop].row = row
    }
  },
  computed: {
    rightTable () {
      return this.rightContents.filter(
        (it) => it.component !== 'MaterielColor'
      )
    }
  }
}
</script>
