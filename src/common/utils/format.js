const moment = require('moment')
module.exports = {
  copy: function (params) {
    return JSON.parse(JSON.stringify(params))
  },
  getDate: function (params) {
    return moment(params).format('YYYY-MM-DD')
  }
}
