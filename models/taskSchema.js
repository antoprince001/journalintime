
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

const taskSchema = new mongoose.Schema({
    
            task : {
                type : String,
                required : true
            },
            date : {
                type : String
            }
            
    },
    {
        collection: 'taskDetails',
        unique: 'true'
    });
    
module.exports = mongoose.model('Task',taskSchema);
