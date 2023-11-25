const User = require('../models/user');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

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


const generateToken = (id,name)=> 
{  

    return jwt.sign({userId  : id,name : name}, 'secretkey');
}

const login = async (req,res,next) => {

    const email = req.body.email ;
    const password = req.body.password;

    try{

        const response = await User.findAll({where : {email : email}})

        if(response.length > 0)
        {
            bcrypt.compare(password,response[0].password, (err , result) => {

                if(err)
                {
                    console.log(err);
                }
                else if(result === true) 
                {
                    
                    return res.status(200).json({message : 'successfully logged in' , success : true, token : generateToken(response[0].id,response[0].name)});
                }
                else
                {
                    return res.status(401).json({message : 'User Not Authorized'});
                }
            })
        }
            else
            {
               return res.status(404).json({message : "User doesn't exists"})
            }
    }
    catch(err) {
        res.status(500).json(err);
    }
}



module.exports = {

    signUp,
    login,
    generateToken
}
