const path = require("path");
const express = require("express");
const hbs = require("hbs");
const app = express();
const borders = require("../utils/borders");
const gecode = require("../utils/gecode");
const dpath = path.join(__dirname, "../public");
const pview = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");
const port = process.env.PORT || 3000;
console.log(partialPath);
app.set("view engine", "hbs");
app.set("views", pview);
hbs.registerPartials(partialPath);

app.use(express.static(dpath));
app.get("", (req, res) => {
  res.render("index", { title: "wheatharApp", name: "omar nero" });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About page", name: "omarnero" });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "About page",
    name: "omarnero",
    message: "help page is now ",
  });
});
app.get("/whethar", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "you must have an adress in search" });
  }
  const name = req.query.address;

  borders(name, (error, { name } = {}) => {
    if (error) {
      console.log("error in data");
    }
    gecode(name, (error, { country, lang, long }) => {
      if (error) {
        console.log("error in lang or long");
      }
      res.send({
        country: country,
        lang: lang,
        long: long,
        city: req.query.address,
      });
    });
  });
});

app.get("/products", (req, res) => {
  console.log(req.query);
  if (!req.query.search) {
    return res.send({ error: "you muse have a search term" });
  }
  res.send({
    products: [],
  });
});
app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Error Page",
    name: "omar nero",
    message: "Help page not found 404 ",
  });
});
app.get("*", (req, res) => {
  res.render("404", {
    title: "Error Page",
    name: "omar nero",
    message: "page not found 404 ",
  });
});
app.listen(port, () => {
  console.log("the server is run correct" + port);
});
