const express = require('express');
const router = express.Router();
const { generateJavaFile } = require('./generateJavaFile');
const { generateCppFile } = require('./generateCppFile');
const {executeJava} = require('./executeJava');
const { executeCpp } = require('./executeCpp');
const Problem = require('../models/Problem.js');

router.get("/problemList",async (req,res) => {
    try {
        const problemList = await Problem.find();
        return res.status(200).json({problemList});
    } catch (error) {
        
    }
});

router.get("/:id",async (req,res) => {
    try {
        const problemData = await Problem.findById(req.params.id);
        return res.status(200).json(problemData);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});

router.post("/addProblem",async (req, res) => {
    try {
        const {name, category, description, difficulty} = req.body;
        if(!(name && category && difficulty && description)){
            return res.status(400).send("please enter all required fields");
        }

        const problem = await Problem.create({
            name,
            category,
            description,
            difficulty,
        });

        res.status(200).json({message:"you have added problem successfully!", problem});
    } catch (error) {
        console.log(error);
    }
});

router.delete("/deleteProblem/:id", async (req, res) => {
    try {
        const id = req.params.id;
        if(!id){
            return res.status(400).send("please enter proper id");
        }

        await Problem.findByIdAndDelete(id);
        return res.status(200).json({message:"problem delete successfully!"});
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});

router.post("/run", async (req, res) => {
    const {language = "java", code}=req.body;
    if(code === undefined || !code){
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

router.post("/submit/:id", async (req, res) => {
    try {
        
    } catch (error) {
        
    }
});

module.exports = router;