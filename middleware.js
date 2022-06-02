'use strict'

exports.validateUser=function(req,res,next){
    if(req.session.token === undefined){
        res.redirect('/login');
    }
    else{
        next();
    }
}