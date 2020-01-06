const model = require('./person')

const endpoint = require('node-restful')
                  .model('Person', model)
                  .methods(['get', 'post', 'put', 'delete'])
                  .updateOptions({new: true, runValidators: true})

module.exports = endpoint