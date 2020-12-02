const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

let userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, required: true, unique: true }, // unique:true significa que não podemos ter 2 usuários com o mesmo email
    password: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

// Middleware para transformar a password em um hash. Roda antes de salvar no BD (o next é para passar pro próximo middleware):
userSchema.pre('save', function (next) {
    // Verificar se o password mudou:
    if (this.isNew || this.isModified('password')) {
        // O número 10 é o número de caracteres que serão adicionados à senha para a criptografia da mesma
        bcrypt.hash(this.password, 10,
            (err, hashedPassword) => {
                if (err)
                    next(err);
                else {
                    this.password = hashedPassword;
                    next();
                }
            }
        )
    }
});

module.exports = mongoose.model('User', userSchema);
