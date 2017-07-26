/**
 * Created by ParikanshAndAtikant on 17/07/2017.
 */
var mysql = require('mysql');

var dbconfig = {
    host : 'localhost',
    user : 'parimatrix',
    password : '19011998',
    database: 'timeup'
};
function Notifications(query,cb) {
    var connection = mysql.createConnection(dbconfig);
    connection.connect();
    connection.query(query,function (err,data) {
        if(err) throw err;
        cb(data);
        console.log(data);
        connection.end();
    });
}
module.exports =   {
    notification : Notifications
};