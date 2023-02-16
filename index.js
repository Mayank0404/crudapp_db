const express=require('express')
const app =express()
const db=require('./model/connection')
const engine=require('express-handlebars').engine
app.use(express.json()) // middle ware
app.use(express.urlencoded({extended:true}))

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

//default page
app.get('/',(req,res)=>{
    res.render('home')  
})


//create user
app.post("/adduser",(req,res)=>{
    
    const user={name:req.body.name,email:req.body.email,city:req.body.city,phone:req.body.phone}
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
        else{
             
             res.render('show',{list:result})
             
        } 
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
app.get("/deleteuser/:email",(req,res)=>{
   
    let sql=`Delete from employee where email ='${req.params.email}'`
    db.query(sql,(err,result)=>{
        if(err) throw err
        else res.redirect("/showuser")
    })
})

//update user
app.get("/updateuser/:email",(req,res)=>{
    console.log("hello");
    let email=req.params.email
    const name=req.body.name
    const phone=req.body.phone
    const city=req.body.city 
    let sql=`update employee SET name ='${name}',phone='${phone}',city='${city}'`
    db.query(sql,(err,result)=>{
        if(err) throw err
        else res.json(result)
    })
})

PORT=3000
app.listen(PORT,() =>console.log(`Server is running at ${PORT}`))




 
