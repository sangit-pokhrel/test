const multer = require("multer");
const { diskStorage } = require("multer");
const path = require("path");

// Regular expression to eliminate whitespace and special characters from file names
const re = new RegExp("\\s+", "g");
const sanitizeFileName = (fileName) => {
  return fileName.replace(re, "-").replace(/[^a-zA-Z0-9_\-\.]/g, "");
};

// Function to handle file naming
const filename = (req, file, next) => {
  let lastDotIndex = file.originalname.lastIndexOf(".");
  let originalName = file.originalname.substring(0, lastDotIndex);
  let ext = file.originalname.substring(lastDotIndex);
  next(null, `${sanitizeFileName(originalName)}-${Date.now()}${ext}`);
};

// Function to filter file types
const filter = (req, file, next) => {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/jpg",
    "video/mp4",
    "image/gif",
    "application/pdf",
  ];
  if (allowedTypes.includes(file.mimetype)) {
    next(null, true);
  } else {
    next(null, false);
    return next(
      new Error("Only .jpeg, .jpg, .png, .mp4, .gif, and .pdf formats allowed!")
    );
  }
};

// Function to get the destination path
const getDestination = (folderName) => {
  return (req, file, next) => {
    next(null, path.join(__dirname, `../../uploads/${folderName}`));
  };
};

// Storage configurations for images
const profileImageStorage = diskStorage({
  destination: getDestination("profile"),
  filename,
});

// Multer instances
const profileImage = multer({
  storage: profileImageStorage,
  fileFilter: filter,
});

const recipeImageStorage = diskStorage({
  destination: getDestination("recipeImg"),
  filename,
});
const uploadRecipeImage = multer({
  storage: recipeImageStorage,
  fileFilter: filter,
});

// Storage configurations for videos
const recipeVideoStorage = diskStorage({
  destination: getDestination("recipeVideo"),
  filename,
});

const uploadRecipeVideo = multer({
  storage: recipeVideoStorage,
  fileFilter: filter,
});

//for products

const productImageStorage = diskStorage({
  destination: getDestination("productImg"),
  filename,
});
const uploadProductImage = multer({
  storage: productImageStorage,
  fileFilter: filter,
});

//for workout
const workoutImageStorage = diskStorage({
  destination: getDestination("workoutImg"),
  filename,
});
const uploadWorkoutImage = multer({
  storage: workoutImageStorage,
  fileFilter: filter,
});

//for exercise
const exerciseImageStorage = diskStorage({
  destination: getDestination("exerciseImg"),
  filename,
});
const uploadExerciseImage = multer({
  storage: exerciseImageStorage,
  fileFilter: filter,
  limits: { fileSize: 5 * 1024 * 1024 }, // file size limit 5mb
});

module.exports = {
  profileImage,
  uploadRecipeImage,
  uploadRecipeVideo,
  uploadProductImage,
  uploadWorkoutImage,
  uploadExerciseImage,
};
