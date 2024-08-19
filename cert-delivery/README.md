# Obtaining a Certificate

Thanks to [Let's Encrypt](https://letsencrypt.org/), this task is easy. Using the 'certbot' service, you can receive a certificate by proving the domain is yours. To do so, the certbot gives a "challenge" (basically a string held in a file) to be dowloaded at a url. This component runs an api giving access to all dotfiles. For our purposes, we also defined a Dockerfile and YAML file to run this API.

Finally, all information about the delivered certficate can be found at: `/etc/letsencrypt/live/<domain>/*`