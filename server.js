const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const config = require('config')
const cookieParser = require('cookie-parser')
const regRoute = require('./routes/regRouter.js')
const loginRouter = require('./routes/loginRouter.js')
const userRouter = require('./routes/userRouter.js')
const messageObj = require('./modules/message.js')

const app = express()

const http = require('http').createServer(app)

const PORT = process.env.PORT || 3000

//  set view & engine ejs
app.set('views', './views')
app.set('view engine', 'ejs')

// set static 
app.use(express.static(path.join(__dirname, 'public')))

app.use(cookieParser(config.get('cookie')))


app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// routes
app.use('/', [regRoute, loginRouter]);
app.use('/user', userRouter);



// connect mongodb and listen port
(async function start() {
    try {
        await mongoose.connect(config.get('mongoURL'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        http.listen(PORT, () => {
            console.log(`App is running on port ${PORT}...`)
        })

    } catch (e) {
        console.log(e)
    }
})()


// socket io


const io = require('socket.io')(http)

// online users array
let users = [];
// user connects

io.on('connection', socket => {
    console.log('User connected')
    const userId = socket.id

    // get name and avatar from ejs hidden inputs
    socket.on('name', userData => {
        // console.log(userData)
        const user = messageObj(userId, userData.username, userData.avatar)
             users.push(user)
        io.emit('users',users)


  socket.on('disconnect', () => {
                console.log("User disconnected")

                const index = users.indexOf(user)
                console.log(index)
                users.splice(index, 1)
                io.emit('users', users)
              
            })

            
        // get message from input
        socket.on('message', msg => {
            io.emit('server', messageObj(userId, userData.username, userData.avatar, msg));
          
        })


    })


})