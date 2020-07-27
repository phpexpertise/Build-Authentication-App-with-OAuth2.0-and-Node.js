const router = require('express').Router();
const passport = require('passport');
const googleoAuth = require('../oauth/google.oauth');
const User = require('../models/user.model');

function isUserAuthenticated(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.redirect('/');
    }
}

router.get('/', function(req, res) {
    res.render('pages/auth');
});

router.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
 
router.get('/oauth2callback', passport.authenticate('google', { failureRedirect: '/error' }),
    function(req, res) {
        // Successful authentication, redirect success.
        res.redirect('/user/account');
    }
);

router.get('/user/account', isUserAuthenticated, (req, res) => {
    if (req.user.id) {
        User.findById(req.user.id, function (err, user) {
            if (err) {
                console.log("ERROR" + err)
            }
            res.render('pages/success', { result: user });
        });
    } else {
        return res.status(201).json({message: "Invalid access"});
    }
});

router.get('/error', (req, res) => res.send("error logging in"));

router.get("/auth/google/redirect",passport.authenticate("google", { scope: ['profile', 'email'] }),(req,res)=>{
    res.send(req.user);
    res.send("you reached the redirect URI");
});

router.get("/auth/logout", (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;
