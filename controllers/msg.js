const Msg = require('../models/msg');

const sendmessage = async (req,res,next) => {

    const msg = req.body.msg;
    const username = req.user.name;
    const userId = req.user.id ;

    try {

        await Msg.create({msg : msg , username : username, userId : userId})

        res.status(200).json({message : "message sent "});
    }
    catch(err) {
        res.status(404).json({message : "error in sending message"});
    }

}

module.exports = {
    sendmessage
}