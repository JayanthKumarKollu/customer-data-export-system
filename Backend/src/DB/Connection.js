const mongooes = require("mongoose")

const connectToDB = (url)=>{
    return mongooes.connect(url)
}

module.exports= connectToDB;