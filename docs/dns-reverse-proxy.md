# DNS

Namecheap: yn-corp.xyz

A Record: IPV4
AAAA Record: IPV6

# Reverse Proxy

Redirect all incoming requests to a specfic service depending on the URL given. K3S natively uses Traefik, so we'll just add to the basic configuration of Traefik.

- [Modifying an packaged component](https://docs.k3s.io/helm#customizing-packaged-components-with-helmchartconfig)
- [Configuring Traefik to route traffic based on the URL](https://doc.traefik.io/traefik/routing/routers/#configuration-example)

# K3S Traefik

In k3s configuration we can find an already configured traefik. We can find this paragraph in the Networking Services tab of the documentation:

> The `traefik.yaml` file should not be edited manually, as K3s will replace the file with defaults at startup. Instead, you should customize Traefik by creating an additional `HelmChartConfig` manifest in `/var/lib/rancher/k3s/server/manifests`. For more details and an example see [Customizing Packaged Components](https://docs.k3s.io/helm#customizing-packaged-components-with-helmchartconfig) with `HelmChartConfig`. For more information on the possible configuration values, refer to the official [Traefik Helm Configuration Parameters](https://github.com/traefik/traefik-helm-chart/tree/master/traefik).

So K3s pre-installed and configured traefik for us ! This is great news ! We now only need to add/configure [ingress routes](https://kubernetes.io/docs/concepts/services-networking/ingress/) for each service that we wish to make available.

----

Additional resources:

- [k3s docs](https://docs.k3s.io/networking/networking-services)
- [traefik docs](https://doc.traefik.io/traefik/routing/routers/#path-pathprefix-and-pathregexp)

- [Great tutorial](https://www.youtube.com/watch?v=n5dpQLqOfqM), explaining everything from traefik config to ingress routes

Ingress route example:

    apiVersion: networking.k8s.io/v1
    kind: Ingress
    metadata:
    name: cert-delivery
    annotations:
        ingressClassName: traefik
    spec:
    rules:
    - http:
        paths:
        - path: /
            pathType: Prefix
            backend:
            service:
                name: cert-delivery
                port:
                number: 80

<!-- __Warning__: While modifying the default configuration of the k3s service, you might end up with a k3s service that won't restart. In case the error is due to missing files (such as "k3s-server" or "k3s-agent"), you can fix this by re-"installing" or downloading the k3s with the command: `curl -sfL https://get.k3s.io | sh -`; if you're looking for a specific version run this command instead: `curl -sfL https://get.k3s.io 23 | INSTALL_K3S_VERSION=<k3s-version> sh -s - server` -->