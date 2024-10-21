const mongoose = require('mongoose');

const nodeSchema = new mongoose.Schema({
    type: { 
        type: String, 
        required: true 
    },
    left: { 
        type: mongoose.Schema.Types.Mixed, 
        default: null 
    },
    right: { 
        type: mongoose.Schema.Types.Mixed, 
        default: null 
    },
    value: { 
        type: mongoose.Schema.Types.Mixed, 
        default: null 
    }
});

module.exports = mongoose.model('Node', nodeSchema);