let express = require("express");
let {Dummy} = require("../controller/index.controller")
let TestingRoute = express.Router();

TestingRoute.get("/testing", async (req, res) => {
    res.send("This is just for testing purpose.")
})

TestingRoute.get("/dummy",Dummy)

module.exports = TestingRoute;