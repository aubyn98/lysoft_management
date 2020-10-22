export default {
  computed: {
    listeners () {
      return Object.keys(this.$listeners).reduce((t, k) => {
        // if (k !== 'close') {
        t[k] = this.$listeners[k]
        // }
        return t
      }, {})
    }
  }
}
