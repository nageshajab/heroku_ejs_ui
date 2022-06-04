const axios = require('axios');
const req = require('express/lib/request');

exports.list = async function list(req) {
    return new Promise(function (resolve, reject) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Length':'',// data.length,
                'Bearer': req.session.token
            }
        };
        var data = {};
        axios.post(`${process.env.BASE_URI}/watchlist/list`, data, config)
            .then((res) => {
   //             console.log(res.status);
                if (res.status === 200)
                    resolve(res.data);

            })
            .catch(err => {
     //           console.log(err);
                if (err.response.status == 401) {
                    reject({
                        'status': 401,
                        'msg': 'Unauthorized, invalid username or password'
                    });
                } else {
                    reject({
                        'status': err.response.status,
                        'msg': String(err).substring(0, 100)
                    });
                }
            });
    });
}

exports.delete = async function delete1(req) {
    return new Promise(function (resolve, reject) {
      //  console.log('deleting watch list ' + req.body.id);
        const config = {
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Length':'',// data.length,
                'Bearer': req.session.token
            }
        };
        var data = {
            id: req.body.id
        };
        axios.post(`${process.env.BASE_URI}/watchlist/delete`, data, config)
            .then((res) => {
         //       console.log(res.status);
               // if (res.status === 200)
                    resolve(res.data);
            })
            .catch(err => {
           //     console.log(err);
                if (err.response.status == 401) {
                    reject({
                        'status': 401,
                        'msg': 'Unauthorized, invalid username or password'
                    });
                } else {
                    reject({
                        'status': err.response.status,
                        'msg': String(err).substring(0, 100)
                    });
                }
            });
    });
}