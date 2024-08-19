# DNS

Namecheap: yn-corp.xyz

A Record: IPV4
AAAA Record: IPV6

# Reverse Proxy

Redirect all incoming requests to the specfied service

    - All http requests should be redirected to an https one.
    - paths:
        - "/api/<service-name>": redirect to an api
        - "/<service-name>": redirect to a webapp

The most common solution has been used: Apache httpd.

# Ingress Controller

As a load balancer for the kubernetes cluster will be an ingress controller. It will be responsible to redirect to the service based on the url given.

# Apache APISIX

https://apisix.apache.org/docs/ingress-controller/deployments/k3s-rke/