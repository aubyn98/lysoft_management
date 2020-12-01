<template>
    <el-dialog
      :visible="visible"
      title="更改密码"
      @close="$emit('update:visible', false)"
      class="Password"
    >
      <auto-form
        ref="autoForm"
        :formItems="formItems"
        style="justify-content: center"
      />
      <span slot="footer" class="dialog-footer">
        <el-button @click="$emit('update:visible', false)">取 消</el-button>
        <el-button type="primary" @click="confirm"
          >确 定</el-button
        >
      </span>
    </el-dialog>
</template>

<script type="text/javascript">
export default {
  props: {
    visible: {
      required: true,
      type: Boolean
    }
  },
  data () {
    return {
      formItems: [
        {
          label: '旧 密 码',
          prop: 'jmm',
          type: 'password',
          style: { width: '400px' }
        },
        {
          label: '新 密 码',
          prop: 'xmm',
          type: 'password',
          style: { width: '400px' }
        },
        {
          label: '确认密码',
          prop: 'qrmm',
          type: 'password',
          style: { width: '400px' }
        }
      ]
    }
  },
  methods: {
    confirm () {
      this.$refs.autoForm.submitForm().then(form => {
        if (form.xmm !== form.qrmm) {
          return this.$message.info('2次输入的密码不一致！')
        }
        this.$api.updatePassword({ ...form, user: this.$store.state.account.username }).then(res => {
          this.$emit('update:visible', false)
        })
      })
    }
  }
}
</script>
<style lang="scss">
.Password {
    .el-dialog{
        margin-top: 30vh !important;
        width: 500px;
    }
}
</style>
