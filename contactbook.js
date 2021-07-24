const express = require('express')
const router = express('Router')
const db = require('./db')
const utils = require('./utils')


router.post('/addcontact',(request,response)=>{

    const {fname,mname,lname,email,phone,alterphone,address}=request.body
    const statement = `insert into contactbook(fname,mname,lname,email,phone,alterphone,address) values('${fname}','${mname}','${lname}','${email}','${phone}','${alterphone}','${address}')`
    db.execute(statement,(error,data)=>{
        response.send(utils.errordata(error,data));
 
    })
})


router.get('/getcontact',(request,response)=>{
    
   
    const statement = `select * from contactbook`
    db.execute(statement,(error,data)=>{
        response.send(utils.errordata(error,data));
    })

})

module.exports = router