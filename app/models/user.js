const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, required: true, unique: true }, // unique:true significa que não podemos ter 2 usuários com o mesmo email
    password: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
