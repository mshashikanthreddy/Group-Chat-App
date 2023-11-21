const User = require('../models/signup');

const bcrypt = require('bcrypt');

function isValid(str) {

    if(str.length < 0 || str.length === undefined)
    {
        return true;
    }
    else
    {
        return false;
    }
}

const signUp = async (req,res,next) => {

    const name = req.body.name;
    const email = req.body.email;
    const phoneNumber = req.body.phoneNumber;
    const password = req.body.password;

    try {

        if(isValid(name) || isValid(email) || isValid(password) || isValid(phoneNumber))
        {
           return res.status(400).json({message : 'please enter valid parameters'});
        }

        const response = await User.findAll( {where : {email : email}});

        if(response.length > 0)
        {
             return res.status(401).json({message: 'User credentials already exists'});
        }

        const saltrounds = 10 ;
            bcrypt.hash ( password , saltrounds , async (err , hash) => {
               console.log(err)
            await User.create({name : name , email : email , phoneNumber : phoneNumber, password : hash})
            res.status(201).json({message : 'Account created successfully'});
        })
    }catch(err) {
        res.status(400).json(err);
    }

}




module.exports = {

    signUp,
}
