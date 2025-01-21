const mongoose = require('mongoose');

const purchaseSchema = mongoose.Schema({
    courseId: { type: mongoose.Types.ObjectId, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true }
})

const purchaseModel = mongoose.model('purchase', purchaseSchema);

module.exports = {
    purchaseModel : purchaseModel
}