# Shop Application

A basic shop application: item listing, basket display and pricing, payment page and thank you page.

The project is organized with an orchestrator handling main variables and using different components to render the web page.
The public folder contains all 

## set-env.sh

This bash files allows to create an .env file for the client side to get the "correct" variables in a kubernetes context.

## src/index.tsx && src/App.tsx

index.tsx loads all environment variables. App.tsx is the orchestrator

## src/context

- __ShopAPIProvider__ : context to communicate with store api.

## src/components

- __Bandeau.tsx__ : Top menu with buttons
- __Basket.tsx__ : User's basket display, can be configured to be displayed in a compacted format
- __Item.tsx__ : Item display
- __Payment.tsx__ : Payment page, form for user's contact and shipping address information and basket description
- __Section.tsx__ : Page title
- __SplashPage.tsx__ : Loading page, run something before displaying a content given