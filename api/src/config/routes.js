
const routes = {
    'GET /users': 'UserController.findAll',
    'GET /users/:id': 'UserController.findOne',
    'POST /users': 'UserController.create',
    'PUT /users/:id': 'UserController.update',
    'DELETE /users/:ids': 'UserController.removeMultiple',
};
module.exports = routes;