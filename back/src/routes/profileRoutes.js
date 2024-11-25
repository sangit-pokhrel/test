const express = require("express");
const {
  updateProfile,
  getProfile,
  deleteProfile,
} = require("../controllers/profileControllers");
const { authMiddleware } = require("../middleware/authMiddleware");
const { profileImage } = require("../middleware/uploadMiddleware");
const { authorizeRole } = require("../middleware/authorizationMiddleware");
const router = express.Router();

/**
 * @description To update user profile
 * @api /api/profile/update
 * @access private
 * @type put
 * @return response
 */
router.put(
  "/update",
  authMiddleware,
  authorizeRole("admin", "user", "subscribedUser"),
  profileImage.single("profilePic"),
  updateProfile
);

/**
 * @description To  user get profiles
 * @api /api/profile/get
 * @access private
 * @type get
 * @return response
 */

router.get(
  "/get",
  authMiddleware,
  authorizeRole("user", "subscribedUser", "admin"),
  getProfile
);

/**
 * @description To delete user profile
 * @api /api/profile/delete
 * @access private
 * @type delete
 * @return response
 */

router.delete(
  "/delete",
  authMiddleware,
  authorizeRole("user", "subscribedUser", "admin"),
  deleteProfile
);

module.exports = router;
