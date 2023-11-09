const mongoose = require('mongoose');

const Schema = mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            default: null,
        },
        password: {
            type: String,
            required: false,
            default: null,
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("user", Schema)