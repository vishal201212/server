const express = require('express')
const router = express('Router')
const db = require('./db')
const utils = require('./utils')


router.post('/addblog',(request,response)=>{

    const {email,blog,title}=request.body
    const statement = `insert into blog(email,blog,title) values('${email}','${blog}','${title}')`
    db.execute(statement,(error,data)=>{
        response.send(utils.errordata(error,data));
 
    })
})


router.get('/getblog',(request,response)=>{
    
   
    const statement = `select * from blog`
    db.execute(statement,(error,data)=>{
        response.send(utils.errordata(error,data));
    })

})

module.exports = router