import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const mentorSchema = new Schema(
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
        skills: {
            type: [],
            required: true,
        },
        status: {
            type: String,
            enum: ['Onboarding', 'Favourites', 'New'],
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Mentor = mongoose.model('Mentor', mentorSchema);
export default Mentor;
