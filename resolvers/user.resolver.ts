import User from "../models/users.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const resolversUser = {
  Query: {
    getUser: async (_: any, __: any, context: any) => {
      try {
        const token = context.req.cookies.token;

        if (!token) {
          return {
            code: 401,
            message: "Unauthorized",
            user: null,
          };
        }

        const decoded: any = jwt.verify(
          token,
          process.env.JWT_SECRET as string,
        );

        const user = await User.findOne({
          _id: decoded.id,
          deleted: false,
        });

        if (!user) {
          return {
            code: 404,
            message: "User not found",
            user: null,
          };
        }

        return {
          code: 200,
          message: "User found",
          user: {
            id: user._id,
            fullName: user.fullName,
            email: user.email,
          },
        };
      } catch (error: any) {
        return {
          code: 500,
          message: error.message,
          user: null,
        };
      }
    },
  },

  Mutation: {
    //Register
    registerUser: async (_: any, { user }: any) => {
      try {
        const existEmail = await User.findOne({
          email: user.email,
          deleted: false,
        });

        if (existEmail) {
          return {
            code: 400,
            message: "Email already exists",
            token: null,
            user: null,
          };
        }

        const hashedPassword = await bcrypt.hash(user.password, 10);

        const newUser = new User({
          fullName: user.fullName,
          email: user.email,
          password: hashedPassword,
        });

        await newUser.save();

        const token = jwt.sign(
          {
            id: newUser._id,
            email: newUser.email,
          },
          process.env.JWT_SECRET as string,
          {
            expiresIn: "1h",
          },
        );

        return {
          code: 200,
          message: "Register successfully",
          token,
          user: {
            id: newUser._id,
            fullName: newUser.fullName,
            email: newUser.email,
          },
        };
      } catch (error: any) {
        return {
          code: 500,
          message: error.message,
          token: null,
          user: null,
        };
      }
    },

    //Login
    loginUser: async (_: any, { user }: any, context: any) => {
      try {
        const userFound: any = await User.findOne({
          email: user.email,
          deleted: false,
        });

        if (!userFound) {
          return {
            code: 400,
            message: "Email not found",
            token: null,
            user: null,
          };
        }

        const isMatch = await bcrypt.compare(user.password, userFound.password);

        if (!isMatch) {
          return {
            code: 400,
            message: "Password is incorrect",
            token: null,
            user: null,
          };
        }

        const token = jwt.sign(
          {
            id: userFound._id,
            email: userFound.email,
          },
          process.env.JWT_SECRET as string,
          {
            expiresIn: "1h",
          },
        );

        context.res.cookie("token", token, {
          httpOnly: true,
          maxAge: 3600000,
        });

        return {
          code: 200,
          message: "Login successfully",
          token,
          user: {
            id: userFound._id,
            fullName: userFound.fullName,
            email: userFound.email,
          },
        };
      } catch (error: any) {
        return {
          code: 500,
          message: error.message,
          token: null,
          user: null,
        };
      }
    },
  },
};
