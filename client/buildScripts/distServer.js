import express from "express";
import path from "path";
import open from "open";
import compression from "compression";

/* eslint-disable no-console */

const port = 3000;
const app = express();

app.use(compression());
app.use(express.static("dist"));

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../dist/index.html"));
});

app.get("/trips", function(req, res) {
    //Hard coding for simplicity. Pretend this hits a real database
    res.json([
        { "id": 1, "name": "Cancun", "expenses": [], "total": 0 },
        { "id": 2, "name": "Vancouver", "expenses": [], "total": 0 },
        { "id": 3, "name": "Hawaii", "expenses": [], "total": 0 }
    ]);
});

app.listen(port, function(err) {
    if (err) {
        console.log(err);
    } else {
        open("http://localhost:" + port);
    }
});