import mysql from 'mysql2/promise'

const connection = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    typeCast: function (field, next) {
        if (field.type === 'TINY' && field.length === 1) {
          return field.string() === '1';
        }
        return next();
    }
})

console.log("Conexão com o banco de dados realizada")
export default connection;