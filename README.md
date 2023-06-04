# Annex
## Introduction
Annex is an open source social network inspired by major websites like Facebook and Twitter. 
This project was meant to empower users by providing them with a platform where they can trust that their data is handled responsibly and ethically.
#### Source code
This is the frontend repository and the backend Repository can be found [here](https://github.com/ikiwq/new-annex-backend).
#### Built with
[![My Skills](https://skillicons.dev/icons?i=angular,typescript,nodejs&theme=light)](https://skillicons.dev)

## Getting started
### Clone the repository
Clone the repository with
 
    git clone https://github.com/ikiwq/new-annex-frontend/
    
### Prerequisites:
Before running the application, make sure to have all the dependencies installed (Angular and FortAwesome).
    
To install Angular:

    npm install -g @angular/cli
    
To install fortawesome

    npm install @fortawesome/fontawesome-svg-core
    npm install @fortawesome/free-regular-svg-icons
    npm install @fortawesome/free-solid-svg-icons
    npm install @fortawesome/angular-fontawesome
### Configuration
In the src/enviroments folder, you'll find two files with the enviromental variables. Both contains a apiURL link that points to the API server.
If you are using a different IP or PORT to host the API, modify the file like this:

    export const environment = {
      production: false,
      apiURL: "http://new_url:new_port"
    };
   
## License
Distributed under the MIT License.
