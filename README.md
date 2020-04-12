# movie-info-api

Simple REST API movie rating system that is integrated with external movie database through [OMDb API](http://www.omdbapi.com/)

## Documentation

Basic documentation for endpoints can be found [here](https://app.swaggerhub.com/apis-docs/dudzixxie/Movie-App/1.0.0)

## Getting Started - production version using Heroku

These instructions will let you quickly use the app without getting a copy of it on your local machine.

## Getting Started - local machine

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software and how to install them

* **Node.js**
* Text editor to write out Node scripts such as **Visual Studio Code**
* **MongoDB** database

**Links:**
* [Node.js](https://nodejs.org/en/) - recommended ***version 12.8.1*** or greater
* [Visual Studio Code](https://code.visualstudio.com/) - recommended ***version 1.44*** or greater
* [MongoDB Community Server](https://www.mongodb.com/download-center/community) - recommended ***version 4.2.5*** or greater

### Installation

A step by step series of examples that tell you how to get a development env running

**Clone**
* Clone this repo to your local machine using `https://github.com/dominikaduda/movie-info-api.git`\
See the section about [cloning a repository](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository) for more information

**Setup**
> Open project directory in text editor such as **Visual Studio Code**

> In the project directory, install required npm modules by running from the terminal:

```
npm install
```

> In the project directory, create ***config*** directory.

>Next up, create an environment file ***dev.env*** in the ***config*** directory that you created in previous step.\
This will store your environment variables in the following format
```
KEY=value
ANOTHER_KEY=some other value
```

> Open the file ***dev.env*** and add to it the following content:

```
PORT=3000
JWT_SECRET=thisismysecret
OMDB_API_KEY=da9569d1
MONGODB_URL=mongodb+srv://movieapp-user:userPassword@cluster0-t3mg5.mongodb.net/movie-app?retryWrites=true&w=majority
```
  Note that you can also use different values for variables above:
  * *PORT* - port which you want to use
  * *JWT_SECRET* - secret phrase that the jwt token is created with, used in authentication
  * *OMDB_API_KEY* - API key used to acces **OMDb API**. If the above code doesn’t work you can generate your own on OMDb API website,
instructions [here](http://www.omdbapi.com/apikey.aspx)
  * *MONGODB_URL* - connection string to database, example above contains connection URL to cluster created in **MongoDB Atlas**

> Now, everything is set up. In project directory, you can run:
```
npm run start
```
Runs the app, server is up on port selected before

Or

```
npm run dev
```
Runs the app, server is up on port selected before.
Uses `npm nodemon`:
  * automatically restarts the node application when file changes in the directory are detected
  * more information [here](https://www.npmjs.com/package/nodemon)

**View**
* Open <http://localhost:3000> to view it in the browser
* Click [here](https://app.swaggerhub.com/apis-docs/dudzixxie/Movie-App/1.0.0) for detailed information about available endpoints
* It is recommended to use platform for API Development with a set of tools for making HTTP requests that will let you test endpoints correctly such as **[Postman](https://www.postman.com/)**.

Quick demo on how to set up **[Postman](https://www.postman.com/)** for the app to work properly [here]

## Running the tests

## Authors

* **Dominika Duda** -> <https://github.com/dominikaduda>
