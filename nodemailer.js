var nodemailer = require('nodemailer');
const fs = require('fs')
function senEmail (templete,subject,email,callback ){
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'official.cyphertext@gmail.com',
            pass: 'mumma1009'
        }
    });
    
    const content= fs.readFileSync('./email_templetes/'+templete)
    const mailOptions = {
        from: 'official.cyphertext@gmail.com', // sender address
        to: email, // list of receivers
        subject: subject, // Subject line
        html: content

    };
    console.log(email);
    console.log(subject);
    console.log(email);


    transporter.sendMail(mailOptions, function (error, info) {
       callback(error,info)
    })
    
   
}
module.exports={
    senEmail:senEmail
}
