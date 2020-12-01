export default {
  methods: {
    fromIconClick (prop) {
      this.subRecords.some(it => {
        if (it.prop === prop) {
          it.visible = true
          return true
        }
      })
    },
    subSelectEnd (prop, rows) {
      if (!rows[0]) return this.$message.info('请至少选择一项！')
      const { id, index, ...row } = rows[0]
      this.$refs.autoForm.setFieldsValue(row)
      this.subRecords.some(it => {
        if (it.prop === prop) {
          it.visible = false
          return true
        }
      })
    },
    subDblclick (prop, { id, index, ...row }) {
      this.subRecords.some(it => {
        if (it.prop === prop) {
          it.visible = false
          return true
        }
      })
      if (prop === 'xmmc') {
        return this.$refs.autoForm.setFieldsValue({ xmmc: row.jelx })
      }
      this.$refs.autoForm.setFieldsValue(row)
    }
  }
}
