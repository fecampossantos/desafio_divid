// sets the routes (url access) to repositories

module.exports = app => {
    const repo = require("../controllers/repository.controller.js")
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", repo.create);
  
    // // Retrieve all Tutorials
    // router.get("/", repo.findAll);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", repo.findOne);

    app.use('/repository', router);
};