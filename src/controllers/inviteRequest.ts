const Invite = require('../models/inviteRequest');
import { Response, Request } from 'express';

const createInviteRequest = async (req: Request, res: Response) => {
    try {
        const { menteeId, mentorId, message } = req?.body;
        const invite = new Invite({
            menteeId: menteeId,
            mentorId: mentorId,
            message: message,
        });
        await invite.save();
        res.status(200).json('connection created');
    } catch (err) {
        res.status(500).json('Internal Server Error');
    }
};

const getAllInviteRequestByMentorId = async (req: Request, res: Response) => {
    try {
        const { mentorId } = req?.params;
        const data = await Invite.find({ mentorId: mentorId });
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json('Internal Server Error');
    }
};

export { createInviteRequest, getAllInviteRequestByMentorId };

//sending mail or notification if the application is rejected
