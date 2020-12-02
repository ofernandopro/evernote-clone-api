const mongoose = require('mongoose');

let noteSchema = new mongoose.Schema({
    title: String,
    body: String,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    // Relações: (toda nota tem o id do usuário)
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true // Toda nota precisa ter um usuário associado
    }
})

module.exports = mongoose.model('Note', noteSchema);
