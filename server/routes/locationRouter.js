const Router = require("express");
const router = new Router();
const LocationController = require("../controllers/LocationController");
const authMiddleware = require("../middleware/auth.Middleware");

router.post("/", authMiddleware, LocationController.createLocation);
router.get("/", LocationController.getLocations);
router.get("/:id", LocationController.getOneLocation);
router.delete("/:id", authMiddleware, LocationController.deleteLocation);
router.put("/:id", LocationController.updateLocation);

module.exports = router;
