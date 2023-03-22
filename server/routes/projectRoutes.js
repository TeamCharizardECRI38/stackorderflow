const express = require('express');
const linkController = require('../controllers/linkController');
const projectController = require('../controllers/projectController');
const userController = require('../controllers/userController');

const router = express.Router();

router.post(
  '/createLink',
  linkController.scrapeLink,
  linkController.createLink,
  projectController.createProject,
  projectController.addProjectToUser,
  (req, res) => {
    res.status(201).json(res.locals.user);
  }
);

router.patch(
  '/updateLink',
  linkController.updateLink,
  userController.findUser,
  (req, res) => {
    res.status(200).json(res.locals.userFound);
  }
);

router.put(
  '/deleteProject',
  projectController.deleteProject,
  userController.deleteUserProjects,
  (req, res) => {
    res.status(200).json(res.locals.user);
  }
);

router.put(
  '/deleteLink',
  linkController.deleteLink,
  projectController.deleteLinkFromProject,
  userController.findUser,
  (req, res) => {
    res.status(200).json(res.locals.userFound);
  }
);

module.exports = router;
