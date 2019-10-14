const mysql = require('mysql');
const path = require('path');

module.exports = function(app, connection){
    app.get('/', function(req, res){
        //res.send('Hello');
        connection.query('SELECT * FROM new_table', function(err, data){
            (err) ? res.send (err):res.json({new_table:data});
        });
    });
};