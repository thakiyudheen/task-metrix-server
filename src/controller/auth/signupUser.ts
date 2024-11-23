import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { isUserExist, signup } from '../../repositories/auth';
import { hashPassword } from '../../utils/bcrypt/bcrypt';
import { jwtToken } from '../../utils/jwt/jwtToken';
import signupValidationSchema from '../../utils/validation/signupSchema'; 

export const signupController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error } = signupValidationSchema.validate(req.body);
    
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const { email, password } = req.body;

    if (await isUserExist({ email })) {
      return res.status(400).json({ success: false, message: 'Email already exists!' });
    }

    req.body.password = await hashPassword(password);
    const user = await signup(req.body);

    if (!user) {
      return res.status(500).json({ success: false, message: 'Something went wrong!' });
    }

    const token = jwtToken({ _id: user._id, email: user.email });
    res.cookie('jwtToken', token, { httpOnly: true, sameSite: 'none', secure: true });

    return res.status(201).json({ success: true, data: user, message: 'User signed up successfully!' });
  } catch (error) {
    next(error);
  }
};
