// sets the routes (url access) to repositories

module.exports = app => {
    const user = require("../controllers/user.controller.js")
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", user.create);
  
    // Retrieve all Tutorials
    router.get("/", user.findAll);
  
    // // Retrieve a single Tutorial with id
    // router.get("/:id", user.findOne);

    // Retrieve a single Tutorial with id
    router.post("/check", user.check);

    app.use('/user', router);
};