const express = require('express');
const cassandra = require('cassandra-driver');

// Set up express app
const app = express();
const port = process.env.PORT || 3001;

// Connect to CassandraDB
const client = new cassandra.Client({
    contactPoints: ['127.0.0.1:9042'], // NO ABSOLUTE PATH, this should be an argument ?
    localDataCenter: 'spade',
    keyspace: 'store'
});

// Routes
app.get('/', (req, res) => {
    // Get cookie in req
    // If cookie in DB
        // Return all basket data
    // If no cookie in DB
        // Create new basket in DB with associated cookie
});

app.get('/basket/insert', (req, res) => {
    // Get all information in request body
    // Format all information in CQL
    // Apply CQL transaction to DB
});

app.get('/basket/remove', (req, res) => {
    //
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
