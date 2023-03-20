const express = require('express');
const router = express.Router();
const { Users, Projects, Links } = require('../database');

router.get('/', (req, res, next) => {
  Users.create({
    Name: req.body.username,
    Password: req.body.password,
  })
    .then((user) => {
      console.log('success');
      res.status(200).send('you did it');
    })
    .catch((err) => {
      console.log('something went wrong');
      return next(err);
    });
});

router.get(
  '/addprojects',
  (req, res, next) => {
    Projects.create({
      Name: req.body.name,
    })
      .then((project) => {
        console.log('project update successful');
        res.locals.project = project;
        return next();
      })
      .catch((err) => {
        console.log('something went wrong');
        return next(err);
      });
  },
  (req, res, next) => {
    Users.findOneAndUpdate(
      { Name: req.body.username },
      {
        $push: {
          Projects: res.locals.project,
        },
      },
      //returns the new updated pet
      { new: true }
    )
      .then((updatedUser) => {
        console.log('user update successful');
        res.status(200).json(updatedUser);
      })
      .catch((err) => {
        console.log('something went wrong');
        return next(err);
      });
  }
);

router.get(
  '/addLink',
  (req, res, next) => {
    Links.create({
      Title: req.body.title,
      Link: req.body.link,
      Comment: req.body.comment,
      Tags: req.body.tags,
      Favorite: req.body.favorite,
    })
      .then((link) => {
        console.log('link creation successful');
        res.locals.newLink = link;
        return next();
      })
      .catch((err) => {
        console.log('something went wrong while creating a new link');
        return next(err);
      });
  },
  (req, res, next) => {
    Projects.findOneAndUpdate(
      { Name: req.body.projectname },
      {
        $push: {
          Links: res.locals.newLink,
        },
      },
      //returns the new updated pet
      { new: true }
    )
      .then((updatedProject) => {
        console.log('project update successful ' + updatedProject);
        res.status(200).json(updatedProject);
      })
      .catch((err) => {
        console.log('something went wrong');
        return next(err);
      });
  }
);
module.exports = router;
