# Homework TodoList for kids

### What it is

We had as a shool work in the course Dynamic webdevelop to create a basic API with CRUD as base, create, read, update and delete.
My small webapp that I created is a homework todo app for kids.
You can view all, add, change, delete and delete all in this webapp.

We had the option to create one more GET endpoint. So I created an GET that sorts out the homeworks that has to be done first, the closest date.
That inspiration was from Nasas "picture of the day" api. If more than one have the same date, it also shows. 
When an earlier date is added or changed, this will show.

The DB I use is a normal data.json file to store and edit the homeworks.

### The API

* GET - Gets all the homeworks - /api
* GET - Gets the closest homeworks - /api/closest
* POST - Add a homework - /api
* PUT - Edit a homework - /api/:id
* DELETE - Deletes one homework - /api/:id
* DELETE - Deletes all homeworks - /api

### Install

1 - Open an empty folder in VSC and then run: git clone https://github.com/Nicklas-Holmqvist/homework-todo.git
2 - If you have the folder, just open it in VSC
* When everything is open, run in the terminal:
  npm install or npm i
* Now all the dependencies will be installed
* To start the server, run in the terminal:
  npm start
* Now you can use the server.rest and http://localhost:3000 in the browser
