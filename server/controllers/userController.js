const { Users } = require('../database');
require('dotenv').config();

const userControllers = {
  findUser: async (req, res, next) => {
    try {
      const id = req.body.userId;
      const user = await Users.findById(id).populate({
        path: 'Projects',
        model: 'Projects',
        populate: [
          {
            path: 'Links',
            model: 'Links',
          },
        ],
      });
      res.locals.userFound = user;
      return next();
    } catch (err) {
      const errorMessage = {
        log: `Express error handler caught in findUser middleware error: ${err}`,
        status: 400,
        message: { err: 'Unable to find the user' },
      };
      return next(errorMessage);
    }
  },
  deleteUserProjects: async (req, res, next) => {
    try {
      const id = req.body.userId;

      const user = await Users.findByIdAndUpdate(
        id,
        {
          $pull: { Projects: req.body.projectId },
        },
        { new: true }
      );
      res.locals.user = user;
      return next();
    } catch (err) {
      const errorMessage = {
        log: `Express error handler caught in deleteUserProjects middleware error: ${err}`,
        status: 400,
        message: { err: 'Unable to delete project the user' },
      };
      return next(errorMessage);
    }
  },
};

module.exports = userControllers;
