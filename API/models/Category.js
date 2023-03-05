const mongoose = require ('mongoose');
const { stringify } = require('querystring');

const CategorySchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
        }
    },
    {timestamps:true}

);

module.exports = mongoose.model('Category',CategorySchema);