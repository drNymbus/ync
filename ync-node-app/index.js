const express = require('express');
const fs = require('fs');
const cassandra = require('cassandra-driver');
const cookieParser = require('cookie-parser');

// Set up express app
const app = express();
const port = process.env.PORT || 3000;

// Connect to CassandraDB
const client = new cassandra.Client({
    contactPoints: [process.env.CASSANDRA_CONTACT_POINTS || '127.0.0.1'],
    localDataCenter: 'spade',
    keyspace: 'store'
});

app.use(cookieParser()); // Hand over the secret string for signed cookies

let visits = {'/home':0, '/insert':0, '/delete':0};

// Routes
app.get('/', (req, res) => {
    visits['/home'] += 1;
    console.log(visits);

    // client.execute('SELECT * FROM store.basket;')
    //     .then(result => console.log(result));

    // Get cookie in req
    // If cookie in DB
        // Return all basket data
    // If no cookie in DB
        // Create new basket in DB with associated cookie
});

app.post('/basket/insert', (req, res) => {
    visits['/insert'] += 1;
    console.log(visits);

    // client.execute('SELECT * FROM store.basket;')
    //     .then(result => console.log(result));

    // Get cookie in req
});

app.delete('/basket/remove', (req, res) => {
    visits['/delete'] += 1;
    console.log(visits);

    // client.execute('SELECT * FROM store.basket;')
    //     .then(result => console.log(result));

    // Get cookie in req
    // SELECT * FROM store.basket WHERE 
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
