// ==============================================================================
// DEPENDENCIES
// Series of npm packages that we will use to give our server useful functionality
// ==============================================================================

var express = require("express");
var path = require("path");
const fs = require("fs");
// ==============================================================================
// EXPRESS CONFIGURATION
// This sets up the basic properties for our express server
// ==============================================================================

// Tells node that we are creating an "express" server
var app = express();

// Sets an initial port. We"ll use this later in our listener
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));



// ================================================================================
// ROUTER
// The below points our server to a series of "route" files.
// These routes give our server a "map" of how to respond when users visit or request data from various URLs.
// ================================================================================








app.get("/api/notes", function (req, res) {
  let noteData = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  res.json(noteData);
});

app.get("/api/notes/:id", function (req, res) {
  let noteData = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  var note = req.params.id;

  console.log(note);
  for (var i = 0; i < noteData.length; i++){
    if (note === noteData[i].id) {
      console.log(note);
      console.log(noteData[i].id)
    }     
  }
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
  res.json(true);
});

app.delete("/api/clear", function (req, res) {
  console.log("this will delete things");
});




app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});


// var apiRoutes = require("./routes/apiRoutes")
// console.log(apiRoutes); //=> [Function]
// apiRoutes(app);

// =============================================================================
// LISTENER
// The below code effectively "starts" our server
// =============================================================================

app.listen(PORT, function () {
  console.log("App listening on PORT: " + PORT);
});
