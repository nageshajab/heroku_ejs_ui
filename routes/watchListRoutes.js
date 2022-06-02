var watchlistservice = require('../services/watchListService');
var middleware = require('../middleware');

module.exports = function (app) {
    app.get('/', middleware.validateUser, function (req, res) {
        console.log('in wwatch list route');
        const getData = async function getData() {
            try {
                var result = await watchlistservice.list(req);
                console.log('result is ' + JSON.stringify(result));
                res.render('pages/index', {
                    'data': result
                });
            } catch (err) {
                res.render('pages/login', {
                    'msg': err.status + err.msg
                });
            }
        }
        getData();
    });
}