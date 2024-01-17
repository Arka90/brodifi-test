const Session = require("../models/sessions");
const User = require("../models/user");
const bcrypt = require('bcryptjs');


module.exports.registerUser = async function(req,res){

    try{
        if(!req?.body?.userName || !req?.body?.password){
            return res.json({
                status:"failed",
                message:"Please provide username and password"
            })
        }

        let user = await User.findOne({userName:req.body.userName});
        


        if(user){
            return res.json({
                status:"failed",
                message:"User already exists"
            })
        }

        const hashedPassword = await bcrypt.hash(req.body.password , 12)
        user =await User.create({userName:req.body.userName , password:hashedPassword});

        return res.json({
            status:"Success",
            user
        })

    }catch(error){
        return res.json({
            error:error.message,
            status:"failed",
            message:"Internal Server error"
        })
    }



}

module.exports.loginUser = async(req,res)=>{
    try{

        if(!req?.body?.userName || !req?.body?.password){
            return res.json({
                status:"failed",
                message:"Please provide username and password"
            })
        }

        let user = await User.findOne({userName:req.body.userName});
        


        if(!user){
            return res.json({
                status:"failed",
                message:"No User found please login"
            })
        }

        const passwordMatched = await bcrypt.compare(req.body.password,user.password);

        if(!passwordMatched){
            return res.json({
                status:"failed",
                message:"Incorrect password"
            })
        }

        // logic for login user
        // - if no user logged in
            const sessions = Session.find({})
            let currentTime = new Date();
            currentTime = currentTime.getTime();
            const logoutTime = currentTime + 60000*5;
            next();
            if(!sessions){
                const sessions = Session.create({
                    user:user._id,
                    priority:0,
                    logoutTime:logoutTime

                })

                return res.json({
                    status:"success",
                    message:"Logged in",
                    sessions
                })
            }
        
        // -if user already logged in
           // - just return logged in message

           // - 





    }catch(error){
        return res.json({
            error:error.message,
            status:"failed from",
            message:"Internal Server error"
        })
    }
}