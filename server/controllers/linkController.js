const { Links, Projects, Users } = require('../database');
const axios = require('axios');
const cheerio = require('cheerio');

const linkControllers = {
  createLink: async (req, res, next) => {
    try {
      const { link, comment, tags } = req.body;
      const { title, topAnswer } = res.locals;

      const linkObj = await Links.create({
        Title: title,
        Link: link,
        Comment: comment,
        Tags: tags,
        // Favorite: favorite,
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
      res.locals.updatedLinkId = updatedLink._id.toString();
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
  deleteLink: async (req, res, next) => {},
  getLink: async (req, res, next) => {},
  scrapeLink: async (req, res, next) => {
    try {
      const url = req.body.link;
      const website = await axios(url);
      const $ = cheerio.load(website.data);
      const title = $('h1 > a').text();
      const topAnswer = $('div[data-position-on-page="1"]')
        .find('div[class="s-prose js-post-body"]')
        .html();

      const css = $('div[data-position-on-page="1"]').find(
        'div[class="s-prose js-post-body"]'
      );

      console.log(css);

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
  deleteLink: async (req, res, next) => {
    try {
      const id = req.body.linkId;
      const deletedLink = await Links.findByIdAndRemove(id);
      res.locals.deletedLink = deletedLink;
      return next();
    } catch (err) {
      const errMessage = {
        log: `Express error handler caught deleteLink error: ${err}`,
        status: 400,
        message: {
          err: 'An deleting the link occurred',
        },
      };

      return next(errMessage);
    }
  },
  getAllLinks: async (req, res, next) => {
    try {
      const id = req.body.userId;

      const projects = await Users.findById(id, 'Projects').populate({
        path: 'Projects',
        model: 'Projects',
        populate: [
          {
            path: 'Links',
            model: 'Links',
          },
        ],
      });
      const links = projects.Projects.map((project) => {
        const projectLinks = project.Links.map((link) => {
          return link.Tags;
        });
        return projectLinks;
      });
      res.locals.allLinks = links.flat(Infinity);
      return next();
    } catch (err) {
      const errMessage = {
        log: `Express error handler caught getAllLinks error: ${err}`,
        status: 400,
        message: {
          err: 'An error getting all links occurred',
        },
      };

      return next(errMessage);
    }
  },
  getAllLinks: async (req, res, next) => {
    try {
      const id = req.body.userId;

      const projects = await Users.findById(id, 'Projects').populate({
        path: 'Projects',
        model: 'Projects',
        populate: [
          {
            path: 'Links',
            model: 'Links',
          },
        ],
      });
      const links = projects.Projects.map((project) => {
        const projectLinks = project.Links.map((link) => {
          return link.Tags;
        });
        return projectLinks;
      });
      res.locals.allLinks = links.flat(Infinity);
      return next();
    } catch (err) {
      return next(err);
    }
  },
};

module.exports = linkControllers;
