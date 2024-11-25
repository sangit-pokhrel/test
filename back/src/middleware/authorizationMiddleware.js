const User = require("../models/userModels");

function authorizeRole(role) {
  return async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);

      if (!user) {
        return res.status(404).json({ msg: "user not found" }); // User not found
      }

      const userRole = String(user.userRole).trim();
      const requiredRole = String(role).trim();

      console.log("Required Role:", requiredRole); // Log the required role
      console.log("User Role:", userRole);
      // console.log(requiredRole);
      
      if (userRole !== requiredRole) {
        return res.status(403).json({ msg: "user has no access" }); // Forbidden if user does not have the required role
      }

      next();
    } catch (error) {
      // console.log(error);
      res.status(500).json({ msg: error.message });
    }
  };
}

module.exports = { authorizeRole };
