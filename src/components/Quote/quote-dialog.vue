<template>
  <el-dialog
    :visible="visible"
    :title="title"
    @close="$emit('update:visible', false)"
    class="Quote"
  >
   <quote-content v-on="$listeners" v-bind="$attrs" :name="name" v-if="visible"/>
  </el-dialog>
</template>

<script type="text/javascript">
export default {
  props: {
    visible: {
      required: true,
      type: Boolean
    },
    title: {
      required: true,
      type: String
    },
    name: {
      required: true,
      type: String
    }
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>
<style lang="scss">
.Quote {
  .el-dialog {
    width: 1200px;
  }
}
</style>
