const { Users, Projects, Links } = require("../database");

const projectControllers = {
  createProject: async (req, res, next) => {
    try {
      const project = await Projects.create({ Name: req.body.name });
      console.log(project);
      res.locals.projectObj = project;
      res.locals.projectId = project._id;
      return next();
    } catch (err) {
      const errMessage = {
        log: `Express error handler caught createProject error: ${err}`,
        status: 400,
        message: {
          err: "An error creating a new project from the provided data occurred",
        },
      };

      return next(errMessage);
    }
  },
  addProjectToUser: async (req, res, next) => {
    try {
      const project = res.locals.project;
      const userId = req.body.userId;
      const user = await Users.findByIdAndUpdate(
        userId,
        {
          $push: { Projects: project },
        },
        { new: true }
      );
      res.locals.user = user;
      res.locals.projects = user.Projects;
      return next();
    } catch (err) {
      const errMessage = {
        log: `Express error handler caught addProjectToUser error: ${err}`,
        status: 400,
        message: {
          err: "An error associating a project with a user occurred",
        },
      };

      return next(errMessage);
    }
  },
  // findProject: async(req),
};

module.exports = projectControllers;
