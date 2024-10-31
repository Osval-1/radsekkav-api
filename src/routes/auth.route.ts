const {
  signup,
  login,
} = require("../controllers/auth.controller");
import express from "express"


const router = express.Router();

router.post("/signup",signup);
router.post("/login", login);

export default router;
