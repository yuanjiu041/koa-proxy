const fetch = require('./fetch')

module.exports = (options) => {
  return async (ctx, next) => {
    const { request } = ctx
    const { url, header } = request
    const { origin, rules } = options

    /* if (rules) {
      if (!rules.length) // rules需要为一个数组
        return
      for (let i = 0; i < rules.length; i++) {
      }
    } */
    const wholeUrl = origin + url
    const res = await fetch(ctx, wholeUrl, {
      headers: header
    }).catch((err) => {
      console.log(err)
    })
    ctx.body = res
  }
}