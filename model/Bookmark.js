const mongoose = require('mongoose');


const bookmarkSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'User', // Reference the User model
            required: true,
        },
        title: { type: String, required: true },
        description: {type: String },
        url: { type: String, required: true },
    },
    {
        timestamps: true, // Automatically add createdAt and updatedAt fields
    }
);

module.exports = mongoose.model('Bookmark', bookmarkSchema);
