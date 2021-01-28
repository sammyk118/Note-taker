const fs = require('fs');
const path = require('path');

module.exports = app => {

    app.get("/api/notes", function (req, res) {
        if (noteData = JSON.parse(fs.readFileSync("./db/db.json", "utf8"))) {
            res.json(noteData);
        }
        else
            console.log("empty json file")
    });

    app.get("/api/notes/:id", function (req, res) {
        let noteData = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
        var note = req.params.id;

        console.log("get each note", note);
        // for (var i = 0; i < noteData.length; i++){
        //   if (note === noteData[i].id) {
        //     console.log(note);
        //     console.log(noteData[i].id)
        //   }     
        // }
        res.JSON(noteData[req.params.id]);
    })

    app.post("/api/notes", function (req, res) {
        let noteData = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
        if (noteData === undefined) {
            console.log("empty db");

        }
        else {
            req.body.id = noteData.length;
            console.log("note data: ", noteData)
            console.log(noteData.length);
            // console.log((noteData[noteData.length - 1].id) + 1);
            noteData.push(req.body);
            fs.writeFileSync("./db/db.json", JSON.stringify(noteData));
            console.log("saved to json file: ", req.body);
            res.json(noteData);
        }
    });

    app.delete("/api/notes/:id", function (req, res) {
        let noteData = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
        noteData.splice(req.params.id, 1);

        fs.writeFileSync("./db/db.json", JSON.stringify(noteData));
        console.log("delete note", req.params.id);
        res.json(noteData);
    });




    app.get("/notes", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/notes.html"));
    });

    app.get("*", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    })

}