const fs = require('fs');
const path = require('path');

module.exports = app => {

    app.get("/api/notes", function (req, res) {
        let noteData = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
        res.json(noteData);
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
        res.JSON(noteData[Number(req.params.id)]);
    })
  
    app.post("/api/notes", function (req, res) {
        let noteData = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
        console.log("body", req.body);
        var title = req.body.title;
        var text = req.body.text;
        var id = noteData.length;
        let note = { title, text, id };
        noteData.push(note);
        fs.writeFileSync("./db/db.json", JSON.stringify(noteData));
        console.log("saved to json file: ", note);
        res.json(noteData);
    });
  
    app.delete("/api/notes/:id", function (req, res) {
        let noteData = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
        let note = req.body;
        noteData = noteData.filter(currNote => {
            return currNote.id != note.id;
        })
  
        idCount = 0;
        for (currNote of noteData) {
            currNote.id = idCount.toString();
            idCount++;
        }
  
        fs.writeFileSync("./db/db.json", JSON.stringify(noteData));
        res.json(noteData);
    });
  
  
  
  
    app.get("/notes", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/notes.html"));
    });
  
    app.get("*", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    })
    
}