const { response, request } = require("express");
const db = require("../database/models");

const formsGet = async (req = request, res = response) => {
  try {
    const forms = await db.Form.findAll({
      include: [
        db.Problem,
        db.Urgency,
        db.State,
        {
          model: db.User,
          attributes: {
            exclude: ["password"],
          },
          include: {
            model: db.Profile,
            attributes: ["name"],
            include: [{ model: db.Gender, attributes: ["name"] }],
          },
        },
      ],
    });
    res.json({ forms });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error al buscar formularios",
    });
  }
};

const formGet = async (req = request, res = response) => {
  const { id } = req.params;
  try {
    const form = await db.Form.findOne({
      include: [
        db.Problem,
        db.Urgency,
        db.State,
        {
          model: db.User,
          attributes: {
            exclude: ["password"],
          },
          include: {
            model: db.Profile,
            attributes: ["name"],
            include: [{ model: db.Gender, attributes: ["name"] }],
          },
        },
      ],
      where: { id },
    });
    res.json({ form });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error al buscar formulario",
    });
  }
};

const formPost = async (req = request, res = response) => {
  const {
    coordinates,
    date,
    description,
    problemId,
    urgencyId,
    stateId,
    userId,
  } = req.body;
  const form = new db.Form({
    coordinates,
    date,
    description,
    problemId,
    urgencyId,
    stateId,
    userId,
  });
  try {
    const status = await form.save();
    if (status) {
      return res.json({
        status,
        msg: "Formulario registrado con éxito",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "No se pudo registrar el formulario",
    });
  }
};

const formDelete = async (req = request, res = response) => {
  const { id } = req.params;
  try {
    const form = await db.Form.destroy({
      where: { id },
    });

    if (form) {
      return res.json({
        msg: `El formulario ha sido eliminado con éxito`,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "No se pudo eliminar el formulario",
    });
  }
};

module.exports = {
  formsGet,
  formGet,
  formPost,
  formDelete,
};
