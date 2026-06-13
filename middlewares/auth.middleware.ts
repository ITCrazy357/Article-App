import User from "../models/users.model";
import jwt from "jsonwebtoken";

export const requireAuth = async (
  req: any,
  res: any,
  next: any,
): Promise<void> => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      code: 401,
      message: "Unauthorized",
      token: null,
      user: null,
    });
  }

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);

    const user: any = await User.findById(decoded.id);

    if (user.deleted === true) {
      return res.status(401).json({
        code: 401,
        message: "Tài khoản đã bị xóa",
        token: null,
        user: null,
      });
    }

    if (!user) {
      return res.status(401).json({
        code: 401,
        message: "Unauthorized",
        token: null,
        user: null,
      });
    }

    res.locals.user = user;
  } catch (error: any) {
    return res.status(401).json({
      code: 401,
      message: "Unauthorized",
      token: null,
      user: null,
    });
  }

  next();
};
