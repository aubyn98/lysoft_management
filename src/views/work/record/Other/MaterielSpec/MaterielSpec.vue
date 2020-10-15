<template>
  <div class="page">
    <header-btn
      border
      @change="editChange"
    >
    </header-btn>
    <div class="page-RowContent">
      <div class="page-RowContent-item" data-left>
        <search-table
          name="MaterielSpecTable"
          small
          :tableData="tableData"
          :columns.sync="columns"
          :total="1000"
          :pageSize="20"
          :sums="['合计', '', '', 8, '']"
          @row-click="rowClick"
          @row-dblclick="rowDblclick"
          @send-change="sendChange"
        />
      </div>
      <div class="page-RowContent-item" data-main>
        <auto-form style="width: 100%" />
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import { columns } from './columns'
export default {
  created () {},
  data () {
    return {
      search: '',
      search2: '',
      dialogPpVisible: false,
      tableData: [
        {
          date: '2016-05-03',
          name: '王小虎',
          address: 1
        },
        {
          date: '2016-05-02',
          name: '王小虎',
          address: 1
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: 1
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: 1
        },
        {
          date: '2016-05-08',
          name: '王小虎',
          address: 1
        },
        {
          date: '2016-05-06',
          name: '王小虎',
          address: 1
        },
        {
          date: '2016-05-07',
          name: '王小虎',
          address: 1
        }
      ],
      columns
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
