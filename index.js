var mysql = require('mysql');

var con = mysql.createConnection({
    host: "rds-frmnjn-instance.ceiw2asdbppx.us-east-1.rds.amazonaws.com",
    user: "frmnjn",
    password: "12345678",
    database: "SetiaRasaDB"
});

var sql, jumlah;

exports.handler = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    if(event.path == "/menu" && event.queryStringParameters == null){
        sql = "SELECT * FROM makanan";
    } else if(event.path == "/menu" && event.queryStringParameters != null){
        sql = "SELECT * FROM makanan where id=" + event.queryStringParameters.id;
    } else if(event.path == "/order" && event.queryStringParameters != null){
        let body = JSON.parse(event.body);
        jumlah = body.jumlah;
        sql = "SELECT JumlahStok FROM makanan WHERE id=" + event.queryStringParameters.id;
    }

    con.connect(function (err) {
        if (err) throw err;
        con.query(sql, function (err, result, fields) {
            if (err) throw err;
            if(event.path == "/menu"){
                callback(null, { "statusCode": 200, "body": JSON.stringify(result) });
            } else {
                var obj;
                if(jumlah <= result[0].JumlahStok){
                    obj = { status:"OK" };
                } else {
                    obj = { status:"GAGAL" };
                }
                callback(null, { "statusCode": 200, "body": JSON.stringify(obj) });
            }
        });
    });
}