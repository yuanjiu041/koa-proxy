const fetch = require('./fetch')
const stringPathToReg = require('./pathToReg').stringPathToReg

module.exports = (options) => {
  const { mapper } = options
  const keys = Object.keys(mapper)
  const values = Object.values(mapper)

  const regMapper = keys.map((item, idx) => (
    {
      from: stringPathToReg(item),
      to: values[idx]
    }
  ))

  return async (ctx, next) => {
    const { request } = ctx
    const { url, header } = request
    let currentUrl
    for (let i = 0; i < regMapper.length; i++) {
      const rlt = url.match(regMapper[i].from)
      if (rlt !== null) {
        currentUrl = regMapper[i].to + rlt[1]
        // currentUrl = currentUrl.replace(/[^\:]\/\//g, '/')
        break
      }
    }

    console.log(currentUrl)

    if (currentUrl) { // 代理
      const wholeUrl = currentUrl
      const res = await fetch(ctx, wholeUrl, {
        headers: header
      }).catch((err) => {
        console.log('err')
      })
      ctx.body = res
    } else {
      await next()
    }  
  }
}