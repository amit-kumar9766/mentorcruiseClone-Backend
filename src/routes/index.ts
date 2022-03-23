import { userRequired } from '../utils';

import express from 'express';
const router = express.Router();
import { registerMentor, getMentors } from '../controllers/mentor';
import { registerMentee, getMentees, loginMentee } from '../controllers/mentee';

import { createConnection } from '../controllers/connection';

import {
    createInviteRequest,
    getAllInviteRequestByMentorId,
} from '../controllers/inviteRequest';

import { createChatMessage, getMessagesByThreadId } from '../controllers/chat';

//mentor
router.post('/registerMentor', registerMentor);
router.get('/mentors', getMentors);

//mentee
router.post('/registerMentee', registerMentee);
router.post('/loginMentee', loginMentee);
router.get('/mentees', userRequired, getMentees);

//invite
router.get('/inviteRequest/:id', getAllInviteRequestByMentorId);
router.post('/inviteRequest', userRequired, createInviteRequest);

//connection
router.post('/createConnection', userRequired, createConnection);

//chat
router.post('/chatMessage', createChatMessage);
//router.post("/addMessage", addMesssage);
router.get(`/chatMessage/:id`, getMessagesByThreadId);

export default router;
