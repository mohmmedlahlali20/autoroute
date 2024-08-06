const express = require('express');
const mysql = require('mysql');
const path = require('path');
const app = express();
const port = 3000;
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const conn = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'autorout'
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    conn.query('SELECT * FROM vehicule', (err, results) => {
        if (err) {
            return res.status(500).send('Database query error');
        }
        res.render('index', { vehicles: results });
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
