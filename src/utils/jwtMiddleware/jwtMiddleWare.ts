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
    const { jwtToken } = req.cookies; 
    console.log('This is the token:', jwtToken);

    if (!jwtToken) {
        return next(); // No token present, just proceed to the next middleware
    }
    if(!process.env.ACCESS_TOKEN_SECRET){
        return next();
    }
    
    try {
        const decodedToken = jwt.verify(jwtToken, process.env.ACCESS_TOKEN_SECRET) as JwtPayload;
        console.log('but ',decodedToken);
        
        const user = decodedToken as unknown as UserPayload;
        req.user = user;
        next();
    } catch (error) {
        console.error("Token verification error:", error);
        next(error); // Pass the error to the next error-handling middleware
    }
}
