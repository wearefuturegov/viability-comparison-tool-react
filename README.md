# Viability Comparison Tool

This repo is for the front end application of the Viability Comparison Tool. The data used in this tool relies on the API we have created to provide access to the new standardised data schema we have created to standardise how data is stored and shared with others, using consistent definitions throughout, complimenting the GLA Planning Data Standard. The schema can be used to validate data before it’s used by other systems and allows different tools to talk to each other more easily.

The new data schema can be found here: [https://github.com/wearefuturegov/planning-viability-doc-schema](https://github.com/wearefuturegov/planning-viability-doc-schema)

The API built in Ruby can be found here: [https://github.com/wearefuturegov/viability-comparison-api](https://github.com/wearefuturegov/viability-comparison-api) 

This repo contains the front end application which is built in React. It is currently being hosted with live deploys from the master branch on Netlify here: [https://viability-comparison-tool.netlify.com](https://viability-comparison-tool.netlify.com)

The goal of this app is to surface existing developments and planning applications so that they can be searched & filtered to identify comparable sites. It allows officers to sense check figures & affordable housing proposed by applicants.

Currently this app allows:

- Users to browse the full data set via a map or list
- The ability to filter this data set by number of habitable rooms, residential units, number of stories, commercial space & GDV (gross development value)
- Viewing further details of an application in a single show page
- If the data is there, viewing the plot of land for the application via a GeoJSON plotted on a map
- The ability to create and view a list of properties to compare which is stored in local storage

We believe that this app has the potential to:

- Allow officers to engage with viability - at a high level - much earlier in the process
- Improve and reinforce officers’ knowledge of viability
- Give an early sense check of an application, and could pick up with applicants before sending to consultant

## Prerequisites

- `node` and `npm`
- Connection to the [API data set](https://github.com/wearefuturegov/viability-comparison-api)
- For the map functionality we are using [Leaflet](https://leafletjs.com/reference-1.6.0.html) and a React-Leaflet plugin, which you can read more about here: [https://react-leaflet.js.org/docs/en/v1/intro](https://react-leaflet.js.org/docs/en/v1/intro)

## Running it locally

1. Clone the repo and install ruby dependencies with `bundle install`
2. Then, install front-end dependencies with `npm install`
3. `npm start` to start

The app will be available on port 3000.

## Deploying to the web

[![Netlify Status](https://api.netlify.com/api/v1/badges/38fb7078-c643-4a92-927a-765514963791/deploy-status)](https://app.netlify.com/sites/viability-comparison-tool/deploys)

It is currently auto deploying to Netlify on this URL: [https://viability-comparison-tool.netlify.com](https://viability-comparison-tool.netlify.com)
