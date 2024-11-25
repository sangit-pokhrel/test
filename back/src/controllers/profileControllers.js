const Profile = require("../models/profileModel");
const dotenv = require("dotenv");
dotenv.config();
const domain = process.env.DOMAIN;
// controller for updating user profile

const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Get user id from token

    // Find the profile
    const profile = await Profile.findOne({ user: userId });
    if (!profile) {
      return res.status(404).json({ msg: "Profile not found" });
    }

    // Prepare data for update
    const { firstName, phone, address } = req.body;
    const profileData = {
      firstName: firstName || profile.firstName,
      phone: phone || profile.phone,
      address: address || profile.address,
    };

    // Handle profile picture upload
    if (req.file) {
      profileData.profilePic = `uploads/profiles/${req.file.filename}`;
    }

    // Update the profile
    const updatedProfile = await Profile.findOneAndUpdate(
      { user: userId },
      { $set: profileData },
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      msg: "Profile updated successfully",
      profile: updatedProfile,
    });
  } catch (err) {
    return res.status(500).json({ msg: "Server error", error: err.message });
  }
};

// controller to get user profile
const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const profile = await Profile.findOne({ user: userId }).populate("user", [
      "name",
      "email",
      "userRole",
    ]);
    if (!profile) {
      return res.status(404).json({ msg: "profile not found" });
    }
    return res
      .status(200)
      .json({ msg: "profile fetched successfully", profile });
  } catch (err) {
    return res.status(500).json({ msg: "server error", error: err.message });
  }
};

// controller to delete user profile

const deleteProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const profile = await Profile.findOneAndDelete({ user: userId });
    if (!profile) {
      return res.status(404).json({ msg: "profile not found" });
    }
    return res.status(200).json({ msg: "profile deleted successfully" });
  } catch (err) {
    return res.status(500).json({ msg: "server error", error: err.message });
  }
};

module.exports = { updateProfile, getProfile, deleteProfile };
