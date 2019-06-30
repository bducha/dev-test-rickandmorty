module.exports = function(app) {
    //Enabling CORS for developpement otherwise authentification won't work because
    //the front-end developpement server and the abck-end server are not running on
    //the same port
    const allowCrossDomain = function(req, res, next) {
        var methodOverride = require('method-override')
        app.use(methodOverride());
        res.header('Access-Control-Allow-Credentials', true);
        res.header('Access-Control-Allow-Origin', req.headers.origin);
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

        // intercept OPTIONS method
        if ('OPTIONS' == req.method) {
            res.send(200);
        }
        else {
            next();
        }
    };
    app.use(allowCrossDomain);    
};
// https://stackoverflow.com/a/26416682/10918788