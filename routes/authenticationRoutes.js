var userService = require('../services/user-service');

module.exports = function (app) {
    //authentication
    app.get('/login', function (req, res) {
        res.render('pages/login', {
            'msg': ''
        });
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
                    'msg': err.status + err.msg
                });
            }
        }
        generateToken();
    });
}