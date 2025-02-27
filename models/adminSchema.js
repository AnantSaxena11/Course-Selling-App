const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true }
})

const adminModel = mongoose.model('admin', adminSchema);

module.exports = {
    adminModel: adminModel
}
