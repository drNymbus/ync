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

With those recommandations in mind, we only need to add to the pre-existing traefik configuration.

- [k3s docs](https://docs.k3s.io/networking/networking-services)
- [traefik docs](https://doc.traefik.io/traefik/routing/routers/#path-pathprefix-and-pathregexp)

Thanks to the ingress route command in Traefik:

```yaml
ingressRoute:
```

For each new route we connect an IngressRoute to the desired service:

```yaml
# Define IngressRoute for '/route' path to redirect to service on port 12345
- kind: IngressRoute
name: redirect-root
namespace: kube-system
spec:
    entryPoints:
    - web
    routes:
    - match: PathPrefix(`/route`)
        kind: Rule
        services:
        - name: service
            port: 12345
```

Once your yaml file is complete, you can add it to `/var/lib/rancher/k3s/server/manifests/` and restart the cluster so that those changes (those new routes can be applied)

<!-- __Warning__: While modifying the default configuration of the k3s service, you might end up with a k3s service that won't restart. In case the error is due to missing files (such as "k3s-server" or "k3s-agent"), you can fix this by re-"installing" or downloading the k3s with the command: `curl -sfL https://get.k3s.io | sh -`; if you're looking for a specific version run this command instead: `curl -sfL https://get.k3s.io 23 | INSTALL_K3S_VERSION=<k3s-version> sh -s - server` -->