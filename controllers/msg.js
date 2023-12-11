const Msg = require('../models/msg');

const {Op} = require('sequelize'); // Op is the sequelize operators by which we can use the sequelize operations very easily.

const sendmessage = async (req,res,next) => {

    const msg = req.body.msg;
    const username = req.user.name;
    const userId = req.user.id ;

    try {

       const details = await Msg.create({msg : msg , username : username, userId : userId})

       

        res.status(200).json(details);
    }
    catch(err) {
        res.status(404).json({message : "error in sending message"});
    }

}

const getmessage = async (req,res,next) => {

    const lastmsgid = req.query.lastmsgid ;
    console.log(lastmsgid);

    try{
    const response = await Msg.findAll({
        where : {
            msgId : {
                [Op.gt] : lastmsgid    // the "gt" means 'greater than' the number.
            },
        }
    });

    res.status(201).json(response);
    }
    catch(err) {
        res.status(500).json({ success: false, message: "Failed to retrieve the chat messages" });
  }
    }


module.exports = {
    sendmessage,
    getmessage
}