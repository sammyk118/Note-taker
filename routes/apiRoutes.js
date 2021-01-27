var noteData = require("../db/db");


module.exports = function (app) {
    app.get("/api/notes", function (req, res) {
        res.json(noteData);
    });


    app.post("/api/notes", function (req, res) {
        noteData.push(req.body);
    });

    app.put("/api/clear", function (req, res) {
        console.log("this will delete things");
    })
}