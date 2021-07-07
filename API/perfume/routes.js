const { Router } = require("express");
const express = require("express");

const {
  perfumeFetch,
  deletePerfume,
  createPerfume,
  updatePerfume,
  fetchPerfume,
} = require("./controllers");
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

//////////// Routes ////////////

//// list ////
router.get("/", perfumeFetch);
// JSON = JavaScript Object Notation

//// delete ////
router.delete("/:perfumeId", deletePerfume);

//// create ////
router.post("/", createPerfume);

//// update copyied items from delete //* ////
router.put("/:perfumeId", updatePerfume);

module.exports = router;
