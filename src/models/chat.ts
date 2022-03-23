import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const chatSchema = new Schema(
    {
        conversationthreadId: {
            type: mongoose.SchemaTypes.ObjectId,
            required: true,
        },
        senderId: {
            type: mongoose.SchemaTypes.ObjectId,
            required: true,
        },
        receipentId: {
            type: mongoose.SchemaTypes.ObjectId,
            required: true,
        },
        messageType: {
            type: String,
            enum: ['video', 'Text', 'Image', 'gif'],
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ['connected', 'chatting', 'quick-chats'],
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Chat', chatSchema);



//usecases -->  create a chat thread betweeb two users  ,
//should be able to send chat to the other user ans vice versa
//typeof message-->text,video,gif,audio,image
//sortedby time
//last7days messages(upto a certain offset)
//end the chat

//delete etc later)
//conversationThread { threadId, messageid, senderId, recepientId, messageType, message,createdAt,updatedAt,status}
