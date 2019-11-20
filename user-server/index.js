const express= require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
let x = "'amy'";
const SELECT_ALL_PRODUCTS_QUERY = "SELECT  FROM accounts ";

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'ebusiness',
    database: 'simple-react-sql-db'
});

connection.connect(err => {
    if (err) {
        return err;
    }
});

app.use(cors());

app.get('/', (req, res) => {
    res.send('go to /user to see users')
});

app.get('/users/add', (req, res) => {
    const { email, password, phone_number} = req.query;
    const INSERT_PRODUCTS_QUERY = 'INSERT INTO accounts (email,password,phone_number) VALUES(?,?,?)';
    let values = [email , password,phone_number ] ;
    connection.query(INSERT_PRODUCTS_QUERY,values, (err, results) => {
        if (err) {
            return res.send(err);
        }
        else {
            return res.send("successfully added");
        }
    });
    
});


app.get('/users/find', (req, res) => {
    const { email } = req.query;
    console.log("look here:"+{ email });
    const FIND_PRODUCTS_QUERY = 'SELECT password,phone_number FROM accounts WHERE email=?';
    let value = [email];
    connection.query(FIND_PRODUCTS_QUERY, value, (err, results) => {
        if (err) {
            
            return res.send(err);
        }
        else {

            return res.json({
                data: results
            })
        }
    });

})

app.get('/users', (req, res) => {
    connection.query(SELECT_ALL_PRODUCTS_QUERY, (err, results) => {
        if (err) {
            return res.send(err);
        }
        else {
            return res.json({
                data: results
            })
        }

    });
})
app.listen(4000, () => {
    console.log('Products server listening on port 4000')
    

});


