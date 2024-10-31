const {
  signup,
  login,
} = require("../controllers/auth.controller");
import express,{Response,Request,Router} from "express"


const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

module.exports = router;