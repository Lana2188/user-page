const express = require ('express') 
const path = require ('path') 
const mongoose = require('mongoose')
const config = require('config')
const cookieParser = require('cookie-parser')
const regRoute = require ('./routes/regRouter.js') 
const loginRouter= require('./routes/loginRouter.js')
const userRouter= require('./routes/userRouter.js')

const app = express()

const PORT = process.env.PORT || 3000

//  set view & engine ejs
app.set('views', './views')
app.set('view engine', 'ejs')

// set static 
app.use(express.static(path.join(__dirname, 'public')))

app.use(cookieParser(config.get('cookie')))


app.use(express.urlencoded({extended: true}))
app.use(express.json())

// routes
app.use('/', [regRoute, loginRouter ]);
app.use('/user', userRouter);



// connect mongodb and listen port
 (async function start() {
        try {
            await mongoose.connect(config.get('mongoURL'), {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true
            })
            app.listen(PORT, () => {
                console.log(`App is running on port ${PORT}...`)
            })

        } catch (e) {
            console.log(e)
        }
    })()
