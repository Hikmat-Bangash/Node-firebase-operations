const express = require('express') ;
const router = require("./routers/basic.router.js");
const dotenv = require("dotenv");
const app = express();

dotenv.config();
app.use(express.json());
const PORT = 8080;

// ---------- custom middlewares ----------
app.use("/v1", router);

app.listen(PORT, () => { 
    console.log("the app is listening at: ", PORT);
})