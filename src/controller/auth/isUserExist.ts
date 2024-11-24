import { Request, Response, NextFunction } from 'express';
import { isUserExist } from '../../repositories/auth';
import { jwtToken } from '../../utils/jwt/jwtToken';

export const isUserExistController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const email = req.params.email;


    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }


    const user = await isUserExist({ email });
    if (!user) {
      return res.status(200).json({
        success: false,
        data: {},
        message: 'User does not exist!',
      });
    }

    console.log('User found:', user);


    if (user.isGAuth) {
      const token = jwtToken({ _id: user._id, email: user.email });
      console.log('JWT created:', token);

      
      res.cookie('jwtToken', token, {
        httpOnly: true,
        sameSite: 'none',
        secure: process.env.NODE_ENV === 'production',
      });
      return res.status(200).json({
        success: true,
        data: user,
        message: 'User exists!',
        token:token
      });
    }

    return res.status(200).json({
      success: true,
      data: user,
      message: 'User exists!',
    });

  } catch (error) {
    next(error);
  }
};
