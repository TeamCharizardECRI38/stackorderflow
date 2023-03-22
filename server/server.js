const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const cors = require('cors');
const controller = require('./controllers/linkController');
const projectRouter = require('./routes/projectRoutes');
const jwt = require('jsonwebtoken');
const linkRouter = require('./routes/linkRoutes');
// const credentialController = require('./controllers/credentialController');
// const jwt = require('jsonwebtoken');

const app = express();

const apiRouter = require('./routes/api');

const PORT = process.env.PORT || 3000;

/**
 * Automatically parse urlencoded body content and form data from incoming requests and place it
 * in req.body
 */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);
app.use(cookieParser());

app.use(express.static(path.resolve(__dirname, '../src')));

app.use('/api', apiRouter);
app.use('/projects', projectRouter);
app.use('/links', linkRouter);

// controller.scrapeLink();

//Define Route handlers Here
//---------------
// app.use('/api', apiRouter);

// app.post(
//   '/getLambdaNames',
//   credentialController.getCredentials,
//   listLambdasController.getLambdas,
//   // lambdaLogsController.getLambdaLogs,
//   // rdsMetricsController.getRDSCPUUtilizationMetrics,
//   (req, res) => {
//     return res.status(200).json(res.locals.lambdaNames);
//   }
// );

//Default Express Error Handler here
//____________
app.use((err, req, res, next) => {
  const defaultErr = {
    log: `Express error handler caught unknown middleware error: ${err}`,
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

//Start Server
//__________

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});

module.exports = app;
