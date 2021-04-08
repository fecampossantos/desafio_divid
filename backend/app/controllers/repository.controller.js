// axios request
// axios
//     .get('https://api.github.com/users/'+username+'/repos')
//     .then(({data}) => {
//       setReposList(data)
//       console.log(data)
//     })

const db = require("../models");
const Repository = db.repository

// Create and Save a new Repository
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }

    // checks if it already exists on the repo

    // if exists, return repos

    // if not, create
  
    // Create a Repository
    const repository = new Repository({
      name: req.body.name,
      full_name: req.body.full_name,
      created_at: req.body.created_at,
      url: req.body.url,
      owner_id: req.body.owner_id,
      owner_username: req.body.owner_username,
      owner_img: req.body.owner_img,
      owner_url: req.body.owner_url,
      languages: req.body.languages
    });
  
    // Save Repository in the database
    repository
      .save(repository)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Repository."
        });
      });
  };

// Retrieve all Repositories from the database.
exports.findAll = (req, res) => {
    const user = req.query.username;
    var condition = user ? { user: { $regex: new RegExp(user), $options: "i" } } : {};
  
    Repository.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
  };

// Find a single Repository with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Repository.find({repo_id : id})
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found repository with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving repository with id=" + id + " -- " + err });
    });
};