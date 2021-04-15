# Homework TodoList for kids

### What it is

We had as a shool work in the class Dynamic webdevelop to create a basic API with CRUD as base, create, read, update and delete.
My small webapp that I created is a homework todo for kids.
You can view all, add, change, delete and delete all in this webapp.

We had the option to create one more GET endpoint. So I created an GET that sorts out the homeworks that has to be done first, the closest date.
That inspiration was taken from the Nasas "picture of the day" api. 
If more than one have the same date, it should also show up. When an earlier date is added or changed, this will show.

The DB I use is a normal data.json file to store and edit the homeworks connected to the server.js.

Every endpoint can run in a REST Client file, server.rest.

### The API

* **GET** - **/api** - *Gets all the homeworks*
* **GET** - **/api/closest** - *Gets the closest homeworks*
* **POST** - **/api** - *Add a homework. A new ID will be added in the endpoint*
* **PUT** - **/api/:id** - *Edit a homework. The ID in the url will be the variable to find what homework that should be edited*
* **DELETE** - **/api/:id** - *Deletes one homework. The ID in the url will be the homework that should be deleted*
* **DELETE** - **/api** - *Deletes all homeworks. In the endpoint, an empty array will be pushed to the .json-file*

### Install

Open an empty folder in VSC and then run: git clone https://github.com/Nicklas-Holmqvist/homework-todo.git.

If you have the folder, just open it in VSC

* When everything is open, run in the terminal:
  npm install or npm i
* Now all the dependencies will be installed
* To start the server, run in the terminal:
  npm start
* Now you can use the server.rest and http://localhost:3000 in the browser
