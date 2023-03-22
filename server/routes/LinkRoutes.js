const express = require('express');
const { link } = require('fs');
const router = express.Router();

const linkController = require('../controllers/linkController');

router.get('/allLinks', linkController.getAllLinks, (req, res) => {
  res.status(200).json(res.locals.allLinks);
});

module.exports = router;
