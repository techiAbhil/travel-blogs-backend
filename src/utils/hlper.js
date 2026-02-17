import jwt from 'jsonwebtoken';

export const generateToken = (userDetails) => {
    delete userDetails.password;
    const token = jwt.sign(userDetails, process.env.JWT_SECRET);
    return token;
};
