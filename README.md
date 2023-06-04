# Annex
## Introduction
Annex is an open source social network inspired by major websites like Facebook and Twitter. 
This project was meant to empower users by providing them with a platform where they can trust that their data is handled responsibly and ethically.
#### Source code
This is the frontend repository, and the backend repository can be found [here](https://github.com/ikiwq/new-annex-backend).

### Screenshots
#### Homepage

<picture>
  <source srcset="https://i.imgur.com/SVH7r96.png">
  <img alt="Homepage.">
</picture>

#### Profile page

<picture>
  <source srcset="https://i.imgur.com/ETLKc6R.png">
  <img alt="Profile Page.">
</picture>

#### Search page

<picture>
  <source srcset="https://i.imgur.com/mzjHwXn.png">
  <img alt="Profile Page.">
</picture>

#### Light mode homepage

<picture>
  <source srcset="https://i.imgur.com/iNR6rQA.png">
  <img alt="Profile Page.">
</picture>
  
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
In the src/enviroments folder, you'll find two files with the environmental variables. Both contain an apiURL link that points to the API server.
If you are using a different IP or port to host the API, modify the file like this:

    export const environment = {
      production: false,
      apiURL: "http://new_url:new_port"
    };
   
## License
Distributed under the MIT License.

## In depth into the code
Annex follows a particular type of structure when it comes to handling data. Since every post has an id and a specific post can be present across multiple pages, the post service has a behavior subject containing all the posts, organized into a map.

    postStorage = new BehaviorSubject<PostDictionary>({});
A key (in this case, the id) points to a specific Post.

    export interface PostDictionary {
      [key : string] : PostModel;
    }
    

Then, the post components have access to the post storage and render posts based on an array of ids. Since the post storage is a map, the time complexity to get the article is O(1) instead of O(n), where n is the number of posts currently stored.
  


