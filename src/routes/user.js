const { Router } = require("express");
const { check, param } = require("express-validator");
const { validarCampos } = require("../middlewares");
const { checkUser } = require("../helpers/validators");
const {
  login,
  usersGet,
  userPost,
  userPut,
  userDelete,
} = require("../controllers/users");

const router = Router();

router.get("/", usersGet);

router.post(
  "/login",
  [
    check("username", "El nombre de usuario es obligatorio").not().isEmpty(),
    check(
      "password",
      "La contraseña debe ser entre 6 y 12 caracteres"
    ).isLength({
      min: 6,
      max: 12,
    }),
    validarCampos,
  ],
  login
);

router.put(
  "/:id",
  [
    param("id", "El id de usuario debe ser númerico").isNumeric(),
    check("username", "El nombre de usuario es obligatorio").not().isEmpty(),
    check("password", "La contraseña de usuario es obligatoria")
      .not()
      .isEmpty(),
    validarCampos,
  ],
  userPut
);

router.post(
  "/",
  [
    check("username", "El nombre de usuario es obligatorio").not().isEmpty(),
    check(
      "password",
      "La contraseña debe ser entre 6 y 12 caracteres"
    ).isLength({
      min: 6,
      max: 12,
    }),
    check("username").custom(checkUser),
    validarCampos,
  ],
  userPost
);

router.delete(
  "/:id",
  [
    param("id", "El id de usuario debe ser númerico").isNumeric(),
    check("username", "El nombre de usuario es obligatorio").not().isEmpty(),
    check("password", "La contraseña de usuario es obligatoria")
      .not()
      .isEmpty(),
    validarCampos,
  ],
  userDelete
);

module.exports = router;
