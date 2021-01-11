const hrefReg = location.href.match(/^http(s)?:\/\/([^/]+)(\/[^/]+)?(\/)?(.+)?/)
let urlPath = '/'
if (hrefReg[3]) {
  urlPath = hrefReg[3] === '/views' ? '/' : hrefReg[3] + (hrefReg[4] ? hrefReg[4] : '/')
}
console.log(urlPath)
export const routePath = urlPath
export const apiPath = process.env.NODE_ENV !== 'production' ? 'http://192.168.0.178/wljxc_web/home/' : urlPath + 'home/'
