const express = require("express");
const path = require("path");
const app = express();

// this is the file to run when running react build (in production)

app.use(express.static("build"));
app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "build", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("http://localhost:" + PORT));
