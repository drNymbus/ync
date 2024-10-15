// Dependencies
const express = require('express');

// Configure & Run the http server
const app = express();

app.use(express.static(__dirname, { dotfiles: 'allow' } ));

app.route('/').get((req, res) => { res.send("HELLO WORLD WIDE WEB!") });

app.listen(8080, () => {
    console.log('HTTP server running on port 80');
});