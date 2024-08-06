const {
    createPool

} =  require('mysql');

const conn =  createPool({
    host : "localhost",
    user : "root",
    password : "",
    database : "autorout"
})

conn.query("select * from vehicule", (err, result  ,filed) => {
    if(err) {
        return console.log(err);
    }
    return console.log(result);

})


console.log("database connected");