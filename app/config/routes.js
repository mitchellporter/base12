/**
 * Setup routes
 */

exports = module.exports = function() {
  
  server.get('/', controllers.auth.is_not_user, controllers.home.index);
  server.get('/login', controllers.users.login);
  server.post('/login', controllers.auth.create_session);
  server.get('/register', controllers.users['new']);
  server.post('/register', controllers.users.create);
  server.get('/logout', controllers.auth.destroy_session);

  // fallback for controller/action loading

  server.all('/:controller/:action?/:id?', controllers.auth.is_user, findControllerAction);

};


// function to find controller and action matching route
// if not found, send to 404 page
function findControllerAction(req, res, next) {
  var controller = req.params.controller,
      action = req.params.action || 'index',
      id = req.params.id;

  if (controllers[controller] && controllers[controller][action]) {
    controllers[controller][action](req, res, next);
  }
  else {
    res.error = "Page not found";
    controllers.home.error(req, res, next);
  }
}
