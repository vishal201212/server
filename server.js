const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors('*'))
const routerUser = require('./user')
const routerContact = require('./contactbook')
const bodyparser = require('body-parser')
const jwt = require('jsonwebtoken')
const config = require('./secret')

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))


app.use((request,response,next)=>{

if(request.url == '/signup'||
request.url == '/signin'||
request.url == '/getuser'||
request.url == '/confirm'||
request.url == '/getcontact' ||
request.url == '/addcontact')
{
    next()
}

else{
    const token = request.headers['token']

    try{
   const data = jwt.verify(token,config.secret)
   request.userId = data['id']
   next()
}catch(ex){
    response.send({
        status: 'error',
        error:'Unauthorised Access'
    })
}
}

    
 })



app.use(routerUser);
app.use(routerContact);




app.listen(2021,'0.0.0.0',()=>{
    console.log('Server started at port 2021,...!')
})