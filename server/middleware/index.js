import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  try {
    jwt.verify(token, "secret");
    next();
  } catch (error) {
    return res.status(401).send({ error: error.message });
  }
};

export const AuthToken = (req, res, next) => {
  const accessToken = req.cookies.accessToken;

  if (!accessToken) {
    return res.status(401).json({ error: "Unauthorized, no access token" });
  }

  jwt.verify(accessToken, "secret", (err, decoded) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Token verification failed", details: err.message });
    }

    if (decoded.role !== "admin") {
      return res.status(403).json({ error: "Forbidden, unauthorized role" });
    }

    req.user = decoded;

    next();
  });
};

// Max course 10 item
