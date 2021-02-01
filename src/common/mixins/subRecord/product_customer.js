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
      switch (prop) {
        case 'khmc':
          if (!this.autocompleteApi || !this.autocompleteApi[prop]) {
            this.$refs.autoForm.setFieldsValue({ khbh: row.khbh, khmc: row.khmc })
            return
          }
          this.$api[this.autocompleteApi[prop]]({ khbh: row.khbh })
            .then((data) => {
              data.res.length
                ? this.$refs.autoForm.setFieldsValue({
                  khmc: row.khmc,
                  khbh: row.khbh,
                  qdqk: data.res[0].ljqk,
                  ljqk: data.res[0].ljqk,
                  ljqk1: data.res[0].ljqk
                }) : this.$refs.autoForm.setFieldsValue({ khbh: row.khbh, khmc: row.khmc })
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
