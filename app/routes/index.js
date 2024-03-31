var express = require('express');
var router = express.Router();

const userModel = require('./users');
const postsModel = require('./posts');
const { use } = require('moongose/routes');
const posts = require('./posts');
const passport = require('passport');
// User Login LIne Below -2
const localStrategy = require('passport-local');
passport.use(new localStrategy(userModel.authenticate()));
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index.ejs');
});

router.get('/profile',isLoggedIn, function (req, res, next) {
  res.send('profile');
});

router.post('/login',passport.authenticate('local',{
  successRedirect: '/profile',
  failureRedirect : '/',
}), function (req, res) {
});

  
// write a password code
router.post('/register', function (req, res) {
  const { username, email, fullname } = req.body; // Destructuring req.body
  const userData = new userModel({ username, email, fullname });
  
  userModel.register(userData, req.body.password)
  .then(function (){
    passport.authenticate("local")(req, res, function (){
      res.redirect('/profile');
    })
  })

});

router.get('/logout',function(req,res){
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

function isLoggedIn(req,res,next){
  if( req.isAuthenticated()) return next();
  res.redirect("/");
}


// router.get('/allusers',async function (req, res, next) {
//  let user = await userModel.findOne({_id:"6603e69c02c747b3a2e3487a"}).populate('posts');
//  res.send(user);
// });



// router.get('/createpost', async function (req, res, next) {
//   let createdpost = await postsModel.create({
//     postText: "Hello kese ho shb !",
//     user:"6603e69c02c747b3a2e3487a"
//   });


//   let user = await userModel.findOne({_id:"6603e69c02c747b3a2e3487a"});
//   user.posts.push(createdpost._id);
//   await user.save();
//   res.send('done');
// });
// router.get('/createuser', async function (req, res, next) {
//   let createduser = await userModel.create({
//     username: 'Yash',
//     password: "yashhh",

//     email: "yash@gmail.com",
//     fullName: "yash agarwal",
//   })
//   res.send(createduser);
// });



module.exports = router;
