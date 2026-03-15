const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    spotifyId: {
        type: String,
        required: true,
        unique: true,
    },
    displayName: {
        type: String,
    },
    email: {
        type: String,
    },
    accessToken: {
        type: String,
        required: true,
    },
    refreshToken: {
        type: String,
        required: true,
    },
    tokenExpiresAt: {
        type: Date,
    },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);