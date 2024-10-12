see also some kubernetes / k8s stuff:

- [kubernetes](/man/kubernetes)
- [kubectl](/man/kubectl)

----

# chmod

- 1 = execution
- 2 = writing
- 4 = reading

-R : recusive

# k8s

## set default namespace

```
kubectl config get-contexts
    kubectl config set-context --current --namespace=kube-system
```

# k3s

## cleanup unused images

that's how things start. cleanup unused images, sometimes I need to do that and besides what kubernetes things since other stuff is also running on the same system (I know).

**list images:**

```
sudo k3s crictl images
```

**delete images not currently in use:**

```
sudo k3s crictl rmi --prune
```

[source](https://github.com/k3s-io/k3s/issues/1900#issuecomment-644453072)

## delete individual image

```
sudo k3s crictl rmi docker.io/rancher/image:tag
sudo k3s crictl rmi docker.io/library/image:tag
```

## import docker / container image

```shell
docker save image:tag | sudo k3s ctr images import -
```

you can also run `docker save -o filename localhost/your-local-image` to save the image as a file, move it around and import it then via `k3s ctr images import filename`

**how to use it in a kubernetes yaml file:**

```yaml
containers:
- image: localhost/shaarli:latest
  imagePullPolicy: Never
```

## uninstall k3s

```shell
k3s-killall.sh
k3s-uninstall.sh
rm -rf /var/lib/rancher /etc/rancher/ /var/lib/longhorn/;
```