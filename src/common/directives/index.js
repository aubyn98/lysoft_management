export default {
  install (Vue) {
    Vue.directive('permission', {
      inserted: function (el, { value }) {
        // console.dir(el.parentElement.removeChild(el))
      }
    })
  }
}
