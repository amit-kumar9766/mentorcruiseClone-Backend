import mongoose from 'mongoose';
const { Schema } = mongoose;

const inviteRequest = new Schema(
    {
        menteeId: {
            type: String,
            required: true,
        },
        mentorId: {
            type: String,
            required: true,
        },
        menteeMessage: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Invite', inviteRequest);
