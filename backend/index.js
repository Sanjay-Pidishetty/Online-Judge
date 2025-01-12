const express = require('express');
const {DBConnection} = require('./database/db.js');
const User = require('./models/User.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

DBConnection();

app.get("/", (req, res) => {
    res.send("welcome to the demo");
});

app.get("/home", (req, res) => {
    res.send("welcome to the home page");
});

app.post("/register",async (req, res) => {
    
    try {
        const {firstName, lastName, email, password} = req.body;

        if(!(firstName && lastName && email && password)){
            return res.status(400).send("please enter all required fields");
        }

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).send("user already exists");
        }

        const hashPassword =await bcrypt.hash(password, 10);
        console.log(hashPassword);

        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashPassword,
        });

        const token = jwt.sign({ id: user._id, email }, process.env.SECRET_KEY, {
            expiresIn: "1d",
        });
        user.token = token;
        user.password = undefined;
        res.status(200).json({ message: "You have successfully registered!", user });

    } catch (error) {
        console.log(error);
    }
});

app.use('/problem', require('./controller/problemRoutes.js'));

app.post("/login", async (req, res) => {
    try {
        //get the user data
        const { email, password } = req.body;

        // check all the data should exists
        if (!(email && password)) {
            return res.status(400).send("Please enter all the information");
        }

        //find the user in the database
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).send("User not found!");
        }

        //match the password
        const enteredPassword = await bcrypt.compare(password, user.password);
        if (!enteredPassword) {
            return res.status(401).send("Password is incorrect");
        }

        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
            expiresIn: "1d",
        });
        user.token = token;
        user.password = undefined;

        //store cookies
        const options = {
            expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
            httpOnly: true, //only manipulate by server not by client/user
        };

        //send the token
        res.status(200).cookie("token", token, options).json({
            message: "You have successfully logged in!",
            success: true,
            token,
        });
    } catch (error) {
        console.log(error.message);
    }
});

app.listen(8000,()=>{
    console.log("server is running on 8000 port");
});