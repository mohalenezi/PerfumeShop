let perfumes = require("../../products");
const slugify = require("slugify");

exports.perfumeFetch = (req, res) => {
  res.json(perfumes);
};

exports.deletePerfume = (req, res) => {
  const { perfumeId } = req.params;
  const foundPerfume = perfumes.find((perfume) => perfume.id === +perfumeId);
  if (foundPerfume) {
    perfumes = perfumes.filter((perfume) => perfume.id !== +perfumeId);
    res.status(204).end(); //to tell no content and end response
  } else {
    //if the id was not in the identified list this message will appear
    res.status(404).json({ message: "Perfume Not Found." });
  }
};

exports.createPerfume = (req, res) => {
  const id = perfumes.length + 1;
  const slug = slugify(req.body.name, { lower: true });
  const newPerfume = {
    id,
    slug,
    ...req.body,
  };
  perfumes.push(newPerfume);
  res.status(201).json(newPerfume); // response end with created perfume
};

exports.updatePerfume = (req, res) => {
  //*
  const { perfumeId } = req.params; //*
  const foundPerfume = perfumes.find((perfume) => perfume.id === +perfumeId); //*
  if (foundPerfume) {
    //*
    for (const key in req.body) foundPerfume[key] = req.body[key]; //loop over the keys variable which are the attributes in each object at the array
    foundPerfume.slug = slugify(foundPerfume.name, { lower: true });
    res.status(204).end(); //to tell no content and end response //*
  } else {
    //*
    //if the id was not in the identified list this message will appear
    res.status(404).json({ message: "Perfume Not Found." });
  }
};
