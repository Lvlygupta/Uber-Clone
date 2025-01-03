const router = require("express").Router();
const driverController = require("../controllers/driver.controller");
const { body } = require("express-validator");
const authMiddleware = require("../middlewares/auth.middleware");

router.post(
  "/register",
  [
    body('email').isEmail().withMessage("Please enter a valid email!"),
    body('name')
      .isLength({ min: 3 })
      .withMessage("Name must be atleast 3 characters long"),
    body('password')
      .isLength({ min: 6 })
      .withMessage("Password must be atleast 6 characters long"),
  ],
  driverController.registerDriver
);
router.post(
  "/login",
  [
    body('email').isEmail().withMessage("Please enter a valid email!"),
    body('password')
      .isLength({ min: 6 })
      .withMessage("Password must be atleast 6 characters long"),
  ],
  driverController.loginDriver
);
router.get(
  "/profile",
  authMiddleware.authDriver,
  driverController.getDriverProfile
);
router.get(
  "/logout",
  authMiddleware.authDriver,
  driverController.logoutDriver
);

module.exports = router;
