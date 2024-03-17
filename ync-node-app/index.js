const express = require('express');
const cassandra = require('cassandra-driver');

// Set up express app
const app = express();
const port = process.env.PORT || 3001;

// Connect to CassandraDB
const client = new cassandra.Client({
    contactPoints: ['127.0.0.1:9042'],
    localDataCenter: 'spade',
    keyspace: 'store'
});

client.execute('SELECT * FROM store.basket;')
    .then(result => { console.log(result); });

// Routes
app.get('/', (req, res) => {

});

app.get('/basket/create', (req, res) => {

});

app.get('/basket/insert', (req, res) => {

});

app.get('/basket/remove', (req, res) => {

});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
