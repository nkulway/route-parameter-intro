const http = require("http");
const express = require("express");
const db = require("./db");

const hostname = "127.0.0.1";
const port = 3000;

const app = express();

const server = http.createServer(app);

app.get("/favicon.ico", (req, res) => {
  res.send("");
});

app.get('/friend', (req, res) => {
    let html = `<ul>`;
    for (let friend of db){
        html += `<li>
        <a href="${req.path}${friend.handle}">${friend.name}</a>
        </i>`
    }
    html += `</ul>`
    res.send(html)
});

app.get("/friend/:handle", (req, res) => {
  const { handle } = req.params;
  const friend = db.find((f) => f.handle === handle);
  if (friend) {
    let html = ``;
    html += `<h1>${friend.name}</h1>`;
    html += `<h3>${friend.handle}</h3>`;
    html += `<h3>${friend.skill}</h3>`;
    res.send(html);
  } else {
      res.status(404)
      send(`no friend with handle ${handle}`)
  }
});

app.get("*", (req, res) => {
  res.status(404);
  res.send("Page Not Found");
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
