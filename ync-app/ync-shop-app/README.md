# Shop Application

A basic shop application: item listing, basket display and pricing, payment page and thank you page.

The project is organized with an orchestrator handling main variables and using different components to render the web page.
The public folder contains all 

## src/index.tsx && src/App.tsx

index.tsx sets up the context and webvitals. App.tsx is the orchestrator.

## src/context

- __ShopAPIProvider__ : context to communicate with store api.

## src/components

- __Bandeau.tsx__ : Top menu with buttons
- __Basket.tsx__ : User's basket display, can be configured to be displayed in a compacted format
- __Item.tsx__ : Allows for one or multiple items to be displayed.
- __Payment.tsx__ : Payment page, form for user's contact and shipping address information and basket description
- __Section.tsx__ : Title page
- __SplashPage.tsx__ : Loading page, runs a routine before displaying any element given

# Deployment

To deploy this app you need to build it first so that the server can service a static version of the application. Deployment has been eased up thanks to a Dockerfile that build the react application and creating the environment variables. For a container to run properly, the api url and port should be set and the container should be exposed at 3000.

Creating the environment variables at runtime has brought us a lot of problems. Multiple implementations are available:

- Modify env variables with the Dockerfile: does not work in a kubernetes deployment since the environment variables will not be part of the container.
- env-config.js: Basically a kube configMap, env file would be loaded after building the app and then used to set REACT_APP env variables.
- Custom entrypoint bash file: this option allows to build the app at container runtime and then to capture env variables given to kubernetes, this is also the easiest solution for all deployment size.
