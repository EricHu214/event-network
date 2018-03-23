const mainController = require('../controllers/main.controller.js');

module.exports = function(app, passport) {
    // home page
    app.get('/home', function(req, res) {
        res.send('hello there');
    });

    app.get('/test', mainController.test);
};
