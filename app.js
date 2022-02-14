// SERVIDOR SENCILLO EN NODE-JS
// Utiliza: express, bodyparser y cors
// 
//Comandos iniciales: npm init, npm i --save cors, npm i body-parser --save, npm i express --save 
//
// El unido endpoint es es: localhost:9000/
// La ejecución es por medio del comando: node app.js
//
/*Ejemplo de una task para el postman:
    {
        "id":0,//después dentro del codigo se edita el id
        "text": "Hacer D",
        "day": "29 de Marzo a las 19:00",
        "reminder": false
    }
*/


//Importando y declarando el el objeto tarea
const NewTask = require('./Task')
let newTask = new NewTask();
//definición del puerto y librerias del servidor
const express = require('express');
const bodyParser = require('body-parser');
const port = 9000;
const app = express();
//Definición del cors
const cors = require('cors');
//Configuración del cors
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
//Objetos por defecto en la simulación de la db

var ejemplo1= new NewTask();
ejemplo1.id=1;
ejemplo1.reminder=true;
ejemplo1.text="Hacer A";
ejemplo1.day="2 de febrero a las 16:00";
var ejemplo2= new NewTask();
ejemplo2.id=2;
ejemplo2.reminder=true;
ejemplo2.text="Hacer B";
ejemplo2.day="3 de febrero a las 20:00";

var todos = [
            ejemplo1,
            ejemplo2
            ];

// Codifica como json el body por medio del bodyparse
app.use(bodyParser.json())
//Método get
app.get('/', (request, response) => response.status(200).json(todos));
//Método post 
//No olvidar que en el postman el post es un raw con formato json
app.post('/', (request, response) => {
  
    newTask = request.body
    newTask.id= todos.length +1;
    todos.push(newTask);
    response.status(201).json(newTask);
});
//método delete
app.delete('/:id', function (req, res) {
    var id = req.params.id;
    
    todos.forEach(task => {
        if(task.id==id){
            todos=todos.filter(function(i) { return i !== task });
        }});
    return res.status(200).json(todos);
});
//Subiendo el servidor
app.listen(port);
console.log("Servidor corriendo en localhost:"+port);