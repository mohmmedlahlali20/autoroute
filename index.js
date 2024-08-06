const express = require('express');
const mysql = require('mysql');
const path = require('path');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const conn = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'autorout'
});

app.get('/', (req, res) => {
    conn.query('SELECT * FROM vehicule', (err, results) => {
        if (err) {
            return res.status(500).send('Database query error');
        }
        res.render('index', { vehicles: results, Title: 'Vehicles List' });
    });
});

app.get('/add', (req, res) => {
    res.render('create', { Title: 'Add new vehicle' });
});

app.post('/add', (req, res) => {
    const { type, immatriculation, louee, user_id } = req.body;
    const isLouee = louee ? 1 : 0;
    const immatriculationInt = parseInt(immatriculation, 10);

    const query = 'INSERT INTO vehicule (type, immatriculation, louee, user_id) VALUES (?, ?, ?, ?)';
    conn.query(query, [type, immatriculationInt, isLouee, user_id], (err, results) => {
        if (err) {
            console.error('Database insert error: ', err);
            return res.status(500).send('Database insert error: ' + err.message);
        }
        res.redirect('/');
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
