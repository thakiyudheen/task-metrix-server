import { Request, Response } from 'express';

export const logoutController = async (req: Request, res: Response) => {
    try {
        res.cookie("jwtToken", "", {
            maxAge: 1,
            httpOnly: true,
            sameSite: "none",
            secure: true,
        });

        return res.status(204).json({});
    } catch {
        return res.status(500).json({
            success: false,
            message: 'An error occurred while logging out.',
        });
    }
};
