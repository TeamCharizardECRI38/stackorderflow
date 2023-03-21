const { Users } = require('../database');
require('dotenv').config();

userControllers = {
  createUser: async (req, res, next) => {
    try {
      const user = await Users.create({
        Name: req.body.username,
        Password: res.locals.password,
      });
    } catch (err) {
      const errorMessage = {
        log: `Express error handler caught in createUser middleware error: ${err}`,
        status: 400,
        message: { err: 'Unable to create a new user' },
      };
    }
  },
  loginUser: async (req, res, next) => {},
  checkDuplicates: async (req, res, next) => {},
  encryptUserData: async (req, res, next) => {},
};
