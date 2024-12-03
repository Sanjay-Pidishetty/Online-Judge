const fs = require('fs');
const path = require('path');
const {v4: uuid} = require('uuid');

const dirCodes = path.join(__dirname,'codes');

if(!fs.existsSync(dirCodes)){
    fs.mkdirSync(dirCodes,{recursive: true});
}

const generateJavaFile = async (language, code) => {
    const filePath = path.join(dirCodes,"Main.java");
    await fs.writeFileSync(filePath,code);
    return dirCodes;
};

module.exports = {
    generateJavaFile,
};
