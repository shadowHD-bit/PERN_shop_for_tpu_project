const Router = require("express");
const router = new Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/auth.Middleware");
const checkRoleMiddleware = require("../middleware/checkRoleMiddleware");

//Method POST to create
router.post("/registration", userController.registration);
router.post("/login", userController.login);

//Method GET to get auth
router.get("/auth", authMiddleware, userController.checkAuth);

router.get("/admin_user", checkRoleMiddleware('ADMIN'), userController.getUsersRoleAdmin);
router.get("/new_user", checkRoleMiddleware('ADMIN'), userController.getNewUser);
router.get("/money_user", checkRoleMiddleware('ADMIN'), userController.getMoneyUser);

//Get Data User for profile page
router.get("/:id", authMiddleware, userController.getDataUser);

router.put("/:id", userController.updateUserData);

module.exports = router;
