const { Router } = require("express");
const {
  formsGet,
  formGet,
  formPost,
  formDelete,
} = require("../controllers/forms");
const router = Router();

router.get("/", formsGet);
router.get("/:id", formGet);
router.post("/", formPost);
router.delete("/:id", formDelete);

module.exports = router;
