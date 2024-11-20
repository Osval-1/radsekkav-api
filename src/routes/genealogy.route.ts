const {
  getFamilyTree,
  AddFamilyMember,AddParents
} = require("../controllers/genealogy.controller");
const authenticate = require("../middlewares/authenticate");
import express,{Response,Request,Router} from "express"


const router = express.Router();
router.use(authenticate);


router.get("/family-tree", getFamilyTree);
router.post("/add-member", AddFamilyMember);
router.post("/add-parents", AddParents);

export default router
module.exports = router;
