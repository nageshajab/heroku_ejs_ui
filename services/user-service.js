const axios = require('axios');

exports.generateToken = async function generateToken(username1, password1) {
    return new Promise(function (resolve, reject) {
        //console.log('user-service generating token');
        const data = JSON.stringify({
            username: username1,
            password: password1
        });
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': data.length,
            }
        };
        //console.log(process.env.BASE_URI);
        axios.post(`${process.env.BASE_URI}/user/generateToken`, data, config)
            .then((res) => {
                // console.log(res.data + res.status);
          //      console.log(typeof res.status);
                if (res.status === 200)
                    resolve(res.data);

            })
            .catch(err => {
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