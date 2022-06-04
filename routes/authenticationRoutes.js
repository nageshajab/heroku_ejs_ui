var userService = require('../services/user-service');
var common = require('../common');
var middleware = require('../middleware');

module.exports = function (app) {
    //authentication
    app.get('/login', middleware.addEnvironmentVariablesToResponse, function (req, res) {
        var envVariables = common.getEnvVariables(req);
        res.render('pages/login', res.body
        // {
        //     'msg': '',
        //     sessiontoken: envVariables.sessiontoken,
        //     //   DB_URI: envVariables.DB_URI
        // }
        );
    });

    app.post('/login', function (req, res) {
        const generateToken = async function generateToken() {
            try {
                var result = await userService.generateToken(req.body.username, req.body.password);
                //  console.log('result is ' + result);
                req.session.token = result;
                res.redirect('/');
            } catch (err) {
                res.render('pages/login', {
                    'msg': err.status + err.msg,
                    sessiontoken: require('../common').getSessionToken(req),
                    DB_URI: common.getEnvVariables()
                });
            }
        }
        generateToken();
    });
}