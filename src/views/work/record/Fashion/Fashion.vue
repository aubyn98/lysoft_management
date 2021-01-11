<template>
<el-dialog title="款式档案" class="record_dialog" :visible="visible" :append-to-body="appendToBody" @close="closeDialog">
    <div class="page Fashion">
        <header-btn
            border
            :hide-edit="!$permission([{ mc: '款式档案', xg: true }])"
            @change="editChange"
            :activeIndex="xxDataIndex"
            :defaultTab.sync="tabIndex"
            :tabs="['款式信息', '款式信息列表', '停用款式信息列表']">
            <el-button type="primary" size="mini" @click="exportExcel">导出</el-button>
            <el-button type="success" size="mini" @click="AlarmVisible = true">库存下限报警设置</el-button>
            <el-button type="success" size="mini" @click="ProcessWagesVisible = true">工价设置</el-button>
            <exportExcel ref="exportExcel" :msg="excelData" :format="excelFormat" style="display: none" />
        </header-btn>
        <div v-show="tabIndex === '款式信息'" class="page-RowContent" style="flex: 1.5">
            <div class="page-RowContent-item" data-left>
                <search-table
                    small
                    api="getFashion"
                    ref="Xx"
                    name="FashionXxTable"
                    :columns.sync="columnsXx"
                    @row-click="rowClickXx" />
            </div>
            <div class="page-RowContent-item" data-main style="flex: 4" data-scroll>
                <auto-form ref="autoForm" style="width: 100%" :disabled="disabled" :formItems="formItems" @icon-click="fromIconClick" />
                <div class="page-RowContent-item" data-right data-wrap style="flex-shrink: 0; flex-basis: 300px">
                    <div style="display: flex; height: 100%; flex: 1">
                        <div class="page-RowContent-item" v-for="c in mainContents" :key="c.component" :style="c.style">
                            <div class="page-RowContent-item-header">
                                <el-tag style="margin-right: 5px; height: 28px">
                                    {{c.name}}
                                </el-tag>
                                <el-button type="primary" size="mini" style="margin: 0 5px 0 0" :disabled="disabled" @click="addAttach(c.prop)">添加</el-button>
                                <el-button type="danger" size="mini" style="margin: 0" :disabled="disabled || !currentAttachRow[c.prop].row" @click="delAttach(c.prop)">删除</el-button>
                            </div>
                            <div class="page-RowContent-item" data-wrap-item-main>
                                <edit-table
                                    small
                                    hideSearch
                                    hidePagination
                                    stop-key-event
                                    hide-sums
                                    hideAddMenu
                                    :disabled="disabled"
                                    :ref="`Fashion${c.prop}Table`"
                                    :name="`Fashion${c.prop}Table`"
                                    :columns.sync="c.columns"
                                    @row-click="
                      (row) => {
                        attachRowClick(c.prop, row);
                      }
                    " />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="page-RowContent-item" data-right>
                <div style="display: flex; height: 100%; flex: 1">
                    <div class="page-RowContent-item" v-for="c in rightContents" :key="c.component" :style="c.style">
                        <div class="page-RowContent-item-header">
                            <el-tag style="margin-right: 5px; height: 28px">
                                {{
                  c.name
                  }}
                            </el-tag>
                            <el-button type="primary" size="mini" style="margin: 0" :disabled="disabled" @click="addAttach(c.prop)">插入工序</el-button>
                            <el-button type="primary" size="mini" style="margin: 0 5px" :disabled="disabled" @click="QuoteProcessVisible = true">引用工序</el-button>
                            <el-button type="danger" size="mini" style="margin: 0" :disabled="disabled" @click="delAttach(c.prop)">删除</el-button>
                        </div>
                        <div class="page-RowContent-item" data-wrap-item-main>
                            <edit-table
                                small
                                selection
                                hideSearch
                                hidePagination
                                hideAddMenu
                                stop-key-event
                                :disabled="disabled"
                                :ref="`Fashion${c.prop}Table`"
                                :name="`Fashion${c.prop}Table`"
                                :columns.sync="c.columns"
                                @blur="ProcessBlur"
                                @row-click="
                    (row) => {
                      attachRowClick(c.prop, row);
                    }
                  " />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="page-RowContent" v-show="tabIndex === '款式信息列表'">
            <search-table
                api="getFashion"
                ref="Lb"
                name="FashionXxlbTable"
                :params="{ sftyks: 0 }"
                :columns.sync="columnsLb"
                @row-click="rowClickXx"
                @row-dblclick="rowDblclick" />
        </div>
        <div class="page-RowContent" v-show="tabIndex === '停用款式信息列表'">
            <search-table
                api="getFashion"
                ref="Ty"
                name="FashionTyxxlbTable"
                :params="{ sftyks: 1 }"
                :columns.sync="columnsTy"
                @row-click="rowClickXx"
                @row-dblclick="rowDblclick" />
        </div>
        <div v-for="c in autoContents" :key="c.component">
            <component
                append-to-body
                selection
                v-if="currentAttachRow[c.prop].visible"
                :is="c.component"
                :visible.sync="currentAttachRow[c.prop].visible"
                @selectEnd="attachSelectEnd(c.prop, $event)"
                @row-dblclick="
            (row) => {
              attachSelectEnd(c.prop, [row]);
            }
          "
                :params="{ kh: currentRow && currentRow.kh }" />
        </div>
        <FashionAlarm append-to-body :visible.sync="AlarmVisible" />
        <ProcessWages append-to-body :visible.sync="ProcessWagesVisible" />
        <QuoteProcess append-to-body :visible.sync="QuoteProcessVisible" @select-end="quoteProcessSelect" />
        <div v-for="item in subRecords" :key="item.prop">
            <component
                append-to-body
                :sub="item.prop === 'ghsmc' ? ['ghsmc'] : []"
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
    </div>
</el-dialog>
</template>

<script type="text/javascript">
import formItems from './formItems'
import {
  columnsXx,
  columnsLb,
  columnsTy,
  columnsColor,
  columnsSize,
  columnsProcess
} from './columns'
import { record, excel, formIconClick } from '@/common/mixins'
export default {
  mixins: [record, excel, formIconClick],
  data () {
    return {
      ProcessWagesVisible: false,
      QuoteProcessVisible: false,
      AlarmVisible: false,
      // 选择的tab
      editTab: '款式信息',
      tabIndex: '款式信息',
      // 操作
      updateApi: {
        api: 'updateFashion'
      },
      addApi: {
        api: 'addFashion',
        prop: 'kh'
      },
      delApi: {
        api: 'delFashion',
        prop: 'kh'
      },
      currentAttachRow: {
        ys: {
          row: null,
          visible: false
        },
        ksgx: {
          row: null,
          visible: false
        },
        ms: {
          row: null,
          visible: false
        }
      },
      mainContents: [
        {
          name: '颜色',
          prop: 'ys',
          columns: columnsColor,
          style: { width: '180px' },
          component: 'Color'
        },
        {
          name: '码数',
          prop: 'ms',
          columns: columnsSize,
          style: { flex: 1 },
          component: 'Size'
        }
      ],
      rightContents: [
        {
          name: '工序',
          prop: 'ksgx',
          columns: columnsProcess,
          style: { width: '100%' },
          component: 'Process'
        }
      ],
      subRecords: [
        {
          prop: 'kslx',
          visible: false,
          component: 'FashionType'
        },
        {
          prop: 'dw',
          visible: false,
          component: 'Unit'
        },
        {
          prop: 'sb',
          visible: false,
          component: 'Trademark'
        },
        {
          prop: 'lx',
          visible: false,
          component: 'Type'
        },
        {
          prop: 'bl',
          visible: false,
          component: 'Material'
        },
        {
          prop: 'sjs',
          visible: false,
          component: 'Staff'
        },
        {
          prop: 'cf',
          visible: false,
          component: 'MaterialConstituent'
        }
      ],
      columnsXx,
      columnsLb,
      columnsTy,
      formItems,
      excelApi: 'getFashion'
    }
  },
  created () {
    this.excelFormat = this.c2eFormat(this.columnsLb)
  },
  methods: {
    filterIdOrIndex (arr) {
      return arr.map((it) => {
        const { id, index, ...res } = it
        return res
      })
    },
    initAttachData (val, flag = false) {
      this.autoContents.forEach((a) => {
        this.$refs[`Fashion${a.prop}Table`][0].initTableData(
          val ? val[a.prop] : null,
          flag
        )
      })
    },
    // edit---------------------------------------------------------------------------------------
    rowClickXxAction (row) {
      this.initAttachData(row)
    },
    addAction () {
      this.initAttachData()
    },
    getAttachData () {
      return this.autoContents.reduce((t, a) => {
        t[a.prop] = this.$refs[`Fashion${a.prop}Table`][0].submitTable()
        if (a.prop === 'ksgx') {
          t[a.prop] = t[a.prop].map((k) => {
            const { xh, ...ks } = k
            return ks
          })
        }
        return t
      }, {})
    },
    addsaveAction (res) {
      const { ys, ms, ksgx } = this.getAttachData()
      res.ys = ys
      res.ms = ms
      res.ksgx = ksgx
    },
    addAttach (prop) {
      this.currentAttachRow[prop].visible = true
    },
    addsave (fn) {
      const { api } = this.addApi
      this.$refs.autoForm.submitForm().then((res) => {
        this.addsaveAction && this.addsaveAction(res)
        this.$api[api](res).then(
          (r) => {
            const result = { ...res, id: r.res }
            this.currentRow = result
            this.initForm(result)
            fn()
            this.disabled = true
            this.xxDataIndex = 0
            this.refresh(false)
          },
          (e) => {}
        )
      })
    },
    updatesave (fn) {
      this.$refs.autoForm.submitForm().then((option) => {
        const { ys, ms, ksgx } = this.getAttachData()
        const { bwl, index, rownumber, ...res } = option
        this.updatesaveCommon(
          fn,
          { ...res, ys, ms, ksgx },
          {
            ...option,
            ys,
            ms,
            ksgx
          }
        )
      })
    },
    updatecancelAction () {
      this.initAttachData(this.currentRow)
    },
    // attach------------------------------------------------------------------------------------
    quoteProcessSelect (data) {
      const gxList = this.$refs.FashionksgxTable[0].submitTable()
      gxList.push(...data)
      gxList.sort((a, b) => a.px - b.px)
      this.$refs.FashionksgxTable[0].initTableData(gxList, false)
    },
    subDblclick (prop, { id, index, ...row }) {
      this.subRecords.some((it) => {
        if (it.prop === prop) {
          it.visible = false
          return true
        }
      })
      if (prop === 'bl') {
        return this.$refs.autoForm.setFieldsValue({ bl: row.wlmc })
      } else if (prop === 'sjs') {
        return this.$refs.autoForm.setFieldsValue({ sjs: row.ygmc })
      }
      this.$refs.autoForm.setFieldsValue(row)
    },
    sortPx (arr, type = 'copy') {
      // 是否复制原数组
      if (type === 'copy') arr = arr.map((c) => ({ ...c }))
      // 收集去重后的数据
      const filterArr = []
      arr.forEach(
        (g) => filterArr.indexOf(g.gxmc) === -1 && filterArr.push(g.gxmc)
      )
      arr.forEach((g) => {
        // 根据去重后的数据顺序排序
        const index = filterArr.indexOf(g.gxmc)
        g.px = index + 1
      })
      // 对数组进行排序
      arr.sort((a, b) => a.px - b.px)
      return arr
    },
    ProcessBlur (row, prop, arr) {
      if (prop === 'px') {
        // 原px数字的拥有者
        const filterArr = arr.filter((a) => {
          if (a.px !== row.px && a.gxmc === row.gxmc) {
            a.px = row.px
          }
          // eslint-disable-next-line eqeqeq
          return a.px == row.px && a.gxmc !== row.gxmc
        })
        if (filterArr.length) {
          // 旧排序
          const oldSort = this.sortPx(arr)
          // 所更改工序的旧排序
          const oldPx = oldSort
            .filter((a) => a.gxmc === row.gxmc)
            .map((a) => a.px)
            .pop()
          filterArr.forEach((f) => {
            f.px = oldPx
          })
        }
        arr.sort((a, b) => a.px - b.px)
        this.sortPx(arr, 'source')
      }
    },
    attachSelectEnd (prop, rows) {
      if (prop === 'ksgx') {
        // 码数列表
        const msList = this.$refs.FashionmsTable[0].submitTable()
        // 工序列表
        let gxList = this.$refs.FashionksgxTable[0].submitTable()
        // 当前行索引
        if (this.$refs.autoForm.ruleForm.gxdmdj && msList.length) {
          const arr = []
          rows.forEach((r) => {
            msList.forEach((m) => {
              arr.push({ ...r, dmms: m.ms, qhqr: true })
            })
          })
          rows = arr
        } else {
          rows = rows.map((r) => {
            return { ...r, qhqr: true }
          })
        }
        // 当前行索引 this.currentAttachRow[prop].row.index
        gxList.splice(
          this.currentAttachRow[prop].row
            ? this.currentAttachRow[prop].row.index + 1
            : gxList.length,
          0,
          ...rows
        )
        gxList = this.sortPx(gxList)
        this.$refs[`Fashion${prop}Table`][0].initTableData(gxList, false)
      } else {
        this.$refs[`Fashion${prop}Table`][0].pushRow(rows)
      }
      this.currentAttachRow[prop].visible = false
      // this.currentAttachRow[prop].row && this.currentAttachRow[prop].row.index
    },
    delAttach (prop) {
      this.$refs[`Fashion${prop}Table`][0].delRow()
      this.currentAttachRow[prop].row = null
    },
    attachRowClick (prop, row) {
      this.currentAttachRow[prop].row = row
    }
  },
  computed: {
    autoContents () {
      return [].concat(this.mainContents, this.rightContents)
    }
  }
}
</script>

<style lang="scss">
.Fashion {
    .page-RowContent-item[data-left] {
        max-width: 250px;
    }

    .page-RowContent-item[data-main] {
        //  overflow-y: auto;
        display: flex;
        flex-direction: column;
        min-width: 800px;
        max-width: 800px;
    }
}
</style>
