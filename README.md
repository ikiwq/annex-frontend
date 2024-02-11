# Annex
## Overview
Annex is an open-source social network inspired by major websites like Facebook and Twitter. 
This project was meant to give users a platform where they know how their data is handled with the maximum transparency.

This is the frontend repository, and the backend repository can be found [here](https://github.com/ikiwq/new-annex-backend).

### Built with
[![My Skills](https://skillicons.dev/icons?i=angular,typescript,nodejs&theme=light)](https://skillicons.dev)

### Screenshots
<p float="left">
  <picture>
  <source srcset="https://i.imgur.com/SVH7r96.png">
  <img alt="Homepage." width="400">
</picture>

<picture>
  <source srcset="https://i.imgur.com/ETLKc6R.png">
  <img alt="Profile Page." width="400">
</picture>

<picture>
  <source srcset="https://i.imgur.com/mzjHwXn.png">
  <img alt="Profile Page." width="400">
</picture>

<picture>
  <source srcset="https://i.imgur.com/iNR6rQA.png">
  <img alt="Profile Page." width="400">
</picture>
</p>
  
### Prerequisites:
Before running the application, make sure to have all the dependencies installed (Angular and FortAwesome).
    
To install Angular:

    npm install -g @angular/cli
    
To install fortawesome

    npm install @fortawesome/fontawesome-svg-core
    npm install @fortawesome/free-regular-svg-icons
    npm install @fortawesome/free-solid-svg-icons
    npm install @fortawesome/angular-fontawesome

### Getting started
Clone the repository with
 
    git clone https://github.com/ikiwq/new-annex-frontend/

And start the development server with

    ng serve
    
### Configuration
In the src/enviroments folder, you'll find two files with the environmental variables. Both contain an apiURL link that points to the API server.
If you are using a different IP or port to host the API, modify the file like this:

    export const environment = {
      production: false,
      apiURL: "http://new_url:new_port"
    };
   
### License
Distributed under the MIT License.
  


