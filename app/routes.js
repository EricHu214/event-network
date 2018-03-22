module.exports = function(app, passport) {
    // home page
    app.get('/', function(req, res) {
        res.render('../client/public/index.html');
    });
};
