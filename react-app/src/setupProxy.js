const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(proxy(
      ['**/*.model.json', '**/*.jpg', '**/*.jpeg', '**/*.png'], 
      { 
          target: process.env.REACT_APP_API_HOST,
          auth: process.env.REACT_APP_AEM_ADMIN_AUTH
    }
    ));
};