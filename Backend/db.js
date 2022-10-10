
const mongoose = require('mongoose')
const mongooseUrl = 'mongodb://localhost:27017/aakash?directConnection=true'
const connectToMongo=()=>{
    mongoose.connect(mongooseUrl,()=>{
        console.log("connect to mongoose successfully");
    })
}
module.exports = connectToMongo