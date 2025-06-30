import { Response, Request, NextFunction } from "express";
import { asyncAwaitHandler } from "../middlewares/async.middlewares";
import { AuthenticatedRequest, BadRequestError } from "../types";
import { logger } from "../utils/logger";
import { UsersProfile } from "../models/user-profile.models";
import { Op } from "sequelize";

const createUserProfile = asyncAwaitHandler(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const { first_name, last_name, bio, phone_number } = req.body;
    const user_id = req.user?.id;
    try {
      if (!user_id) {
        logger.warn("Invalid request", {
          message: "User ID is missing from the request",
          method: req.method,
          url: req.originalUrl,
        });
        return next(new BadRequestError("User ID is missing"));
      }

      const user = await UsersProfile.findOne({ where: { user_id }})
      if(user){
        logger.warn("User already has a profile", {
          message: "User already has a profile",
          method: req.method,
          url: req.originalUrl,
          user_id,
        })
        return next(new BadRequestError("User already has a profile"))
      }
      
      const userProfile = await UsersProfile.create({
        user_id,
        first_name,
        last_name,
        bio,
        phone_number,
      });

      logger.info("User Profile created", {
        method: req.method,
        url: req.originalUrl,
        role: req.user?.role || "attendee",
      });

      return res.status(201).json({
        status: true,
        message: "User profile created successfully",
        data: {
          user_profile: userProfile,
        },
      });
    } catch (err) {
      return next(err);
    }
  }
);

const getUserProfile = asyncAwaitHandler(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const user_id = req.params.id;
    try {
      if (!user_id) {
        logger.warn("Invalid request", {
          message: "User ID is missing from the request",
        });

        return next(new BadRequestError("User ID is missing"));
      }

      const user_profile = await UsersProfile.findOne({ where: { user_id } });
      logger.info("User profile request", {
        method: req.method,
        url: req.originalUrl,
        role: req.user?.role || "attendee",
      });

      return res.status(200).json({
        success: true,
        message: "",
        data: {
          user: user_profile?user_profile : {},
        },
      });
    } catch (err) {
      logger.info("Error fetching user profile", {
        method: req.method,
        url: req.originalUrl,
        role: req.user?.role || "attendee",
        user_id,
        err,
      });
      return next(err);
    }
  }
);

const getUserProfiles = asyncAwaitHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const page = Math.max(parseInt(req.query.page as string) || 1, 1);
    const limit = Math.min(parseInt(req.query.limit as string) || 10, 100);
    const offset = (page - 1) * limit;
    const { search, role, sortBy = "createdAt", order = "DESC" } = req.query;

    try {
      const whereCondition: any = {};

      if ((search as string).trim()) {
        whereCondition[Op.or] = {
          first_name: { [Op.iLike]: `%${search}%` },
          last_name: { [Op.iLike]: `%${search}%` },
        };
      }

      if (role) {
        whereCondition.role = role;
      }

      logger.info("User profiles fetched with", {
        offset,
        page,
        limit,
        where: whereCondition,
        sortBy,
        order,
      });

      const userProfiles = await UsersProfile.findAndCountAll({
        where: whereCondition,
        offset,
        limit,
        order: [[sortBy as string, (order as string).toUpperCase()]],
      });

      const totalPages = Math.ceil(userProfiles.count / limit);
      return res.status(200).json({
        success: true,
        message: "User profiles",
        data: {
          users: userProfiles.rows??[],
        },
        pagination: {
          totalCount: userProfiles.count,
          totalPages,
          currentPage: page,
          limit,
        },
      });
    } catch (err) {
      logger.error("Error occurred", {
        method: req.method,
        url: req.originalUrl,
        error: err,
      });
      return next(err);
    }
  }
);

const updateUserProfile = asyncAwaitHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user_id = req.params.id;
    const { first_name, last_name, phone_number, bio } = req.body;

    try {
      const user = await UsersProfile.findOne({ where: { user_id } });
      if (!user) {
        logger.warn("User profile doesn't exist", {
          method: req.method,
          url: req.originalUrl,
          user_id,
        });

        return next(new BadRequestError("User profile doesn't exist"));
      }

      await user.update({ first_name, last_name, phone_number, bio });
      logger.info("User profile updated successfully", {
        method: req.method,
        url: req.originalUrl,
        user_id,
      });

      return res.status(200).json({
        success: true,
        message: "User profile updated successfully",
        data: {
          user,
        },
      });
    } catch (err) {
      logger.error("Error updating user profile", {
        method: req.method,
        url: req.originalUrl,
        user_id,
        err,
      });
      return next(err);
    }
  }
);

const deleteUserProfile = asyncAwaitHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user_id = req.params.id;
    try {
      if (!user_id) {
        logger.warn("User id is required", {
          method: req.method,
          url: req.originalUrl,
        });
        return next(new BadRequestError("User id is required"));
      }

      const user = await UsersProfile.findOne({ where: { user_id } });
      if (!user) {
        logger.warn("User profile doesn't exist", {
          method: req.method,
          url: req.originalUrl,
          user_id,
        });
        return next(new BadRequestError("User profile doesn't exist"));
      }

      await user.destroy();

      return res.status(200).json({
        success: true,
        message: "User profile deleted successfully",
      });
    } catch (err) {
      logger.error("Error deleting user profile", {
        method: req.method,
        url: req.originalUrl,
        user_id,
        err,
      });
      return next(err);
    }
  }
);

const updateUserRole = asyncAwaitHandler(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const user_id = req.params.id;
    const role = req.body.role;
    try {
      if(!user_id){
        logger.warn("User id is required", {
          method: req.method,
          url: req.originalUrl,
          admin_id: req.user?.id
        });
        return next(new BadRequestError("User id is required"));
      }
      const user = await UsersProfile.findOne({ where: { user_id } }); 
      if(!user){
        logger.warn("User profile doesn't exist", {
          method: req.method,
          url: req.originalUrl,
          user_id,
        });
        return next(new BadRequestError("User profile doesn't exist"));
      }

      await user.update({ role });
      return res.status(200).json({
        success: true,
        message: "User role updated successfully",
        data: {
          user
        }
      })
    } catch (err) {
      logger.error("Error updating user role", {
        method: req.method,
        url: req.originalUrl,
        user_id,
        err,
      });
      return next(err);
    }
  }
);

export {
  createUserProfile,
  getUserProfile,
  getUserProfiles,
  updateUserProfile,
  deleteUserProfile,
  updateUserRole,
};
