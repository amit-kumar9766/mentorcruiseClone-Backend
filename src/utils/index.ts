import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

//Request & { user: string }
type AuthorizedRequest = any;

const createJWT = (email: string, userId: string, duration: number) => {
    const payload = {
        email,
        userId,
        duration,
    };
    return jwt.sign(payload, process.env.TOKEN_SECRET as string, {
        expiresIn: duration,
    });
};

const userRequired = (req: AuthorizedRequest, res: Response, next: NextFunction) => {
    const token = req.headers['authorization'];
    if (!token) res.status(403).json({ error: 'please provide a token' });
    else {
        jwt.verify(
            token.split(' ')[1],
            process.env.TOKEN_SECRET as string,
            (err: any, value: any) => {
                if (err)
                    res.status(500).json({
                        error: err,
                    });
                req.user = value?.data;
                next();
            }
        );
    }
};

export { createJWT, userRequired };
