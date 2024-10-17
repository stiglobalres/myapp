class readTextFileSync {

    constructor(pathFile) {
        this.fs = require('fs');
        this.pathFile = pathFile
        this.contents = null;
        this.encoding = 'utf-8'
    }

    isFileExist() {
      return  (this.fs.existsSync(this.pathFile)) ? true : false;
    }

    readFile() {
        const data = this.fs.readFileSync(this.pathFile, this.encoding);
        this.contents = data.toString();
        return this.contents;
    }
  
}

module.exports = readTextFileSync