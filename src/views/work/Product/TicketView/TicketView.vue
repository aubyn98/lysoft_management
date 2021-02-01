<template>
<div class="page">
    <div class="page-RowContent">
        <div class="page-RowContent-item" data-left>
            <search-table
                api="getTicketView"
                name="TicketViewTable"
                ref="Lb"
                :params="{  }"
                :columns.sync="columnsXx"
                @row-click="rowClickXx"
                @row-dblclick="rowDblclick" />
        </div>
    </div>
</div>
</template>

<script type="text/javascript">
import { columnsXx } from './columns'
export default {
  data () {
    return {
      columnsXx
    }
  },
  methods: {
    rowClickXx () {

    },
    rowDblclick () {

    }

  }
}
</script>

<style lang="scss">
</style>
