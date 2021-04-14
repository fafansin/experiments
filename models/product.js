const mongoose  = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required:true,
        min: 0
    },
    categories: {
        type:String,
        lowercase:true,
        enum: ['fruit', 'vegetables', 'dairy']
    }
})

module.exports = mongoose.model('Product', productSchema);