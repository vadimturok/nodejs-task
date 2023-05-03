const express = require('express')
const path = require('path')
const fs = require('fs')
const render = require('./render')
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})



const app = express()
app.use(express.static(path.join(__dirname, 'public')))

let templatePath = ''
let dataPath = ''


app.get('/', (req, res) => {
    if(templatePath && dataPath && fs.existsSync(templatePath) && fs.existsSync(dataPath)){
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if(err){
                res.status(404).send('Invalid data')
            }else{
                const parsedData = JSON.parse(data)
                render.view(templatePath, parsedData, res)
                res.end()
            }
        })
    }else{
        res.status(404).send('Template or data not found')
    }
})

app.listen(3000, () => {
    readline.question('Enter template path ex:(./views/home.html): ', file => {
        readline.question('Enter data path ex:(data.json): ', data => {
            templatePath = file
            dataPath = data
            readline.close()
        })
    })
})