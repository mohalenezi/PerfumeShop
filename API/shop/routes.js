const express = require("express");
const multer = require("multer");
const passport = require("passport");

const {
  shopFetch,
  createShop,
  createPerfume,
  fetchShop,
} = require("./controllers");
const router = express.Router();

// multer middleware ======//
const storage = multer.diskStorage({
  destination: "./media",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage });

// parameter middleware (param)
router.param("shopId", async (req, res, next, shopId) => {
  const shop = await fetchShop(shopId, next);
  if (shop) {
    req.shop = shop;
    next();
  } else {
    const error = new Error("shop Not Found.");
    error.status = 404;
    next(error);
  }
});

//// list ////
router.get("/", shopFetch);

//// create ////
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  createShop
);

/// create a perfume in a shop

router.post(
  "/:shopId/perfumes",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  createPerfume
);

module.exports = router;
