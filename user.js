const express = require('express')
const router = express('Router')
const db = require('./db')
const utils = require('./utils')
const crypto = require('crypto-js')
const mailer = require('./nodemailer')
const jwt = require('jsonwebtoken')
const config = require('./secret')


router.post('/signup',(request,response)=>{

    const {firstname,lastname,email,phone,addres,password,status}=request.body
    const encryptpassword = '' + crypto.SHA256(password)
    const statement = `insert into user(firstname,lastname,email,phone,addres,password,status) values('${firstname}','${lastname}','${email}','${phone}','${addres}','${encryptpassword}','${0}')`
    db.execute(statement,(error,data)=>{
        response.send(utils.errordata(error,data));

        mailer.senEmail('confirm_account.html','Account Confirmation',email,(error,info )=>{
        })

    })
})
router.get('/getuser',(request,response)=>{
    
   
    const statement = `select * from user`
    db.execute(statement,(error,data)=>{
        response.send(utils.errordata(error,data));
    })

})


router.patch('/confirm',(request,response)=>{
    
    const{email}= request.body
    const statement = `update user set status=1 where email = '${email }'`
    db.execute(statement,(error,data)=>{
        response.send(utils.errordata(error,data));
        mailer.senEmail('confirmsuccess.html','Welcome to Cypher',email,(error,info )=>{

        })
    })

})


router.get('/viewuser/',(request,response)=>{
    
    console.log(request.userId)
    const statement = `select * from user where id = '${request.userId }'`
    db.execute(statement,(error,data)=>{
        response.send(utils.errordata(error,data));
    })

})

router.post('/signin',(request,response)=>{
    
    const{email,password}=request.body
    const encryptpassword = '' + crypto.SHA256(password)

    const statement = `select * from user where email='${email}' and password='${encryptpassword}'`

    db.execute(statement,(error,users)=>{
        const result={
            status:'',
        }
        if(error != null){
            result['status']= 'error'
            result['error']=error
        }
        else{
            if(users.length == 0){
                result['status']='error'
                result['status']='user does not exitsts'
             }
             else{
               
                 const user = users[0]
                 if(user['status']==0){
                    result['status']='error'
                    result['status']='You have not verified your account'
                 }else if(users['status']==2){
                    result['status']='error'
                    result['error'] = 'your account is suspended. please contact administrator'
                }
                else{
                 const token = jwt.sign({id: user['id']},config.secret)
                 result['status'] = 'success'
                 result['data']={
                     token:token,
                     firstname:user['firstname'],
                     lastname:user['lastname'],
                     email:user['email'],
                     phone:user['phone'],
                     addres:user['addres']
                 }
                }
             }
             response.send(result)
        }
    })

})








module.exports = router