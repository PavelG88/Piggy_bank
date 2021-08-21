const mysql = require('mysql');
const express = require('express');
const app = express();

const connection = mysql.createConnection ({
    host: 'localhost',
    port: 3306,
    user: 'root',
    // password: 'Olga240584',
    password: '7ujm&UJM',
    database: 'targets_users'
});

const cors = require('cors');
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

connection.connect((error) => {
    if (!error) {
        console.log("Мы подключены к БД")
    }
})

app.get('/', (request, response) => {    
    connection.query(`SELECT * FROM table_target;`, (error, data) => {       
        response.setHeader('Access-Control-Allow-Origin', "http://localhost:3000");
        if (error || data.length === 0) {
            response.status(400).json(error);
            return;
        }
        
        response.status(200).json(data);
    })     
})

app.delete('/:id', (request, response) => {
    // response.setHeader('Access-Control-Allow-Origin', "http://localhost:3000");
    // res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
    connection.query(`DELETE FROM table_target WHERE id = ${request.params.id};`, (error, data) => {
        
        if (error || data.affectesRows === 0) {
            console.log(error); 
            response.status(500).json(error);
        } else {
            response.status(200).json(data);
        }
    });
});

// app.post('/', (request, response) => {
//     const {task_description, due_date, employee, finished_date} = request.body;
    
//     connection.query(`
//             INSERT INTO table_target (targetName, targetCost, finishDate, initialPayment, depositInterest, monthPayment, accumulatedMoney, createDate)
//             VALUES ("${task_description}", "${due_date}", "${employee}", "${finished_date}");
//         `, 
//         (error, data) => {
//             if (error) {
//                 console.log(error); 
//                 response.status(403).json(error);
//                 return;
//             }
//     });
// });

app.listen(3001, () => {
    console.log('сервер запущен')
})
