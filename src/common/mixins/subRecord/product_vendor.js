export default {
  data () {
    return {
      subRecords: [
        {
          prop: 'ghsmc',
          visible: false,
          component: 'Vendor'
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
      switch (prop) {
        case 'ghsmc':
          this.$api
            .getMaterialEnterStoreVendor({ ghsbh: row.ghsbh })
            .then((data) => {
              data.res.length > 0 &&
                  this.$refs.autoForm.setFieldsValue({
                    ghsmc: row.ghsmc,
                    ghsbh: row.ghsbh,
                    qdqk: data.res[0].ljqk,
                    ljqk: data.res[0].ljqk,
                    ljqk1: data.res[0].ljqk
                  })
            })
          break
        case 'jelx':
          this.$refs.autoForm.setFieldsValue({ jelx: row.jelx })
          break
        case 'ckmc':
          this.$refs.autoForm.setFieldsValue({ ckmc: row.ckmc })
          break
        default:
          this.$refs.autoForm.setFieldsValue(row)
      }
      this.subRecords.some(it => {
        if (it.prop === prop) {
          it.visible = false
          return true
        }
      })
    }
  }
}
