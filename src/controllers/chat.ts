const Chat = require('../models/chat');
import formidable from 'formidable';
import { uploadFile } from '../serviceAccessors';
const { v4: uuidv4 } = require('uuid');
import { Response, Request } from 'express';

const createChatMessage = async (req: Request, res: Response) => {
    try {
        const form = new formidable.IncomingForm({ multiples: true });
        form.parse(req, async (err, fields, files) => {
            if (err) {
                return res.status(400);
            }
            const {
                messageType,
                conversationthreadId,
                status,
                senderId,
                receipentId,
            } = fields;
            const { message }: any = files;
            //console.log('image path', files);
            if (!message) {
                res.status(401).json('No  message');
            }
            let changedMsg;
            const url = await uploadFile(uuidv4(), message?.filepath);
            if (url) {
                changedMsg = url;
            }
            const chatMessage = new Chat({
                conversationthreadId: conversationthreadId,
                senderId: senderId,
                receipentId: receipentId,
                messageType: messageType,
                message: changedMsg,
                status: status,
            });

            await chatMessage.save();
            res.status(200).json('new message created');
        });
    } catch (err) {
        console.log(err);
        res.status(500).json('Internal Server Error');
    }
};
const getMessagesByThreadId = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const data = await Chat.find({ threadId: id });
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json('Internal Server Error');
    }
};

export { createChatMessage, getMessagesByThreadId };

//sendMessage  -->post
//updateMessage
//deleteMessage
//getAllMessages (by menteeId or mentorId)




// exports.addMesssage = async (req, res) => {
//   try {
//     const form = new formidable.IncomingForm({ multiples: true });
//     form.parse(req, async (err, fields, files) => {
//       if (err) {
//         return res.status(400);
//       }

//       const { text, isAnonymous } = fields;
//       const { image, video, audio } = files;
//       //console.log("image path", image.filepath,image.fileName);
//       const url = await uploadFile("11", image.filepath);
//       res.send(`File uploaded at ${url}`);
//     });
//   } catch (e) {
//     console.log("I am here in error");
//     res.status(400).send("error");
//   }
// };
