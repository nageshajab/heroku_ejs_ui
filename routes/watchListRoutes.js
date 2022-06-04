var watchlistservice = require('../services/watchListService');
var middleware = require('../middleware');

module.exports = function (app) {
    app.get('/', middleware.validateUser, function (req, res) {
      //  console.log('in wwatch list route');
        const getData = async function getData() {
            try {
                var result = await watchlistservice.list(req);
               // console.log('result is ' + JSON.stringify(result));
                res.render('pages/index', {
                    'data': result,
                    sessiontoken: require('../common').getSessionToken(req),
                    'msg':''
                });
            } catch (err) {
                res.render('pages/login', {
                    'msg': err.status + err.msg,
                    sessiontoken: require('../common').getSessionToken(req)
                });
            }
        }
        getData();
    });

    app.post('/watchlist/delete', middleware.validateUser, function (req, res) {
       //   console.log(req.body.id);
          const deleteData = async function deleteData() {
              try {
                  var result = await watchlistservice.delete(req);
                 // console.log('result is ' + JSON.stringify(result));
                  res.render('pages/index', {
                      'data': result,
                      sessiontoken: require('../common').getSessionToken(req),
                      'msg':'deleted ',
                      DB_URI:common.getEnvVariables()
                  });
              } catch (err) {
                  res.render('pages/index', {
                      'msg': err.status + err.msg,
                      sessiontoken: require('../common').getSessionToken(req),
                      DB_URI:common.getEnvVariables()
                  });
              }
          }
          deleteData();
      });
}