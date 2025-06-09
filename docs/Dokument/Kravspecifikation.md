The requirements in the project has been separated into functional and non-functional requirements. Some requirements are also required, to ensure that the project is fulfilled to be at least a working product. Other requirements are labeled as optional which is not needed but is nice to have features that should be completed if there is time.

All the projects application related requirements can be found here:

[Issues](https://gitlab.lnu.se/1dv613/student/dp222ky/projects/spotify-arcade/-/issues/?sort=created_asc&state=closed&first_page_size=20)

## 2\. Non-functional product requirements

The non functional requirements that has been chosen for the project application/product are concerns that is mostly relevant for the developer. The requirements that is available is to ensure that clean code is being written in order to ensure maintainability and easy to read code. This by following a certain code standard but also working with modularity in order to adhere to separations of concerns and better overall organizing. To ensure that the code standard is being followed there is a script for linting/checking the code for potential errors.

## 3\. Non-functional organizational requirements

The editor that is going to be used is Visual Studio Code with mainly focusing on javascript/express. Developing is to be done locally and potential publishing will be using nginx. 

### 3.1 Version control

The version control is handled on GitLab and the workflow is Git using repositories, branching, commits, merging, pull/pushing etc.The project repository can be found here: [Repository](https://gitlab.lnu.se/1dv613/student/dp222ky/projects/spotify-arcade).
Documentation related to the project are found here: [wiki](https://gitlab.lnu.se/1dv613/student/dp222ky/project/-/wikis/home)

### 3.2 Code standard

The code standard that is going to be used is LNUs coding standard. 

### 3.3 Code documentation

The code documentation is mainly going to consists of jsdoc comments. In places where the code is harder to grasp single line comments will be used. Since the application will be using Spotifys Web API and Spotifys authentication system, links will be provided to relevant documentation. 

## 4\. Externa krav (non-functional external requirements)

### 4.1 Ethical requirements

The projects aim is to simply create an enjoyable music arcade product which does not conform to any malicious intent. There is no potential harm for users using the application directly. But since authentication is handled using Spotifys system using Oauth2, there is always potential for breaches. Therefore the application is going to be built as robust as possible using best-practice or at least good-practice approaches. 

### 4.2 Rules and standards

Before entering the application after having authenticated new users will have to provide their consent on information that is being handled while using the application. Therefore making sure that the user is in informed of what they're consenting to. 