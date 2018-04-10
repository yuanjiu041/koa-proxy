const koa = require('koa')
const proxy = require('../src/index.js')

const app = new koa()

app.use(proxy({
  origin: 'http://www.baidu.com',
  rules: [
    (ctx) => {}
  ]
}))

app.use((ctx, next) => {
  ctx.body = 'ok'
})

app.listen(8000, () => {
  console.log('//localhost:8000')
})
