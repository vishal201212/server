const express = require('express')
const router = express('Router')
const db = require('./db')
const utils = require('./utils')


router.post('/addfeedback',(request,response)=>{

    const {name,email,feedback}=request.body
    const statement = `insert into feedback(fname,email,feedback) values('${name}','${email}','${feedback}')`
    db.execute(statement,(error,data)=>{
        response.send(utils.errordata(error,data));
 
    })
})


router.get('/getfeedback',(request,response)=>{
    
   
    const statement = `select * from feedback`
    db.execute(statement,(error,data)=>{
        response.send(utils.errordata(error,data));
    })

})

module.exports = router