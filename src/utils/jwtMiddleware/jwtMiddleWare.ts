import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

interface UserPayload {
    _id: string;
    email: string;
}

declare global {
    namespace Express {
        interface Request {
            user?: UserPayload;
        }
    }
}

export const jwtMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    let token =req.headers['authorization'] && req.headers['authorization'].split(' ')[1]
    console.log('bearer token',token);
    
    if(token){
        res.cookie('jwtToken', token, {
            httpOnly: true,
            sameSite: "none",
            secure: true,
        });
    }
    const jwtToken = req.cookies.jwtToken || (req.headers['authorization'] && req.headers['authorization'].split(' ')[1]);
 
    console.log('This is the token:', jwtToken);

    if (!jwtToken) {
        return next(); 
    }
    if(!process.env.ACCESS_TOKEN_SECRET){
        return next();
    }
    
    try {
        const decodedToken = jwt.verify(jwtToken, process.env.ACCESS_TOKEN_SECRET) as JwtPayload;
        console.log('but ',decodedToken);
        
        const user = decodedToken as unknown as UserPayload;
        req.user = user;
        console.log('this is that user',req.user,user);
        
        next();
    } catch (error) {
        console.error("Token verification error:", error);
        next(error); 
    }
}
