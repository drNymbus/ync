// Dependencies
const express = require('express');

// Configure & Run the http server
const app = express();
const port = 8080;

app.use(express.static(__dirname, { dotfiles: 'allow' } ));

app.route('/').get((req, res) => { res.send("HELLO WORLD WIDE WEB!") });

app.listen(port, () => {
    console.log(`HTTP server running on port ${port}`);
});