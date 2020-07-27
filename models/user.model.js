const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        max: 65
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        max: 65,
        validator: value => {
            if (!validator.isEmail(value)) {
                throw new Error({ error: 'Invalid Email address'  });
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8
    },
    provider: {
        type: String,
        required: true,
        trim: true
    },
    sid: {
        type: String,
        required: true,
        trim: true
    }
});

module.exports = mongoose.model('User', userSchema);
