const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token missing or invalid" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Token is not valid" });
    }

    req.user = decoded; // Attach decoded token with role info to req
    next();
  });
}

// Middleware to allow access only for admins
function adminOnly(req, res, next) {
  if (!req.user || req.user.role !== "admin") {
    return res
      .status(403)
      .json({ message: "Access restricted to admins only" });
  }
  next();
}
module.exports = { authMiddleware, adminOnly };
