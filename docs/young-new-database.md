# User roles

No password allowed.

Credentials file: https://cassandra.apache.org/doc/stable/cassandra/operating/security.html

## FileSystem could be our own database ?

(If you’re crazy enough create a file system from scratch)

[Young New FileSystem](https://www.notion.so/Young-New-FileSystem-0f0824fe441f477facacbb4eaa3225b0?pvs=21)

An easier task would be to optimize StatefulSet to run on minimum ram anytime. First idea, automize mount/unmount.ing data; Second Idea: Get rid of stateful set, and use docker-compose to mount/unmount keyspace on demand (— rigourous passwords access needed).

# Persistent Volume

“A local persistent volume represents a local disk directly-attached to a single Kubernetes Node.” (https://kubernetes.io/blog/2019/04/04/kubernetes-1.14-local-persistent-volumes-ga/)

Declarative YAML ([https://kubernetes.io/fr/docs/tasks/configure-pod-container/configure-persistent-volume-storage/#créer-un-persistentvolume](https://kubernetes.io/fr/docs/tasks/configure-pod-container/configure-persistent-volume-storage/#cr%C3%A9er-un-persistentvolume)):

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: task-pv-claim
spec:
  storageClassName: manual
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 3Gi
```

In our case, there is no need for a PersistentVolumeClaim, everything is handled through the StatefulSet.

# StateFulSet

![To clarify: cassandras pod are each “linked” to a single persistent volume claim (PVC). And each PVCs are “linked” together to handle data consistency.](https://prod-files-secure.s3.us-west-2.amazonaws.com/17c9f6cd-50b0-49e0-9471-730c4a1ddcc7/a56772de-c292-4bde-af4e-634d1340f345/Untitled.png)

To clarify: cassandras pod are each “linked” to a single persistent volume claim (PVC). And each PVCs are “linked” together to handle data consistency.

- Chat GPT take:
    
    If a `StatefulSet` does not specify any `PersistentVolumeClaims` (PVCs) for its pods, the storage used by the pods will depend on how their containers are configured. Here are the typical scenarios for where the data might be stored if no PVCs are used:
    
    1. **Ephemeral Storage (Container's Filesystem)**: By default, without PVCs, any data written by the pods will be stored on the container’s own writable layer. This type of storage is ephemeral, meaning it is tied directly to the lifecycle of the container. If the container restarts or is deleted, any data stored on its filesystem is lost. This is often used for temporary data that doesn't need to persist across restarts.
    2. **EmptyDir Volumes**: A `StatefulSet` can be configured to use `emptyDir` volumes, which can be specified directly in the pod's specification under the `volumes` section. `emptyDir` volumes are also ephemeral and are stored on whatever medium is backing the node’s filesystem (usually disk or SSD). The data in an `emptyDir` volume persists as long as the pod is running on that node, but it is deleted when the pod is removed or the node is rebooted.
    3. **HostPath Volumes**: Another option is to use `hostPath` volumes, where a directory from the host node's filesystem is mounted into the pod. This is more persistent than `emptyDir`, as the data remains on the host's disk even after the pod is deleted, but it is specific to the node, so if the pod moves to a different node, it loses access to that data.
    4. **Other Volumes Not Requiring PVCs**: Kubernetes supports other types of volumes that do not require PVCs, such as `configMap`, `secret`, and others primarily used for configuration or sensitive data, rather than for general data storage.

## HostPath

Declared in `deployment/k8s/ync-database/storage.yml` and `deployment/docker-compose/?`. We’re limited by RAM usage, two cassandra pod in StatefulSet takes up to 5Gi (A pod = 2.3~2.5Gi).

## This means that the seed service (read) could possibly be duplicated, hence having a seedless StatefulSet.

- Is it more performant ?
- Is it “allowed”(=simply another concept/approach to solve data consistency) ?
- It seems possible to extend the “statefulness” by scaling pod by keyspace needed ?
- It naturally sparks the question of having multiple seeds ? Or a “no-seed” StatefulSet ?

## An in-between can be implemented: single seed & scaling keyspace reads on demand.

- Monitoring seems a cool feature, is it necessary though ?
- Could we mix storage supports (Cassandra&PostgreSQL?) in a single StatefulSet ?
- Is it worth to handle several storage support ? I suppose this would be really greedy resource wise.