import { createJWT } from '../utils';
import Mentor from '../models/mentor';
const bcrypt = require('bcrypt');
import { Response, Request } from 'express';

const registerMentor = async (req: Request, res: Response) => {
    try {
        const { name, email, password, skills, status } = req.body;
        const emailExist = await Mentor.findOne({ email: req?.body?.email });
        if (emailExist) {
            return res.status(400).json('Email already exits');
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const mentee = new Mentor({
            name: name,
            email: email,
            password: hashedPassword,
            skills: skills,
            status: status,
        });
        await mentee.save();
        res.status(200).json('mentor created');
    } catch (err) {
        res.status(500).json('Internal Server Error');
    }
};

const loginMentor = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        //check if user exists in database:
        let user = await Mentor.findOne({ email: email });
        //send error if no user found:
        if (!user) {
            return res.status(404).json({ error: 'No user found!' });
        } else {
            //check if password is valid:
            let valid = await bcrypt.compare(password, user.password);
            if (valid) {
                let access_token = createJWT(user.email, user._id, 3600);
                res.status(200).json({ token: access_token });
            } else {
                //send error if password is invalid
                return res.status(401).json({ error: 'Invalid password!' });
            }
        }
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error!' });
    }
};

const getMentors = async (req: Request, res: Response) => {
    try {
        const data = await Mentor.find();
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json('Internal Server Error');
    }
};

export { getMentors, loginMentor, registerMentor };

// exports.createMentor = async (req, res) => {
//   try {
//     const { name, email, skills, status } = req.body;
//     if (!name) {
//       res.status(401).send("No user found");
//     }
//     const mentor = new Mentor({
//       name: name,
//       email: email,
//       skills: skills,
//       status: status,
//     });
//     await mentor.save();
//     res.status(200).json("mentor created");
//   } catch (err) {
//     res.status(500).json("Internal Server Error");
//   }
// };

//create Mentor
//delete Mentor
//update Mentor
//get All Mentors
//api handlers ->input
