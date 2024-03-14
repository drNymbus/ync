# User database

```SQL
CREATE TABLE user (
    discord_id INTEGER PRIMARY KEY,
    cookie_id VARCHAR(32)
);
```

# Routes

## '/'

From the cookie sent from React we try to find the user in the database.
If no cookie is found
    We redirect to the discord api
Else
    From the discord api we gather user information (username, picture, email)
    We send those informations to React

## auth/discord

passport.js handles this part

## auth/discord/callback

if the user is already in the database
    we update his cookie
else
    we create a new cookie/discord_id profile