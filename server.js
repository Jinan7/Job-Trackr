import 'express-async-errors'
import morgan from 'morgan'
import express from 'express'
const app = express()
import dotenv from 'dotenv'
dotenv.config()

// db and authenticate user
import connectDB from './db/connect.js'

//router
import authRouter from './routes/authRoutes.js'
import jobsRouter from './routes/jobsRoutes.js'
//middle ware
import notFoundMiddleware from './middleware/not-found.js'
import errorHandlerMiddleware from './middleware/error-handler.js'
import authenticateUser from './middleware/auth.js'

import {dirname} from 'path'
import {fileURLToPath} from 'url'
import path from 'path'



if(process.env.NODE_ENV !== 'production'){
    app.use(morgan('dev'))
}
const __dirname = dirname(fileURLToPath(import.meta.url))
app.use(express.json())

app.use(express.static(path.resolve(__dirname, './client/build')))
app.get('/ap1/v1', (req, res) =>{
    res.send('Welcome')
})

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs',authenticateUser, jobsRouter)

app.get('*', (req, res)=>{
    res.sendFile(path.resolve(__dirname, './client/build', 'index.html'))
})
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000


const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL)   
        app.listen(port, ()=>{
            console.log( `server is listening on port ${port}`)   
        })
    } catch (error){
        console.log(error)
    }
}
 start()
