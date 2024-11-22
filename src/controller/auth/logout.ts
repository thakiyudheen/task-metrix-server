import { jwtToken } from '../../utils/jwt/jwtToken';
import { isUserExist, login, signup } from '../../repositories';
import { comparePassword, hashPassword } from '../../utils/bcrypt/bcrypt';
import { Request, Response } from 'express';


export const logoutController = async (req: Request, res: Response) => {
    try {


        res.cookie("jwtToken", "", {
            maxAge: 1,
            httpOnly: true,
            sameSite: "none",
            secure: true,
        });
        
        res.status(204).json({});

    } catch (error: any) {
        console.log('error in login controller');

    }
};
