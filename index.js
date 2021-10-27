const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

// Intialize our node js application
const app = express();

// Routes
app.get("/", (req, res) => {
  res.json("You are at home of Web Scraper Node Js Project");
});

const url = "https://www.theguardian.com/uk";
axios.get(url).then((response) => {
  const html = response.data;
  const articles = [];
  const $ = cheerio.load(html);
  $(".fc-item__title", html).each(function () {
    const title = $(this).text();
    const url = $(this).find("a").attr("href");
    articles.push({
      title,
      url,
    });
  });
  console.log(articles);
});
// port listening
const port = process.env.PORT || 5000;
app.listen(port, (_) => console.log(`Server running on port ${port}`));
