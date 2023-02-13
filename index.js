const express=require('express')
const app =express()
//create user



const PORT =process.env.PORT || 3000
app.get("/test",(req,res)=>{
    res.json({"message":"working"})
})

app.listen(PORT,() =>console.log(`Server is running at ${PORT}`))





