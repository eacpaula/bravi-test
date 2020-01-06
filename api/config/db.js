const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const {
    DB_USERNAME,
    DB_PASSWORD,
    DB_HOSTNAME,
    DB_PORT
} = process.env;

const DB_DATABASE = process.env.NODE_ENV == 'test' ? `${process.env.DB_DATABASE}_test` : process.env.DB_DATABASE

const url = `mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOSTNAME}:${DB_PORT}/${DB_DATABASE}?authSource=admin`;

module.exports = mongoose
    .connect(url, { 
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then((result) => {
        console.log('Database Connected!')
    })
    .catch(err => {
        console.log(Error, err.message);
    });