# CLup frontend repository

[![Netlify Status](https://api.netlify.com/api/v1/badges/bc9c96ef-bd94-4d42-908f-44ef8552a9f7/deploy-status)](https://app.netlify.com/sites/serene-hoover-f46d59/deploys)

## Code structure
The top level of the frontend directory contains 5 important elements:
- `/build`: Contains the generated html code which is uploaded to netlify.
- `/public`: Contains static files that will be bundled on compiling
- `/node_modules`: Contains all dependencies handled by node.js (Not uploaded to github)
- `/src`: Contains all the code of the application
  - `/api`: Contains helper functions that interact with the backend api
  - `/components`: Contains independant and reusable components
  - `/constants`: Contains that don't change throughout the application, such as the route names.
  - `/context`: Contains the code for the React context api, this is, the main state that is carried out through - the session
  - `/pages`: Contains the components for each of the views. Each time the web page is loaded, the user only - sees a header and one of these pages.
  - `/router`: Contains the code that handles the permission levels of the routes, and the logic for switching - views in this SPA.
  - `/tests`: Contains the code for the tests
- `App.js`: Main component of the web app
- `App.test.js`: Contains the high level tests (rendering is ok)
- `index.js`: Entry point of the web app.
- `index.scss`: Contains the entry point for the style sheets.
- `.env`: Contains the environment variables
- `.package.json`: A general description of the application, the dependencies and the commands used. Standard in node.js applications

## Framework used
- React
  - Create React App
  - React Router Dom
  - Context API
  - Ant Design
  - Jest + React testing library
- The web application is set as a PWA
  - Can be installed on modern devices


## Installation instructions
### Installing
For running the frontend locally, there are a couple of requirements that need to be satisfied. Both can be installed here.
- Node.js: v12.16.1 (used to develop) or higher.
- NPM (node package manager): v6.13.4 (used to develop) or higher

Any other package managers such as yarn should work, but we only tested with npm

Then, clone the repository and inside the /frontend and set the .env file with the correct environment variables (copy the .env.example into a .env file):
- `REACT_APP_BACKEND_URL=http://localhost:8000` (if running the backend locally)
- `REACT_APP_BACKEND_URL=http://167.172.0.34:8000` (if you want to connect to the real backend server)

The next step is to install the project locally and download all required dependencies). Run the following commands inside the /frontend directory
npm install

### Running
Finally, to run the project simply run the following command, which will set up the project in port 3000.
- `npm start`
Then go to `localhost:3000`

### Testing
With everything installed, run:
- `npm run test`



### Building
With everything installed, run
- `npm run build`
Which will generate the static html in the `/build` directory
