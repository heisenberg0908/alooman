const express=require("express")
const userRouter = require("./routes/user")
const alooRouter = require("./routes/aloo")
const app=express()
const cors=require('cors')

app.use(express.json())
app.use(cors())

app.use('/api/v1/users',userRouter)
app.use('/api/v1/aloo',alooRouter)

const port=3000;
app.listen(port,()=>{
    console.log(`app is listening to port ${port}`)
})