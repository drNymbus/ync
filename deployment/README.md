# Deployment

The ync projects thought as three services (ync-database, ync-api & ync-app) will ease us the way we can plan to deploy either a limited number of components. Deploying the ync project is pretty straightforward and will consists of two moving blocks: storage (ync-database) and programs (ync-api, ync-app). We've automated a Docker compose and a Kubernetes (k8s) deployment. From any setting perspective, production or development, Docker and k8s are entirely reliable. The Docker approach is thought out to ease the deployment on lighter installations.

To deploy the full chain of services (ync-database, ync-api & ync-app),  two options are entirely built out for you:

- Docker Compose: this option is best suited for local development as you'll be able to run the different components of the service independently.
- Kubernetes: this allows for an easier maintenance when running all services. this egally make things easier to support future APIs and applications development. 

In other cases, you would deploy only the needed components. To run this locally, you'll first need to have a minikube working (some help can be found in the 'deployment' folder of this repository). You can deploy all components thanks to the 'deployment/start.sh' bash file in a single command line ! If you wish to get deeper explanations on how each component is deployed, go to the 'deployment' folder of this repository.

## Docker

### Install

### Docker Compose

### Uninstall

## Kubernetes (k8s)

Many installation tools can be used. In first place, Minikube was chosen for a minimal installation for development purposes, where a lot of network functionality aren’t built the same as in a full scale model. We are currently running on a i5, 7Go RAM, 2To PC. A limited ram setup and also a single unite made us look directly to k3s

### Install

Before installing anything you will need a Daemon running, if you are running something else than Docker, you may need to specify it during some commands throughout this guide.

***Minikube***:

- OSX: `brew install minikube`
- Linux:

```bash
curl -Lo minikube https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64\ && chmod +x minikube
sudo mkdir -p /usr/local/bin/
sudo install minikube /usr/local/bin/
```

Since Minikube handles only the node configuration, you’ll need to install `kubectl` independently: https://kubernetes.io/docs/tasks/tools/

***k3s***:

```bash
curl -sfL [https://get.k3s.io](https://get.k3s.io/) | sh -
```

Check for Ready node, takes ~30 seconds:`sudo k3s kubectl get node`  

### Minikube

To run this locally, you'll first need to have a minikube working (some help can be found in the 'deployment' folder of this repository). You can deploy all components thanks to the 'deployment/start.sh' bash file in a single command line! If you wish to get deeper explanations of each component deployment, go to the 'deployment' folder of this repository.

You can find all commands needed to start the entire YNC service in the bash files './start.sh' and './shutdown.sh'; All components are under the same namespace: ync. If you want to deploy locally the all service you'll need docker and minikube installed.

```bash
systemctl start dockerd # Ensure that docker daemon is running
minikube start
```

To be able to deploy local docker images, you'll need to configure your minikube cluster to use the docker-env, for UNIX users this would be:

```bash
eval $(minikube -p minikube docker-env)
```

And for DOS users, you'll need to use Powershell:

```powershell
minikube -p minikube docker-env --shell powershell | Invoke-Expression
```

(In case this command fails, try removing 'minikube -p')

For all services to be able to work properly on a local setting, you'll need to run on a separate terminal (https://minikube.sigs.k8s.io/docs/handbook/accessing/#using-minikube-tunnel):

```bash
minikube tunnel
```

Once your minikube is set up, you'll be able to run the bash file 'start.sh'. To delete all ync-app resources without effort, execute 'shutdown.sh' file.

### k3s

If you wish to go deeper: https://docs.k3s.io/

- **START**: `sudo systemctl start k3s`
- **STOP**:  `sudo systemctl stop k3s`
- **RESET ENV**:  `sudo /usr/local/bin/k3s-killall.sh`

### Service

Dechaine tes morts sur comment on fait les yamls tout ca tout ca

### Start & Stop

### Scaling

(What’s next also applies to Deployments, to a certain extent)

### Use kubectl to scale StatefulSets

1. First, find the StatefulSet you want to scale: `kubectl get statefulsets <stateful-set-name>`
2. Change the number of replicas of your StatefulSet: `kubectl scale statefulsets <stateful-set-name> --replicas=<new-replicas>`

### Make in-place updates on your StatefulSets

Alternatively, you can do [in-place updates](https://kubernetes.io/docs/concepts/cluster-administration/manage-deployment/#in-place-updates-of-resources) on your StatefulSets.

If your StatefulSet was initially created with `kubectl apply`, update `.spec.replicas` of the StatefulSet manifests, and then do a `kubectl apply`: 

`kubectl apply -f <stateful-set-file-updated>`

Otherwise, edit that field with `kubectl edit`:

`kubectl edit statefulsets <stateful-set-name>`

Or use `kubectl patch`:

`kubectl patch statefulsets <stateful-set-name> -p '{"spec":{"replicas":<new-replicas>}}'`

### Scaling Deployments