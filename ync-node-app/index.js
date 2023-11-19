const express = require('express');
const session = require('express-session');

const passport = require('passport');
const DiscordStrategy = require('passport-discord');

const secretData = require('./little-secrets-shall-be-kept.json');

const app = express();
const port = process.env.PORT || 3000;

// Connect to DB

// Set up sessions
app.use(session({
    secret: 'session-secret',
    resave: false,
    saveUninitialized: false,
}));

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Discord OAuth2 configuration
passport.use(new DiscordStrategy({
    clientID: secretData.discord.id,
    clientSecret: secretData.discord.secret,
    callbackURL: 'http://localhost:3000/auth/discord/callback',
    scope: 'identify'
}, async (accessToken, refreshToken, profile, done) => {
    // Handle the user profile from Discord and save it to the database
    const user = undefined;
    console.log(profile.id, profile.username);
    return done(null, user);
}));

// Serialize/deserialize user for sessions
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
    const user = undefined;
    done(null, user);
});

// Routes
app.get('/', (req, res) => { 
    res.sendFile('./html/index.html', {root: __dirname});
});

app.get('/auth/discord', passport.authenticate('discord'));
app.get('/auth/discord/callback',
    passport.authenticate('discord', { failureRedirect: '/' }), (req, res) => {
        // Successful authentication, redirect to the home page or another route
        res.redirect('/');
    }
);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
