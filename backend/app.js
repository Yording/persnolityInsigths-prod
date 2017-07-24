'use strict'

// Dependencias
var express = require('express')
var bodyParser = require('body-parser')
var routes = require('./routes')
var config = require('./config')
var path = require('path')
// Variables
var app = express()

// Middlewares
app
    // body parser middlware
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({extended:false}))
    // CORS middleware
    .use(function(req, res, next){
        // Habilitar CORS
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
        next();
    })
    // Añadir todas las rutas sobre api
    .use('/api', routes)
    
    if(config.environment == "PRODUCTION"){
        app.use('',express.static(path.resolve(__dirname,'../dist')));

        app.get('/', function(req, res){
            res.sendFile(path.resolve(__dirname,'../dist/index.html'));
        });
    }


module.exports = app