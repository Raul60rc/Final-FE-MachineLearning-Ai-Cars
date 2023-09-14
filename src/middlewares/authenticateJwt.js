const User = require("../api/users/loginUsers.model.js");
const { verifyJwt } = require("../utils/jwt/jwt.js");

const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const parsedToken = token.replace("Bearer", "");
    const validToken = verifyJwt(parsedToken);

    if (!validToken) {
      return res.status(401).json({ message: "Invalid Token" });
    }
    const userLogged = await User.findById(validToken.id);

    if (!userLogged) {
      return res.status(401).json({ message: "User not found" });
    }

    userLogged.password = null;
    req.user = userLogged;
    next();
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const user = req.user; // assuming Auth middle has already run

    if (!user) {
      res.status(401).json({ message: "Unauthorized" });
    }

    if (user.role === "admin") {
      next();
    } else {
      return res.status(403).json({ message: "Only admin can do this" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { isAuth, isAdmin };
