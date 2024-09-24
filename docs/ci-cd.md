(CI = Continued Integration; CD = Continued Development)

https://kubernetes.io/fr/docs/concepts/configuration/secret/

https://kubernetes.io/docs/concepts/workloads/autoscaling/

CI/CD ? 

- Explore https://dagger.io
- Github actions ?
- Personal image repository ?
- Jenkins

# Before CI-CD

To ease the continues integration/development, we'll first need to have an automated process to run and manage the entire component chain. To do this, some options are available:

- Helm chart: kubernetes resources templating.
- Kustomize: customize Kubernetes resources. It doesn't require templates and uses a layering approach to modify YAML files.
- Jsonnet: Jsonnet is a data templating language that can be used to generate Kubernetes YAML files. It offers powerful abstractions and a flexible syntax for defining and composing configurations.