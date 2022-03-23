//----->TODO  still <-----//

var expect = require('chai').expect;
//var Camo = require('camo');
//import Mentor from '../models/mentor';
const Mentee = require('../models/mentee');
const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
//const config = require('../config');
//const env = process.env.NODE_ENV || 'development';

describe('api/users', () => {
    before(async () => {
        // before each test delete all users table data
        await Mentee.deleteMany({});
    });

    after(async () => {
        mongoose.disconnect();
    });

    describe('POST /', () => {
        it('should return Mentee when the all request body is valid', async () => {
            const res = await request(app).post('/api/Mentees').send({
                name: 'esteve',
                email: 'esteve@gmail.com',
                password: 'Amit@123',
            });
            const data = res.body;
            expect(res.status).to.equal(200);
            expect(data).to.have.property('_id');
            expect(data).to.have.property('name', 'esteve');
            expect(data).to.have.property('email', 'esteve@gmail.com');
            //expect(data).to.have.property('country', 'spain');
            expect(data.name).to.have.length.within(3, 50);
            expect(data.email).to.have.length.within(5, 255);

            const mentee = await Mentee.findOne({ email: 'esteve@gmail.com' });
            expect(mentee.name).to.equal('esteve');
            expect(mentee.email).to.equal('esteve@gmail.com');
        });
    });
});
