const express = require('express');

const fs = require('fs');

const app = express();
const port = process.env.PORT || 3001;

// Connect to CassandraDB

// Routes
app.get('/create', (req, res) => {

});
app.get('/insert', (req, res) => {

});
app.get('/remove', (req, res) => {

});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
