var mysql = require('mysql');

var con = mysql.createConnection({
    host     : "rds-frmnjn-instance.ceiw2asdbppx.us-east-1.rds.amazonaws.com",
    user     : "frmnjn",
    password : "12345678",
    database : "SetiaRasaDB"
});

var sql_create_table = "CREATE TABLE makanan (ID INT NOT NULL AUTO_INCREMENT, NamaMenuMakanan VARCHAR(255) NOT NULL, JumlahStok INT NOT NULL, PRIMARY KEY (ID));";
var sql_insert_into_table = "INSERT INTO makanan (NamaMenuMakanan, JumlahStok) VALUES('Pecel Lele', 20),('Ayam Goreng', 30),('Telur Dadar', 50),('Cah Kangkung', 25);";
var sql_select = "SELECT * FROM makanan;";
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected");

  con.query(sql_create_table, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });

  con.query(sql_insert_into_table, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });

  con.query(sql_select, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
});