export default {
  data () {
    return {
      subRecords: [
        {
          prop: 'khmc',
          visible: false,
          component: 'Customer'
        },
        {
          prop: 'jelx',
          visible: false,
          component: 'AmountType'
        },
        {
          prop: 'ckmc',
          visible: false,
          component: 'Store'
        }
      ]
    }
  },
  methods: {
    subDblclick (prop, { id, index, ...row }) {
      /* this.subRecords.some(it => {
        if (it.prop === prop) {
          it.visible = false
          return true
        }
      }) */
      switch (prop) {
        /* case 'khmc':
          break */
        case 'jelx':
          this.$refs.autoForm.setFieldsValue({ jelx: row.jelx })
          break
        case 'ckmc':
          this.$refs.autoForm.setFieldsValue({ ckmc: row.ckmc })
          break
        default:
          this.$refs.autoForm.setFieldsValue(row)
      }
    }
  }
}
