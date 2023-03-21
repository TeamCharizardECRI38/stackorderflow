const { Links, Projects } = require('../database');
const axios = require('axios');
const cheerio = require('cheerio');

const linkControllers = {
  createLink: async (req, res, next) => {
    try {
      const { link, comment, tags, favorite } = req.body;
      const { title, topAnswer } = res.locals;

      const linkObj = await Links.create({
        Title: title,
        Link: link,
        Comment: comment,
        Tags: tags,
        Favorite: favorite,
        TopAnswer: topAnswer,
      });
      res.locals.linkObj = linkObj;

      return next();
    } catch (err) {
      const errMessage = {
        log: `Express error handler caught createLink error: ${err}`,
        status: 400,
        message: {
          err: 'An error creating a new link from the provided data occurred',
        },
      };

      return next(errMessage);
    }
  },
  addLinkToProject: async (req, res, next) => {
    try {
      const { link } = res.locals.linkObj;
      const { id } = res.locals.projectId;

      const project = await Projects.findOneAndUpdate(
        { _id: id },
        {
          $push: {
            Links: link,
          },
        },
        { new: true }
      );
      res.locals.project = project;
      return next();
    } catch (err) {
      const errMessage = {
        log: `Express error handler caught addLinkToProject error: ${err}`,
        status: 400,
        message: {
          err: 'An error adding a new link to a project occurred',
        },
      };

      return next(errMessage);
    }
  },
  updateLink: async (req, res, next) => {
    try {
      const { id, comment, tags, favorite } = req.body;
      const updatedLink = await Links.findOneAndUpdate(
        { _id: id },
        {
          Comment: comment,
          Tags: tags,
          Favorite: favorite,
        },
        { new: true }
      );
      res.locals.updatedLinkObj = updatedLink;
      return next();
    } catch (err) {
      const errMessage = {
        log: `Express error handler caught updateLink error: ${err}`,
        status: 400,
        message: {
          err: 'An error updating a link occurred',
        },
      };
      return next(errMessage);
    }
  },
  updateLinkInProject: async (req, res, next) => {
    const link = res.locals.updatedLinkObj;
    const projectId = req.body.projectId;
    const linkId = req.body.id;
  },
  deleteLink: async (req, res, next) => {},
  getLink: async (req, res, next) => {},
  scrapeLink: async (req, res, next) => {
    try {
      const url =
        'https://stackoverflow.com/questions/35181989/how-to-remove-the-hash-from-the-url-in-react-router';
      const website = await axios(url);
      const $ = cheerio.load(website.data);
      const title = $('h1 > a').text();
      const topAnswer = $('div[data-position-on-page="1"]')
        .find('div[class="s-prose js-post-body"]')
        .html();

      res.locals.title = title;
      res.locals.topAnswer = JSON.stringify(topAnswer);
      return next();
    } catch (err) {
      const errMessage = {
        log: `Express error handler caught scrapeLink error: ${err}`,
        status: 400,
        message: {
          err: 'An error scraping data from the provided link occurred',
        },
      };

      return next(errMessage);
    }
  },
};

module.exports = linkControllers;
