const express = require('express')
const cors = require('cors')
const app = express()
const bodyparser = require('body-parser')
const helmet = require("helmet")
const path = require('path')

// middleware
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(function (req, res, next) {
    res.setHeader('Cross-Origin-Resource-Policy', 'same-site')
    next()
})
// routers
const router = require('./routes/productRouter.js')
app.use('/api/products', router)

// user routers
const userRouter = require('./routes/userRouter.js')
app.use('/api/user', userRouter)
// const { path } = require('express/lib/application')

// static Images Folder
app.use('/Images', express.static(path.join(__dirname, './Images')))

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
  })

//port
const PORT = process.env.PORT || 8080

// server
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})