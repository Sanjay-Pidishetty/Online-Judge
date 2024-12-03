const express = require('express');
const { generateJavaFile } = require('./generateJavaFile');
const { generateCppFile } = require('./generateCppFile');
const {executeJava} = require('./executeJava');
const { executeCpp } = require('./executeCpp');
const app = express();
const cors  = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.get("/",(req,res) => {
    res.send("Welcome to online judge");
});

app.post("/run",async (req,res) => {
    const {language = "java", code}=req.body;
    if(code === undefined){
        return res.status(400).json({error: "No code is provided."});
    }
    try {
        var filePath = null;
        var output = null;
        if(language === 'cpp'){
            filePath = await generateCppFile(language, code);
            output = await executeCpp(filePath);
        }
        if(language === 'java'){
            filePath = await generateJavaFile(language, code);
            output = await executeJava(filePath);
        }
        res.json({output});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

app.listen(7000,() =>{
    console.log("server is running on port:7000");
});