// axios request
// axios
//     .get('https://api.github.com/users/'+username+'/repos')
//     .then(({data}) => {
//       setReposList(data)
//       console.log(data)
//     })
// import axios from 'axios'

const axios = require('axios');

const db = require("../models");
const User = db.user
const Repository = db.repository

exports.check = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    //validates the request
    if (!req.body.login) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    const username = req.body.login

    //checks if there is any user by that name in the database
    User.find({ login: username })
    .then(data => {
      if (!(data.length === 0)){ // if the user exists, get its repositories and answer with that

        const owner_id = data[0].gitid
        //get its repositories and answer with that
        Repository.find({ owner_id : owner_id })
        .then(data => {
            if (!data){
                res.status(404).send({ message: "Not found repository with id " + owner_id });
            } else {
              console.log(data)
              res.send(data);
            }
        })
        .catch(err => {
        res
            .status(500)
            .send({ message: "Error retrieving repository with id=" + owner_id + "error : "+err });
        });
      } else {
        // if it doesnt, create a new user and repos to it
        axios
        // .get('https://api.github.com/users/'+username+'/repos')
        .get('https://api.github.com/orgs/'+username+'/repos')
        .then(({data}) => {
            const repos = data.slice(0,10)
            const dataUser = repos[0].owner
            const user = new User({
                gitid: dataUser.id,
            login: dataUser.login,
            avatar_url: dataUser.avatar_url
            })

            user.save(user)

            const reposSaved = [];

            console.log(repos)

            repos.forEach(repo => {
                const new_repo = Repository({
                    name: repo.name,
                    full_name: repo.full_name,
                    created_at: repo.created_at,
                    url: repo.html_url,
                    owner_id: dataUser.id,
                    languages: repo.language,
                    repo_id: repo.id
                })
                reposSaved.push(new_repo)
                new_repo.save(new_repo)
            });

            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

            console.log(reposSaved)
            res.send(reposSaved)

            
            })

      }
    //     res.status(404).send({ message: "Not found user with id " + id });
    //   else res.send(data);
    })

    



}

// Create and Save a new User
exports.create = (req, res) => {
    console.log('create')

    // checks if it already exists on the repo

    // if exists, return repos

    // if not, create
  
    // Create a User
    const user = new User({
        gitid: req.body.gitid,
        login: req.body.login,
        avatar_url: req.body.img
    });
  
    // Save User in the database
    user
      .save(user)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the User."
        });
      });
  };

// Retrieve all Repositories from the database.
exports.findAll = (req, res) => {
    const user = req.query.name;
    var condition = user ? { user: { $regex: new RegExp(user), $options: "i" } } : {};
  
    User.find(condition)
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

// Find a single User with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found user with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving user with id=" + id });
    });
};