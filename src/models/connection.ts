import mongoose from 'mongoose';
const { Schema } = mongoose;

//conversation thread Id will be created here
const connectionSchema = new Schema(
    {
        menteeId: {
            type: String,
            required: true,
        },
        mentorId: {
            type: String,
            required: true,
        },
        inviteRequestId: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Connection', connectionSchema);

//connection { mentorId, menteeId, conversationThreadId,createdAt,updatedAt,statyus,inviteRequestId}
//or inviteRequest-->connectionId
//conversationThread { threadId, messageid, senderId, recepientId, messageType, message,createdAt,updatedAt,statyus}

