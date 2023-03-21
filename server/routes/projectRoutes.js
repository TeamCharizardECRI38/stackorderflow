const express = require('express');
const linkController = require('../controllers/linkController');
const projectController = require('../controllers/projectController');

const router = express.Router();

router.post(
  '/createProject',
  projectController.createProject,
  linkController.scrapeLink,
  linkController.createLink,
  linkController.addLinkToProject,
  projectController.addProjectToUser,
  (req, res) => {
    res.status(201).json(res.locals.projects);
  }
);

module.exports = router;
