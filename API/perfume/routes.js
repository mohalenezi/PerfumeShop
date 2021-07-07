const express = require("express");

const {
  perfumeFetch,
  deletePerfume,
  createPerfume,
  updatePerfume,
  fetchPerfume,
} = require("./controllers");

const multer = require("multer");
const router = express.Router();

// parameter middleware (param)
router.param("perfumeId", async (req, res, next, perfumeId) => {
  const perfume = await fetchPerfume(perfumeId, next);
  if (perfume) {
    req.perfume = perfume;
    next();
  } else {
    const error = new Error("perfume Not Found.");
    error.status = 404;
    next(error);
  }
});

// multer middleware ======//
const storage = multer.diskStorage({
  destination: "./media",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage });

//////////// Routes ////////////

//// list ////
router.get("/", perfumeFetch);
// JSON = JavaScript Object Notation

//// delete ////
router.delete("/:perfumeId", deletePerfume);

//// create ////
router.post("/", upload.single("image"), createPerfume);

//// update copyied method from delete //* ////
router.put("/:perfumeId", upload.single("image"), updatePerfume);

module.exports = router;
