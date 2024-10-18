import express from "express";
import { viewAllUser, viewSingleUser, deleteUser, updateUser, addUser } from "../controller/user.controller.js"; // Import addUser controller
const router = express.Router();

// Routes
router.get("/", viewAllUser);       // Get all users
router.get("/:id", viewSingleUser); // Get a single user by ID
router.post("/", addUser);          // Add a new user
router.put("/:id", updateUser);     // Update an existing user by ID
router.delete("/:id", deleteUser);  // Delete a user by ID

// Example URLs:
// http://localhost:8000/api/User/        -> GET (view all users), POST (add a new user)
// http://localhost:8000/api/User/:id     -> GET (view single user), PUT (update user), DELETE (delete user)

export default router;
