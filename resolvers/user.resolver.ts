import User from "../models/users.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const resolversUser = {
  Query: {
    getUser: async (_: any, { id }: any) => {
      try {
        const user = await User.findOne({ 
            _id: id, 
            deleted: false 
        });
        if (user) {
          return {
            id: user._id,
            fullName: user.fullName,
            email: user.email,
            code: 200,
            message: "User found",
          };
        } else {
          return {
            code: 404,
            message: "User not found",
          };
        }
      } catch (error: any) {
        return {
          code: 500,
          message: error.message,
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
    loginUser: async (_: any, { user }: any) => {
      try {
        const userFound: string | any = await User.findOne({
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
