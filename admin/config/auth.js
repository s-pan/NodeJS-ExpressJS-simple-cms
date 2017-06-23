module.exports = {
  isAuth: (req, res, next) => {
    if (req.isAuthenticated()) {
      if(req.url == '/login'){
          return res.redirect('/admin')
      } 
      return next()
    } 
   
    if (req.url !== '/login' && req.url !== '/user/authenticate') {
        return res.redirect('/admin/login');    
     } 
     return next()
    }
}