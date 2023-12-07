const express = require('express');

const app = express();

var cors = require('cors');

app.use(cors(
    {
        origin : "*",
        methods : ["GET","POST","DELETE"]
    }
));

const User = require('./models/user');
const Msg = require('./models/msg');


const sequelize = require('./util/database');

const bodyParser = require('body-parser');

const userRouter = require('./routes/user');

const userMsg = require('./routes/msg')


app.use(bodyParser.json({extended : false}));


app.use(userRouter);
app.use(userMsg);

User.hasMany(Msg)
Msg.belongsTo(User);

sequelize.sync()
.then(result => {
    //console.log(result);
    app.listen(3000);
})
.catch(err => {
    console.log(err);
});