const fs = require('fs');
const path = require('path');
const {exec} = require('child_process');

const outputPath = path.join(__dirname,'outputs');

if(!fs.existsSync(outputPath)){
    fs.mkdirSync(outputPath,{recursive: true});
}

const executeJava = async(filePath) => {
    //const JavaFile = path.basename(filePath).split(".")[0];
    const outputFileName = 'Main.class';
    const classFilePath = path.join(outputPath,outputFileName);

    return new Promise((resolve, reject) => {
        exec(`cd ${filePath} && javac Main.java && java Main`,
            (error,stdout,stderr) => {
                if(error){
                    reject(new Error(`error executing the code: ${error}`));
                }
                if(stderr){
                    reject(new Error(`error executing the code: ${stderr}`));
                }
                resolve(stdout);
            })
    });
};

module.exports = {
    executeJava,
};