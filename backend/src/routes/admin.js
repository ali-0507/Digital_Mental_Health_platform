// backend/src/routes/admin.js
const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");
const { protect } = require("../middlewares/auth");
const { authorize } = require("../middlewares/roles");
const { route } = require("./audit");
const resourcesController = require("../controllers/Admin.Resources");


// apply protect and require admin role for all admin routes
router.use(protect, authorize("admin"));

router.get("/users", adminController.getUsers);
router.get("/users/:id", adminController.getUserById);
router.put("/users/:id/role", adminController.updateUserRole);
router.put("/users/:id/block", adminController.toggleBlockUser);
router.delete("/users/:id", adminController.deleteUser);
router.get("/stats", adminController.getAdminStats);

// Admin resources endpoints
router.get("/resources", resourcesController.listAdmin);
router.delete("/resources/:id", resourcesController.deleteResource);

// Admin Screening Reports
router.get("/screenings", adminController.adminListScreenings);


module.exports = router;
