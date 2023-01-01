const { json } = require("body-parser");
const User = require("../model/user");

module.exports = {
    getUser : async (req, res, next)=>{
        const users = await User.find({_id : req.params.id});
        res.json({
            result : users.map(res =>{
                return {
                    firstName : res.firstName,
                    lastName : res.lastName,
                    email : res.email
                }
            })
        })
    },

}