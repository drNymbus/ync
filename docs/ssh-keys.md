# Github SSH key authentication

First create a key adding as a comment your email address linked to your github account:

    ssh-keygen -t ed25519 -C "your_email@example.com"

Choose a location and passphrase then go to `https://github.com/settings/keys` to add the generated public key to your github account. Now you can fetch, pull and push to your repositories.

# SSH Keypair authentication
