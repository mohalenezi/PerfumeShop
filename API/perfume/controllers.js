// let perfumes = require("../../products");
// const slugify = require("slugify");
// import the model
const { Perfume } = require("../../db/models");

exports.fetchPerfume = async (perfumeId, next) => {
  try {
    const perfume = await Perfume.findByPk(perfumeId);
    return perfume;
  } catch (error) {
    next(error);
  }
};

exports.perfumeFetch = async (req, res, next) => {
  try {
    const perfumes = await Perfume.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json(perfumes);
  } catch (error) {
    next(error);
  }
};

exports.createPerfume = async (req, res, next) => {
  try {
    if (req.file) req.body.image = `http://${req.get("host")}/${req.file.path}`;
    const newPerfume = await Perfume.create(req.body);
    res.status(201).json(newPerfume); // response end with created perfume
  } catch (error) {
    next(error);
  }
};

exports.deletePerfume = async (req, res, next) => {
  try {
    await req.perfume.destroy();
    res.status(204).end(); //to tell no content and end response
  } catch (error) {
    next(error);
  }
};

exports.updatePerfume = async (req, res, next) => {
  try {
    if (req.file) req.body.image = `http://${req.get("host")}/${req.file.path}`;
    const updatedPerfume = await req.perfume.update(req.body);
    res.json(updatedPerfume);
  } catch (error) {
    next(error);
  }
};
