const express=require('express')
const app =express()
const db=require('./model/connection')
app.use(express.json())

//create user
app.post("/adduser",(req,res)=>{
    
    const user={name:req.body.name,email:req.body.email,city:req.body.city,phone:req.body.mobile}
    let sql="Insert into `employee` SET ?"
    db.query(sql,user,(err,result)=>{
        if(err) throw err
        else res.json(result)

    })

})

//showuser
app.get("/showuser",(req,res)=>{
    let sql="Select * from `employee`"
    db.query(sql,(err,result)=>{
        if(err) throw err
        else res.json(result)
    })
})
// show a particular user

app.get("/showuser/:email",(req,res)=>{
    let sql=`Select * from employee where email ='${req.params.email}'`
    db.query(sql,(err,result)=>{
        if(err) throw err
        else res.json(result)
    })
})

//delete user
app.delete("/deleteuser/:email",(req,res)=>{
    let email=req.params.email
    let sql=`Delete from employee where email ='${email}'`
    db.query(sql,(err,result)=>{
        if(err) throw err
        else res.json(result)
    })
})
PORT=3000
app.listen(PORT,() =>console.log(`Server is running at ${PORT}`))





