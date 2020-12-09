const express = require('express');
const app = express();
const mysql = require('mysql');
const port = process.env.PORT || 5000;

let pool = mysql.createPool({
    connectionLimit : 10,
    host            : '35.188.42.74',
    user            : 'root',
    password        : 'Aca2020',
    database        : 'admin',
    debug           : false
})

const get_users = (req, res) => {
    pool.query('SELECT * FROM users', (err, rows) => {
        if(err) {
            return res.json({
                'error': true,
                'message': 'Error occured' + err
            })
        } else {
            res.json(rows)
        }
    })
}

const get_first_names= (req, res) => {
    let sql = 'SELECT ??, ?? FROM ?? WHERE ?? < ?';
    const replacements = ['id', 'first_name', 'users', 'id', 10];
    sql = mysql.format(sql, replacements)
    pool.query(sql, (err, rows) => {
        if(err) {
            return res.json({
                'error': true,
                'message': 'Error occured' + err
            })
        } else {
            res.json(rows)
        }
    })
}

app.get('/', (req, res) => {
    get_users(req, res)
})

app.get('/first', (req, res) => {
    get_first_names(req, res)
})
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});