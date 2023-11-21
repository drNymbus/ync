const express = require('express');
const session = require('express-session');
const crypto = require('crypto');

const fs = require('fs');

const passport = require('passport');
const DiscordStrategy = require('passport-discord');

const secretData = require('./little-secrets-shall-be-kept.json');

const app = express();
const port = process.env.PORT || 3001;

// Connect to DB

// Set up sessions
app.use(session({
    secret: crypto.randomBytes(32).toString('hex'),
    resave: false,
    saveUninitialized: false,
    cookie: {secure: true}
}));

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Discord OAuth2 configuration
passport.use(new DiscordStrategy({
    clientID: secretData.discord.id,
    clientSecret: secretData.discord.secret,
    callbackURL: 'http://localhost:3001/auth/discord/callback',
    scope: 'identify'
}, async (accessToken, refreshToken, profile, done) => {
    // Handle the user profile from Discord and save it to the database
    const user = JSON.stringify(profile, null, 2);
    fs.writeFile('./user.json', user, (err) => { console.log(err); });
    return done(null, profile);
}));

// Serialize/deserialize user for sessions
passport.serializeUser((user, done) => {
    console.log('serializing...');
    console.log(user.id);
    done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
    // const user = undefined;
    console.log('deserializing...');
    done(null, id);
});

// Routes
app.get('/', (req, res) => { 
    console.log(session.secret);
    res.sendFile('./html/index.html', {root: __dirname});
});
app.get('/auth/discord', passport.authenticate('discord'));
app.get('/auth/discord/callback',
    passport.authenticate('discord', { failureRedirect: '/?failed=true' }), (req, res) => {
        // Successful authentication, redirect to the home page or another route
        console.log(session.secret);
        res.redirect('/?failed=false');
    }
);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
