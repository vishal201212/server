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
    
   
    const statement = `select id,email,blog,title,DATE_FORMAT(date,'%y-%m-%d') AS date from blog;`
    db.execute(statement,(error,data)=>{
        response.send(utils.errordata(error,data));
    })
})


router.post('/deleteblog',(request,response)=>{
    
    const {id}=request.body
    const statement = `delete from blog where id='${id}'`
    db.execute(statement,(error,data)=>{
        response.send(utils.errordata(error,data));
    })

})


router.patch('/updateblog',(request,response)=>{
    
    const {id,blog}=request.body
    const statement = `update blog set blog='${blog}' where id='${id}'`
    db.execute(statement,(error,data)=>{
        response.send(utils.errordata(error,data));
    })

})
module.exports = router