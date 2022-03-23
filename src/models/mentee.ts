import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const menteeSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Mentee', menteeSchema);
