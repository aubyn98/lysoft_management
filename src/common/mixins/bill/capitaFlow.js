export default {
  props: {
    tabIndex: {
      type: String,
      required: true,
      default: '客户来款'
    },
    params: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
    }
  },
  methods: {
    refresh () {
      this.$refs.searchTable.request(true)
    },
    getData () {
      return new Promise(resolve => {
        this.$refs.autoForm.submitForm().then(res => {
          const titleTableData = this.$refs.editTable2.submitTable()[0]
          const sendData = { ...res, ...titleTableData }
          resolve(sendData)
        })
      })
    }
  },
  computed: {
    activeIndex () {
      return this.currentRow ? 1 : -1
    }
  }
}
