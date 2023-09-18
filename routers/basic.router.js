
const express = require("express");
const { CreateData, GetAllUsers, UserData, UpdateUserdata, DeleteUserdata } = require("../controller/index.controller.js");

const router = express.Router();


router.post("/createData", CreateData); // create user data
router.get("/retrieveData", GetAllUsers); // retrieve all user data
router.get("/user/:id", UserData); //retrieve specific user data
router.post("/update/:id", UpdateUserdata); //update specific user data
router.delete("/delete/:id", DeleteUserdata); //Delete specific user data


module.exports = router;