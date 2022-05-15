const { Router } = require("express");
const {
  profilesGet,
  profileGet,
  profilePost,
  profilePut,
  profileDelete,
} = require("../controllers/profiles");
const router = Router();

router.get("/", profilesGet);
router.get("/:id", profileGet);
router.post("/", profilePost);
router.put("/:id", profilePut);
router.delete("/:id", profileDelete);

module.exports = router;
