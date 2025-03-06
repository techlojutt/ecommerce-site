const express = require('express');
const dotEnv =  require('dotenv').config()
const cors = require('cors')
const authRouter = require('./routes/authRoutes')

const connectDb = require('./config/db');
const productRouter = require('./routes/adminProductRoutes');


const app = express()
const port = process.env.PORT || 3000;


connectDb()


//middlewares
app.use(cors())
app.use(express.json())


//routes 





app.use('/api/auth',authRouter)

app.use('/api/admin/products',productRouter)


app.get('/',(req,res)=>{
    res.send("hello world")
})






app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})






