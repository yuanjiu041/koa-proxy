const koa = require('koa')
const proxy = require('../src/index.js')

const app = new koa()

app.use(proxy({
  mapper: {
    '/baidu/*': 'http://www.baidu.com',
    '/taobao/*': 'http://www.taobao.com',
    '/dawnapp/*': 'http://localhost:3000/dawnapp',
    '/assets/*': 'http://localhost:3000/assets'
  }
}))

app.use((ctx, next) => {
  ctx.body = 'ok'
})

app.listen(8000, () => {
  console.log('//localhost:8000')
})
