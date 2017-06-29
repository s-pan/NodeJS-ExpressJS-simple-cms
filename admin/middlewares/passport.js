let passport = require('passport'), 
    LocalPassport = require('passport-local'),
    adminUser = require('../config/schema').adminUsers;


module.exports = () => {
  passport.use(new LocalPassport({
    usernameField: 'username',
    passwordField: 'password'
  },
  (username, password, done) => {
    adminUser
      .findOne({ username: username })
      .then(user => {
        if (!user) return done(null, false)
        if (!user.authenticate(password)) return done(null, false)
        return done(null, user)
      })
  }))

  passport.serializeUser((user, done) => {
    if (user) return done(null, user._id)
  })

  passport.deserializeUser((id, done) => {
    adminUser.findById(id).then(user => {
      if (!user) return done(null, false)
      return done(null, user)
    })
  })
}

