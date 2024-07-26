const fs = require('fs');
const { stringify } = require('querystring');
const shortid = require('shortid');


class shortURL{
    constructor() {
        this.url_list = []; 
    }
    async readDoc() {
        try {
            const data = await fs.promises.readFile('output.json', 'utf8');
            if (data){
            const parsedJSON = JSON.parse(data);
            this.url_list = parsedJSON;
            return parsedJSON
        }
        } 
        catch (err) {
            return NaN;
        }
    }
    

    async addFile(fullURL){
        const tmp_url = await this.readDoc();
        const tmp_value = this.generateList(fullURL); 
        this.url_list.push(tmp_value)
        const tmpJSON = JSON.stringify(this.url_list);
        try{
        await fs.promises.writeFile("output.json", tmpJSON);}
        catch (err){
            console.error(err);
        }
        return tmp_value['short'];
    } 
    
    generateList(full){
        var uid = shortid.generate();
        return {"full":full, "short":uid, "clicks":0}
    }


}

module.exports = {shortURL}