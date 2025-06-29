import * as jwt from 'jsonwebtoken' 
import { config } from '../config/env'
import { Response } from 'express';

const generateAccessToken =(id: string, role: string)=>{
    return jwt.sign({id, role}, config.ACCESS_TOKEN_SECRET as jwt.Secret, { expiresIn: config.ACCESS_TOKEN_EXPIRES_IN} as jwt.SignOptions);
}

const generateRefreshToken = (id: string, role: string)=>{
    return jwt.sign({id, role}, config.REFRESH_TOKEN_SECRET as jwt.Secret, { expiresIn: config.REFRESH_TOKEN_EXPIRES_IN} as jwt.SignOptions);
}

const verifyRefreshToken = (token: string)=>{
    return jwt.verify(token, config.REFRESH_TOKEN_SECRET as jwt.Secret) as jwt.JwtPayload;
}

const setRefreshTokenCookie = (res: Response, token: string) => {
  res.cookie("refreshToken", token, {
    httpOnly: true,
    secure: config.NODE_ENV === "production",
    sameSite: "strict",
  });
};
export { generateAccessToken, generateRefreshToken, verifyRefreshToken, setRefreshTokenCookie };