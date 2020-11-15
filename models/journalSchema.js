
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

const journalSchema = new mongoose.Schema({
    
            journalTitle : {
                type : String,
                required : true
            },
            journalDesc : {
                type: String,
                required: true,
            },
            dateOfEntry :{
                type: String,
                required : true
            },
            
    },
    {
        collection: 'journalDetails',
        unique: 'true'
    });
    
module.exports = mongoose.model('Journal',journalSchema);
