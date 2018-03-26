const mainController = require('../controllers/main.controller.js');

module.exports = function(app, passport) {
    // home page
    app.get('/home', function(req, res) {
        res.send('hello there ohoho');
    });

    // seed sample user
    app.get('/seedUser', mainController.seedUser);

    // process the login form
    app.post('/login', mainController.login);

    // process the signup form
    app.post('/signup', mainController.signup);


    app.post('/Jacky_add', mainController.Jacky_add);
};

function loggedIn(req, res, next) {
    if (req.user) {
        next();
        return true;
    } else {
        res.redirect('/login');
        return false;
    }
}
