const express = require('express')
const fs = require('fs')
const { shortURL } = require('./models/shortURLs.js')

const PORT = 5000;
const app = express()
const shortURLHandle = new shortURL();

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))

console.log('localhost:'+PORT);
app.get('/', async (req, res) => {
    const shorturl_list = await shortURLHandle.readDoc();
    if (shorturl_list){
        res.render('index', {shortURLs: shorturl_list})}
    else{
        res.render('index', {shortURLs: []})}
})

app.post('/shorturls', async (req, res) =>{
    if (req.body.fullUrl != ''){
        var uid = shortURLHandle.addFile(req.body.fullUrl); 
        res.redirect('/');}
    else{
        res.redirect('/');
    }
})

app.post('/removeall', async(req, res) => {
    removeAll();
    return res.redirect('/');
})

app.get('/:shortUrl', async (req, res) => {
    var array = await shortURLHandle.readDoc();
    var absent = true;
    await array.forEach(element => {
        if (element['short'] == req.params.shortUrl){
            absent = false;
            return res.redirect(element['full'])
        }
        else{
            absent = true;
        }
    });
    if (absent){
        absent = true
        return res.sendStatus(404);
        
    }
    })

function removeAll(){
    const tmp = "";
    fs.promises.writeFile('output.json', tmp);
}

app.listen(process.env.PORT || PORT);

