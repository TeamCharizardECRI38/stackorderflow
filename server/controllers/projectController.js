const { Users, Projects, Links } = require("../database");

const projectControllers = {
  createProject: async (req, res, next) => {
    try {
      const link = res.locals.linkObj;
      const project = await Projects.findOneAndUpdate(
        { Name: req.body.name },
        {
          Name: req.body.name,
          $push: {
            Links: link,
          },
        },
        { upsert: true, new: true }
      );
      res.locals.projectObj = project;
      res.locals.projectId = project._id.toString();
      //   console.log(project._id.toString());
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
      const project = res.locals.projectObj;
      const userId = req.body.userId;
      const user = await Users.findByIdAndUpdate(
        userId,
        {
          $addToSet: { Projects: project },
        },
        { new: true }
      ).populate({
        path: "Projects",
        model: "Projects",
        populate: [
          {
            path: "Links",
            model: "Links",
          },
        ],
      });
      //   res.locals.user = await user.populate('Projects');
      console.log("user", user);
      res.locals.user = user;
      //   const projects = await user
      //   console.log('user', projects);
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
  deleteProject: async (req, res, next) => {
    try {
      const id = req.body.projectId;
      const deletedProject = await Projects.findByIdAndRemove(id);
      res.locals.deletedProject = deletedProject;
      return next();
    } catch (err) {
      const errMessage = {
        log: `Express error handler caught deleteProject error: ${err}`,
        status: 400,
        message: {
          err: "An error deleting a project occurred",
        },
      };

      return next(errMessage);
    }
  },
  deleteLinkFromProject: async (req, res, next) => {
    try {
      const user = await Projects.findByIdAndUpdate(
        req.body.projectId,
        {
          $pull: { Links: req.body.linkId },
        },
        { new: true }
      ).populate({
        path: "Projects",
        model: "Projects",
        populate: [
          {
            path: "Links",
            model: "Links",
          },
        ],
      });
      res.locals.user = user;
      return next();
    } catch (err) {}
  },
};

module.exports = projectControllers;
