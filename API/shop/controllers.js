const { Shop, Perfume } = require("../../db/models");

exports.fetchShop = async (shopId, next) => {
  try {
    const shop = await Shop.findByPk(shopId);
    return shop;
  } catch (error) {
    next(error);
  }
};

exports.shopFetch = async (req, res, next) => {
  try {
    const shops = await Shop.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: {
        model: Perfume,
        as: "perfumes",
        attributes: ["id"],
      },
    });
    res.json(shops);
  } catch (error) {
    next(error);
  }
};

exports.createShop = async (req, res, next) => {
  try {
    if (req.file) req.body.image = `http://${req.get("host")}/${req.file.path}`;
    const newShop = await Shop.create(req.body);
    res.status(201).json(newShop); // response end with created perfume
  } catch (error) {
    next(error);
  }
};

exports.createPerfume = async (req, res, next) => {
  try {
    if (req.file) req.body.image = `http://${req.get("host")}/${req.file.path}`;
    req.body.shopId = req.shop.id;
    const newPerfume = await Perfume.create(req.body);
    res.status(201).json(newPerfume); // response end with created perfume
  } catch (error) {
    next(error);
  }
};
