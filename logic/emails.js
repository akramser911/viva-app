const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'hotmail',
  auth :{
    user : 'akramsviva@outlook.com',
    pass : "azerty12"
  }  
});

const options = {
    from : "akramsviva@outlook.com",
    to : "akram.abd.ser@gmail.com",
    subject : "send email with node js",
    text : "wow that is simple"
}

transporter.sendMail(options, function (err, info){
    if(err){
        console.log(err);
        return;
    }
    console.log('Sent : ' +info.response);
})