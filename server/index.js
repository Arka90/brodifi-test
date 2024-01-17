const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');
const authRoute = require('./routes/authRoute');
const app = express();

app.use(bodyParser())

const conntectToDB = async()=>{
    try{

        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to db")

    }catch(error){
        console.log(error)
    }

}

conntectToDB();

app.use("/auth" , authRoute)

const port = process.env.PORT;



app.listen(port, ()=>{
    console.log(`Server Runnning on port ${port}`)
});