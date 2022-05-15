const { response, request } = require("express");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const db = require("../database/models");

const login = async (req = request, res = response) => {
  const { username, password } = req.body;

  try {
    const user = await db.User.findOne({
      where: { username, status: 1 },
    });

    if (!user) {
      return res.status(401).json({
        status: false,
        msg: "Usuario no encontrado",
      });
    }
    const match = await bcrypt.compare(password, user.dataValues.password);

    if (!match) {
      return res.status(401).json({
        status: false,
        msg: "Datos de acceso no válidos",
      });
    }

    if (match) {
      return res.json({
        status: true,
        msg: "Has ingresado con éxito",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      msg: "Error al buscar el usuario",
    });
  }
};

const usersGet = async (req = request, res = response) => {
  const users = await db.User.findAll({
    attributes: {
      exclude: ["password"],
    },
    include: {
      model: db.Profile,
      include: {
        model: db.Gender,
        attributes: ["name"],
      },
    },
  });
  res.json({ users });
};

const userPost = async (req = request, res = response) => {
  const { username, password } = req.body;
  const user = new db.User({ username, password });

  user.password = bcrypt.hashSync(password, saltRounds);
  try {
    const valid = await user.save();
    if (valid) {
      return res.json({
        user,
        msg: "Usuario registrado con éxito",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "No se pudo registrar el usuario",
    });
  }
};

const userPut = async (req = request, res = response) => {
  const { id } = req.params;
  const { username, password } = req.body;

  try {
    const isUser = await db.User.findOne({ where: { id, username } });
    if (!isUser) {
      return res.json({
        msg: `El usuario ${username} con id ${id} no existe.`,
      });
    }
    const update = await db.User.update(
      {
        password: bcrypt.hashSync(password, saltRounds),
      },
      {
        where: { id },
      }
    );
    if (update) {
      return res.json({
        msg: `La contraseña de usuario id ${id} ha sido actualizada con éxito`,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "No se pudo actualizar el usuario",
    });
  }
};

const userDelete = async (req, res = response) => {
  const { id } = req.params;
  const { username, password } = req.body;
  try {
    const isUser = await db.User.findOne({
      where: { id, username, status: 1 },
    });

    if (!isUser) {
      return res.json({
        msg: `El usuario ${username} con id ${id} no existe.`,
      });
    }
    const match = await bcrypt.compare(password, isUser.dataValues.password);

    if (!match) {
      return res.json({
        msg: `La contraseña es incorrecta.`,
      });
    }

    const deactivate = await db.User.destroy({
      where: { id },
    });

    if (deactivate) {
      return res.json({
        msg: `Usuario con id ${id} ha sido eliminado con éxito`,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "No se pudo actualizar el usuario",
    });
  }
};

module.exports = {
  login,
  usersGet,
  userPost,
  userPut,
  userDelete,
};
