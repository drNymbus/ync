const express = require('express');

const fs = require('fs');

const app = express();
const port = process.env.PORT || 3001;

// Connect to CassandraDB

// Routes
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
