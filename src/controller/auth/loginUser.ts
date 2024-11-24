import { jwtToken } from '../../utils/jwt/jwtToken';
import { login } from '../../repositories/auth';
import { comparePassword } from '../../utils/bcrypt/bcrypt';
import { Request, Response, NextFunction } from 'express';
import { UnauthorizedError, NotFoundError } from '../../utils/errors/customError'; 


export const loginController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { password, email } = req.body;

        
        const user  = await login({ email });
        if (!user) {
            throw new NotFoundError('User not found!');
        }

        
        const isPasswordCorrect = await comparePassword(password, user.password);
        if (!isPasswordCorrect) {
            throw new UnauthorizedError('Incorrect email or password!');
        }

        
        const token = jwtToken({ _id: user._id, email: user.email });

        
        res.cookie('jwtToken', token, {
            httpOnly: true,
            sameSite: "none",
            secure: true,
        });

        return res.status(200).json({
            success: true,
            data: user,
            message: "User login successfully!",
            token:token
        });

    } catch (error: any) {
        
        next(error);
    }
};
