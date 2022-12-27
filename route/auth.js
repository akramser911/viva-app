const router = require('express').Router();
const User = require("../model/user");
//const bcrypt = require('bcrypt');

//registration

router.post("/register", async(req, res)=> {
    
    try {
        const newUser = new User({
            //username : req.body.username,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password:req.body.password
        });
        
        const userT = await User.findOne({email:req.body.email});
        if(userT?.email == req.body.email){
            return res.status(404).json({error :'email already existed'});
        }
        


        //saveU
        const user = await newUser.save();
        res.status(200).json(user);
    }catch(err){
        res.status(500).json(err)
    }
});

//login

router.post('/login', async(req, res)=>{
    try {
        const user = await User.findOne({email:req.body.email});
        if(!user){
            return res.status(404).json({error :'user email not found'});
        }  

        if(req.body.password !=user.password)
            {
                return res.status(404).json({error : "wrong password"})
            }

        res.status(200).json({id : user._id});
    }catch(err){
        res.status(500).json(err);
    }
})

module.exports = router;


        /*
        const userT = await User.findOne({email:req.body.email});
        if(userT.email == req.body.email){
            return res.status(404).json({error :'email already existed'});
        }
        */