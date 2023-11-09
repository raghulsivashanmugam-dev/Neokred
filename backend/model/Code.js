const mongoose = require('mongoose');

const Schema = mongoose.Schema(
    {
        code: {
            type: String,
            required: true,
            default: null,
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("code", Schema)