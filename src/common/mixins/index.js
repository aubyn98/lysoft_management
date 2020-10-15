const mixins = require.context('./', true, /.js$/)
module.exports = mixins.keys().reduce((t, m) => {
  const name = m.match(/.*\/(.*)\.js$/)[1]
  if (name !== 'index') {
    t[name] = mixins(m).default
  }
  return t
}, {})
