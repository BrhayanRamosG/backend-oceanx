const { response, request } = require("express");
const db = require("../database/models");

const profilesGet = async (req = request, res = response) => {
  const profiles = await db.Profile.findAll({
    include: {
      model: db.Gender,
    },
  });
  res.json({ profiles });
};

const profileGet = async (req = request, res = response) => {
  const { id } = req.params;
  try {
    const profile = await db.Profile.findOne({ where: { id } });
    res.json({ profile });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error al buscar perfil",
    });
  }
};

const profilePost = async (req = request, res = response) => {
  const { name, birthday, userId, genderId } = req.body;
  const profile = new db.Profile({ name, birthday, userId, genderId });
  try {
    const status = await profile.save();
    if (status) {
      return res.json({
        status,
        msg: "Perfil registrado con éxito",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "No se pudo registrar el usuario",
    });
  }
};

const profilePut = async (req = request, res = response) => {
  const { id } = req.params;
  const { name, birthday, genderId } = req.body;
  try {
    const update = await db.Profile.update(
      {
        name,
        birthday,
        genderId,
      },
      {
        where: { id },
      }
    );
    if (update) {
      return res.json({
        status: true,
        msg: `Tu perfil ha sido actualizado con éxito`,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "No se pudo actualizar el perfil",
    });
  }
};

const profileDelete = async (req = request, res = response) => {
  const { id } = req.params;
  try {
    const profile = await db.Profile.destroy({
      where: { id },
    });

    if (profile) {
      return res.json({
        msg: `El perfil ha sido eliminado con éxito`,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "No se pudo actualizar el perfil",
    });
  }
};

module.exports = {
  profilesGet,
  profileGet,
  profilePost,
  profilePut,
  profileDelete,
};
