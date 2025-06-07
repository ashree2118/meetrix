import express from "express";
const app = express();

app.get("/test", (req, res) => {
    res.send("Test route working!");
});

app.listen(3000, () => {
    console.log("Test server running on port 3000");
});