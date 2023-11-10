const express = require("express");
const cartsRouter = require('./routes/carts')
const usersRouter = require('./routes/users')
const goodsRouter = require('./routes/goods')
const cookieParser = require('cookie-parser')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use("/api",[cartsRouter,goodsRouter,usersRouter])
app.get('/', (req, res) => {
    res.send('Welcome to mall_102')
})

app.listen(8888, () => {
    console.log('Server working...')
})