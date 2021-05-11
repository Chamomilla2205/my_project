const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');

require('dotenv').config();
const db = require('./dataBase/MySQL').getInit();
const apiRouter = require('./router/api.router');
const Sentry= require('./logger/sentry');
const cronRun = require('./cron-jobs');
const {PORT} = require('./config/config');

db.setModels();

const app = express();

app.use(Sentry.Handlers.requestHandler());

app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(process.cwd(), 'static')));

app.use('/', apiRouter);

app.use(Sentry.Handlers.errorHandler());

app.use('*', (err, req, res, next) => {
    Sentry.captureException(err)

    res
        .status(err.status || 500)
        .json({
            customCode: err.customCode || 0,
            message: err.message || ''
        });
});

app.listen(PORT, () => {
    console.log(`App listen ${PORT}`);
    cronRun()
});
