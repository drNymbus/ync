# Shop Application

A basic shop application: item listing, basket display and pricing, payment page and thank you page.

The project is organized with an orchestrator handling main variables and using different components to render the web page.
The public folder contains all 

## start.sh

This is the container entrypoint, this allows for more flexibility when setting up the environment variables using different deployment tools.
This bash files creates the '.env' file then builds the static react app to be served.

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