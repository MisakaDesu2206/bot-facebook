require("dotenv").config();
const login = require("@app/login");
const { Sequelize, sequelize, Op } = require("@database");
const logger = require("@logger");
const { email, password, appStateFile } = require("@config");
const fs = require("fs");
const __GLOBAL = new Object({
    threadBlocked: new Array(),
    userBlocked: new Array(),
    swearList: new Array(),
    confirm: new Array(),
});
var express = require('express');
var app     = express();

app.set('port', (process.env.PORT || 5000));

//For avoidong Heroku $PORT error
app.get('/', function(request, response) {
    var result = 'App is running'
    response.send(result);
}).listen(app.get('port'), function() {
    console.log('App is running, server is listening on port ', app.get('port'));
});

facebook = ({ Op, models }) => login({ email, password, appState: require(appStateFile) }, function (error, api) {
    if (error) return logger(error, 2);
    fs.writeFileSync(appStateFile, JSON.stringify(api.getAppState(), null, '\t'));
    logger('Đăng nhập thành công!', 0);
    //Listening
    api.listen(require("@app/listen")({ api, Op, models, __GLOBAL }))
})
sequelize.authenticate()
    .then(() => logger('Connect database thành công!', 0), () => logger('Connect database thất bại!', 2))
    .then(() => {
        let models = require("@database/model")({ Sequelize, sequelize });
        facebook({ Op, models });
    })
    .catch((e) => {

        logger(`${e.stack}`, 2);
        // console.error(e);
    })