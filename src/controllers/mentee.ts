const Mentee = require('../models/mentee');
import { createJWT } from '../utils';
import bcrypt from 'bcrypt';
import { Response, Request } from 'express';

const registerMentee = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;
        const emailExist = await Mentee.findOne({ email: req?.body?.email });
        if (emailExist) {
            return res.status(400).json('User already exits');
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        console.log('hash', hashedPassword);
        const mentee = new Mentee({
            name: name,
            email: email,
            password: hashedPassword,
        });
        await mentee.save();
        res.status(200).json('mentee created');
    } catch (err) {
        res.status(500).json('Internal Server Error');
    }
};

const loginMentee = async (req: Request, res: Response) => {
    try {
        //check if user exists in database:
        const { email, password } = req.body;
        let user = await Mentee.findOne({ email: email });
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

const getMentees = async (req: Request, res: Response) => {
    try {
        const data = await Mentee.find();
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
    }
};

export { registerMentee, getMentees, loginMentee };
// exports.updateMentee = async (req, res) => {
//   const { userParam, id } = req.data
//   const user = await User.findById(id)

//   // validate
//   if (!user) throw 'User not found'
//   if (
//     user.username !== userParam.username &&
//     (await User.findOne({ username: userParam.username }))
//   ) {
//     throw 'Username "' + userParam.username + '" is already taken'
//   }

//   // hash password if it was entered
//   if (userParam.password) {
//     userParam.hash = bcrypt.hashSync(userParam.password, 10)
//   }

//   // copy userParam properties to user
//   Object.assign(user, userParam)

//   await user.save()
// }

//create Mentee
//delete Mentee
//update Mentee
//getOneMentee
//get All Mentees
