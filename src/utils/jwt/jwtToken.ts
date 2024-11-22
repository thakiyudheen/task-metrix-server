import jwt from "jsonwebtoken";

export const jwtToken = (
    payload: {
        _id: any,
        email: string,     
    }
) => {
    
    const { _id, email } = payload;
    const newPayload = { _id, email };

    return jwt.sign(
        newPayload,
        String(process.env.ACCESS_TOKEN_SECRET),
        { expiresIn: '30m' }
    );
};