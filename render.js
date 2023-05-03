const fs = require('fs')

function mergeValues(values, content){
    for(const key in values){
        content = content.replace("{{" + key + "}}", values[key])
    }
    return content
}

function view(templatePath, values, res){
    let fileContent = fs.readFileSync(templatePath, 'utf8')
    fileContent = mergeValues(values, fileContent)
    res.write(fileContent)
}

module.exports.view = view