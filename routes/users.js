const express = require("express");
const {
  updateUser,
  getAllUsers,
  getUserById,
  deleteUser,
} = require("../controllers/userController");
const router = express.Router();
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middleware/verifyToken");

// /users
router.get("/", verifyTokenAndAdmin, getAllUsers);

// /ausers/:id
router
  .route("/:id")
  .put(verifyTokenAndAuthorization, updateUser)
  .get(verifyTokenAndAuthorization, getUserById)
  .delete(verifyTokenAndAuthorization, deleteUser);

module.exports = router;
