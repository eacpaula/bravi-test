var express = require('express');
var router = express.Router();

module.exports = function(server){
  server.use('/api', router)
  
  const personEndpoint = require('../endpoints/person')
  personEndpoint.register(router, '/person')
};