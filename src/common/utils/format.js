module.exports = {
  copy: function (params) {
    return JSON.parse(JSON.stringify(params))
  }
}
