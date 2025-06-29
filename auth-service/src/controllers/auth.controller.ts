import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import { asyncAwaitHandler } from "../middlewares/async-await.middleware";
import { Users } from "../models/user";
import { logger } from "../utils/logger.utils";
import { BadRequestError, NotFoundError, UnauthorizedError } from "../types";
import { sequelize } from "../config/db";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  setRefreshTokenCookie,
} from "../utils/jwt.utils";
import { RefreshToken } from "../models/refresh-token";

const signUp = asyncAwaitHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password, role } = req.body;
    logger.info(`User sign up with`, {
      email: email,
    });
    const existingUser = await Users.findOne({
      where: { email },
    });

    if (existingUser) {
      logger.warn("User already exists", {
        email,
      });
      return next(new BadRequestError("User already exists"));
    }

    const transaction = await sequelize.transaction();
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const user = await Users.create(
        { email, password: hashedPassword, role },
        { transaction }
      );
      const accessToken = generateAccessToken(user.id, user.role);
      const refreshToken = generateRefreshToken(user.id, user.role);
      await RefreshToken.create(
        { token: refreshToken, user_id: user.id },
        { transaction }
      );

      await transaction.commit();

      setRefreshTokenCookie(res, refreshToken);

      res.status(201).json({
        success: true,
        message: "User created succcessfully",
        data: {
          token: accessToken,
          user: {
            id: user.id,
            email: user.email,
            role: user.role,
          },
        },
      });
    } catch (err: any) {
      await transaction.rollback();
      logger.error("Unable to create user", {
        message: err.message,
        stack: err.stack,
      });

      return next(new Error("Internale Server Error"));
    }
  }
);

const signIn = asyncAwaitHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    logger.info("User sign in request", {
      email,
    });
    const existingUser = await Users.findOne({
      where: { email },
    });

    if (!existingUser) {
      return next(new NotFoundError("User doesn't exist"));
    }
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser?.password || ""
    );
    if (!isPasswordValid) {
      return next(new UnauthorizedError("Invalid password"));
    }

    await RefreshToken.update(
      {
        is_revoked: true,
      },
      {
        where: {
          user_id: existingUser.id,
          is_revoked: false,
        },
      }
    );
    const accessToken = generateAccessToken(
      existingUser?.id || "",
      existingUser?.role || ""
    );
    const refreshToken = generateRefreshToken(
      existingUser?.id || "",
      existingUser?.role || ""
    );
    await RefreshToken.create({
      user_id: existingUser?.id || "",
      token: refreshToken,
    });

    setRefreshTokenCookie(res, refreshToken);

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: {
        user: {
          id: existingUser?.id || "",
          email: existingUser?.email || "",
          role: existingUser?.role || "",
        },
        token: accessToken,
      },
    });
  }
);

const signOut = asyncAwaitHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      logger.warn("user not logged in");
      return next(new BadRequestError("User not logged in"));
    }
    await RefreshToken.update(
      { is_revoked: true },
      { where: { token: refreshToken } }
    );
    res.clearCookie("refreshToken");
    res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  }
);

const refreshToken = asyncAwaitHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      logger.warn("refresh token is missing");
      return next(new BadRequestError("refresh token is missing"));
    }

    const { id, role } = verifyRefreshToken(refreshToken);
    if (!id || !role) {
      logger.warn("Invalid refresh token");
      return next(new BadRequestError("Invalid refresh token"));
    }

    const existingToken = await RefreshToken.findOne({
      where: { token: refreshToken },
    });

    if (existingToken?.is_revoked) {
      logger.warn("Refresh token compromised. Please sign in again.", {
        refreshToken: existingToken,
      });
      return next(
        new BadRequestError("Refresh token compromised. Please sign in again.")
      );
    }

    await RefreshToken.update(
      { is_revoked: true },
      { where: { user_id: id, is_revoked: false } }
    );
    const accessToken = generateAccessToken(id, role);
    const newRefreshToken = generateRefreshToken(id, role);
    await RefreshToken.create({ token: newRefreshToken, user_id: id });

    setRefreshTokenCookie(res, newRefreshToken);

    res.status(201).json({
      success: true,
      message: "Refresh token updated successfully",
      data: {
        token: accessToken,
      },
    });
  }
);

export { signUp, signIn, signOut, refreshToken };
