const config = require("../config");
const init = require("./init");
const express = require("express");

const app = express();

// Serve static files
app.use(express.static("dist/client"));

// Import API routes / middleware
app.use("/api", require("./middleware"), require("./routes"));

// Fallback for unknown requests
app.get("*", (req, res) => {
    res.sendFile(process.cwd() + "/dist/client/index.html");
});

// Start the server
app.listen(config.port, init);
