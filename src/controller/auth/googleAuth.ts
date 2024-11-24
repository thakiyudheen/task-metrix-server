import { Request, Response, NextFunction } from "express";
import { OAuth2Client } from "google-auth-library";
import { isUserExist, signup } from "../../repositories/auth";
import { jwtToken } from "../../utils/jwt/jwtToken";
import { hashPassword } from "../../utils/bcrypt/bcrypt";
import { CustomError, ValidationError } from "../../utils/errors/customError";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleAuthController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { credential } = req.body;

        if (!credential) {
            throw new ValidationError("Google token is missing.");
        }

        
        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
       
    console.log('googlde seup ',payload);
    
        if (!payload || !payload.email) {
            throw new ValidationError("Invalid Google token or no email found.");
        }

        const { email, given_name: firstName, family_name: lastName, picture } = payload;

        
        const isExists = await isUserExist({ email });
        

        if (isExists) {
            if(!isExists.isGAuth){
                throw new ValidationError("User not throgh google signup!!");
            }
            const token = jwtToken({ _id: isExists._id, email: isExists.email });

            res.cookie("jwtToken", token, {
                httpOnly: true,
                sameSite: "none",
                secure: true,
            });

            return res.status(200).json({
                success: true,
                existingUser: true,
                data: isExists,
                message: "User logged in successfully!",
                token:token
            });
        }

        // If user doesn't exist, sign them up
        const customPassword = "google-auth-" + Date.now();
        const hashedPassword = await hashPassword(customPassword);

        const userData = {
            email,
            username: `${firstName} ${lastName}`,
            password: hashedPassword,
            isGAuth: true, 
            
        };

        const newUser = await signup(userData);

        if (!newUser) {
            throw new CustomError("Failed to sign up the user.", 500);
        }

        const token = jwtToken({ _id: newUser._id, email: newUser.email });

        res.cookie("jwtToken", token, {
            httpOnly: true,
            sameSite: "none",
            secure: true,
        });

        return res.status(200).json({
            success: true,
            existingUser: false,
            data: newUser,
            message: "User signed up successfully!",
            token,
        });
    } catch (error: any) {
        console.error("Error during Google Auth:", error);
        next(error);
    }
};
