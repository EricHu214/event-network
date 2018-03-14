module.exports = function(app, passport) {
    // home page
    app.get('/', function(req, res) {
        res.send('hello there');
    });
};
