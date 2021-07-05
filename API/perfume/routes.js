const { Router } = require("express");
const express = require("express");

const {
  perfumeFetch,
  deletePerfume,
  createPerfume,
  updatePerfume,
} = require("./controllers");

const router = express.Router();

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
