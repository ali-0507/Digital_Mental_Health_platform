// backend/src/routes/admin.js
const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");
const { protect } = require("../middlewares/auth");
const { authorize } = require("../middlewares/roles");

// apply protect and require admin role for all admin routes
router.use(protect, authorize("admin"));

router.get("/users", adminController.getUsers);
router.get("/users/:id", adminController.getUserById);
router.put("/users/:id/role", adminController.updateUserRole);
router.delete("/users/:id", adminController.deleteUser);

module.exports = router;
