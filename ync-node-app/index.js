const express = require('express');
const fs = require('fs');
const cassandra = require('cassandra-driver');
const cookieParser = require('cookie-parser');

// Set up express app
const app = express();
const port = process.env.PORT || 3001;

// Connect to CassandraDB
const client = new cassandra.Client({
    contactPoints: [process.env.CASSANDRA_CONTACT_POINTS || '127.0.0.1'],
    localDataCenter: 'spade',
    keyspace: 'store'
});

app.use(cookieParser()); // Hand over the secret string for signed cookies

// Routes
app.get('/', (req, res) => {
    console.log('Hi from /' + req.cookies);
    client.execute('SELECT * FROM store.basket;')
        .then(result => console.log(result));
      // Get cookie in req
    // If cookie in DB
        // Return all basket data
    // If no cookie in DB
        // Create new basket in DB with associated cookie
});

app.post('/basket/insert', (req, res) => {
    console.log('Hi from /basket/insert' + req.cookies);
    client.execute('SELECT * FROM store.basket;')
        .then(result => console.log(result));
    // Get cookie in req
});

app.delete('/basket/remove', (req, res) => {
    console.log('Hi from /basket/remove' + req.cookies);
    client.execute('SELECT * FROM store.basket;')
        .then(result => console.log(result));
    // Get cookie in req
    // SELECT * FROM store.basket WHERE 
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
