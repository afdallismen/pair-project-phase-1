function checkLogin (req, res, next){
    if(!req.session.login){
        res.redirect('/login')
    }else{
        next()
    }
}

module.exports = checkLogin