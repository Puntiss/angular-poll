# Description
The Angular FrontEnd web application allows to use the Java REST APIs to manage and vote polls.

Project Components:
- Java REST APIs host is available [here](https://github.com/Puntiss/java-poll-api).
# Contributors

<img src="https://contrib.rocks/image?repo=ChristianSorgente24/SpringSondaggio" />

# Usage and Modify
**0. Prerequisites:**

- Install [Node.js version 18.18.0+](https://nodejs.org/en/download/current) or check if already installed with `node -v`.
- Install [npm version 9.8.1+](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) or check if already installed with `npm -v`.
- Install [Angular CLI version 13.3.0+](https://angular.io/cli) or check if already installed with `ng v`.

**1. Configure REST API**
   
- Follow the detailed instructions provided in the GitHub projects linked above to configure and start the Java REST APIs.

**2. Install Project Dependencies:**
   
- Install all project dependencies specified in the *angular.json* file using `npm install`, a *node_module* folder will be created.

**3. Launch the Application:**
- Host the website on the server or launch your application using `ng serve`.

**4. See result**
- Navigate to `http://localhost:4200/` in your browser to see the result.
>[!WARNING]
> If you want to expose the front-end, configure the CORS in the java-poll-api project editing the file `src\main\java\com\milano\sondaggio\config\WebConfig.java` is required. 
- Some Screenshot:

![](https://github.com/Puntiss/angular-poll/blob/master/screenshots/user%20scren.JPG)
![](https://github.com/Puntiss/angular-poll/blob/master/screenshots/after%20user%20has%20voted.JPG)
![](https://github.com/Puntiss/angular-poll/blob/master/screenshots/update%20vote.JPG)

> [!WARNING]
> If you don't have already created an unser with role ADMIN, and you want to create polls you can do it using Postman or editing the database user table

![](https://github.com/Puntiss/angular-poll/blob/master/screenshots/crate%20poll.JPG)
![](https://github.com/Puntiss/angular-poll/blob/master/screenshots/admin%20poll%20options.JPG)
![](https://github.com/Puntiss/angular-poll/blob/master/screenshots/delete%20poll.JPG)

Happy coding!

