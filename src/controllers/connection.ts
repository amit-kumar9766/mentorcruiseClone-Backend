const Connection = require('../models/connection');
import { Response, Request } from 'express';

const createConnection = async (req: Request, res: Response) => {
    try {
        const {
            menteeId,
            mentorId,
            inviteRequestId,
        } = req.body;
        const connection = new Connection({
            menteeId: menteeId,
            mentorId: mentorId,
            inviteRequestId: inviteRequestId,
        });
        await connection.save();
        res.status(200).json('connection created');
    } catch (err) {
        res.status(500).json('Internal Server Error');
    }
};

const getAllConnectionsByMenteeId = async (req: Request, res: Response) => {
    try {
        const { menteeId } = req.params;
        const data = await Connection.find({ menteeId: menteeId });
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json('Internal Server Error');
    }
};

const getAllConnectionsByMentorId = async (req: Request, res: Response) => {
    try {
        const { mentorId } = req.params;
        const data = await Connection.find({ mentorId: mentorId });
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json('Internal Server Error');
    }
};

export {
    createConnection,
    getAllConnectionsByMenteeId,
    getAllConnectionsByMentorId,
};
