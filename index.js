const express = require("express");
const app = express();
const dotenv = require("dotenv");
const PORT = process.env.PORT || 4000;
const morgan = require("morgan");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("./database/connect");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const userRoutes = require ("./routes/user")

app.use(bodyParser.json());


app.use('/api/users', userRoutes);


app.get('/',(req,res)=>{
    res.status(200).json({'success':"working"})
})

app.listen(PORT, () => {console.log(`Connecting to port ${PORT}...`)});

