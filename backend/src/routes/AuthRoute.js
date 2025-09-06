import express from "express";
import authController from "../controllers/AuthController.js";
import middleware from "../middleware/Middleware.js";

const router = express.Router();

router.post("/register",authController.register);
router.post("/login",authController.login);
router.post("/refresh",authController.refresh);
router.post("/logout",authController.logout);


// router.post("/testMiddleware",middleware, (req,res) => {
//     return res.status(200).json({message: "Test successfully", user: req.user});
// })
export default router;