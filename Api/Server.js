const mysql = require('mysql');
const express = require('express');
const app = express();

const connection = mysql.createConnection ({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Olga240584',
    database: 'targets_users'
});

connection.connect((error) => {
    if (!error) {
        console.log("Мы подключены к БД")
    }
})

app.get('/', (request, response) => {
        
        
        connection.query(`SELECT * FROM table_target;`, (err, data) => {
             
              if (err || data.length === 0) {
                response.status(400).json("not");
                return;
              }
    
              console.log(data);
              response.setHeader('Access-Control-Allow-Origin', "http://localhost:3000")
              response.json(data);
        })     
    })

app.listen(3001, () => {
    console.log('сервер запущен')
})
