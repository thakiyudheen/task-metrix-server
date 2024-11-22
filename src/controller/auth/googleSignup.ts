import { Request, Response, NextFunction } from 'express';
import { isUserExist, signup } from '../../repositories'; 
import { jwtToken } from '../../utils/jwt/jwtToken';
import { hashPassword } from '../../utils/bcrypt/bcrypt';
import { CustomError, ValidationError, NotFoundError } from '../../utils/errors/constomError'; 

export const googleSignupController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, name } = req.body;  
    if (!email || !name) {
      throw new ValidationError('Email and name are required.');
    }

    const isExists = await isUserExist({ email });
    if (isExists) {
      throw new NotFoundError('Email already exists!');
    }

    const customPassword = 'google-auth-' + Date.now();
    const hashedPassword = await hashPassword(customPassword);

    const userData = {
      email,
      username: name,
      password: hashedPassword,
      isGAuth: true,
    };

    const user = await signup(userData);

    if (user) {
      const token = jwtToken({ _id: user._id, email: user.email });

      res.cookie('jwtToken', token, {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      });

      return res.status(200).json({
        success: true,
        data: user,
        message: 'User signed up successfully!',
      });
    } else {
      throw new CustomError('Something went wrong while signing up the user!', 500);
    }
  } catch (error: any) {
    console.error('Error during Google signup:', error);
    next(error);
  }
};
